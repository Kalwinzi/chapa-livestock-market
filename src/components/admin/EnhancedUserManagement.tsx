
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Crown, Ban, Search, Mail, Phone, MapPin, Calendar } from 'lucide-react';

const EnhancedUserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, filterStatus]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => {
        switch (filterStatus) {
          case 'premium':
            return user.premium_status;
          case 'admin':
            return user.user_type === 'admin';
          case 'seller':
            return user.user_type === 'seller';
          case 'buyer':
            return user.user_type === 'buyer';
          case 'suspended':
            return user.status === 'suspended';
          default:
            return true;
        }
      });
    }

    setFilteredUsers(filtered);
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (!error) {
        toast({
          title: "Success",
          description: `User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully`,
        });
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updatePremiumStatus = async (userId: string, isPremium: boolean) => {
    try {
      const premiumExpiry = isPremium ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null;
      
      const { error } = await supabase
        .from('profiles')
        .update({ 
          premium_status: isPremium,
          premium_expires_at: premiumExpiry?.toISOString()
        })
        .eq('id', userId);

      if (!error) {
        toast({
          title: "Success",
          description: `Premium status ${isPremium ? 'granted' : 'removed'} successfully`,
        });
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateUserType = async (userId: string, userType: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', userId);

      if (!error) {
        toast({
          title: "Success",
          description: `User type updated to ${userType}`,
        });
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (!error) {
        toast({
          title: "Success",
          description: "User deleted successfully",
        });
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Users className="h-5 w-5 mr-2" />
          User Management ({filteredUsers.length})
        </h3>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="premium">Premium Users</SelectItem>
                <SelectItem value="admin">Administrators</SelectItem>
                <SelectItem value="seller">Sellers</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={fetchUsers} disabled={loading}>
              Refresh Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="relative">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{user.first_name} {user.last_name}</h4>
                    <p className="text-sm text-muted-foreground">{user.user_type}</p>
                  </div>
                </div>
                {user.premium_status && (
                  <Crown className="h-4 w-4 text-yellow-500" />
                )}
              </div>

              <div className="space-y-2 text-sm mb-4">
                {user.email && (
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                    {user.email}
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                    {user.phone}
                  </div>
                )}
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                    {user.location}
                  </div>
                )}
                {user.created_at && (
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-muted-foreground" />
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                  user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.status || 'Active'}
                </span>
                {user.premium_status && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded font-medium">
                    Premium
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  user.user_type === 'admin' ? 'bg-purple-100 text-purple-800' :
                  user.user_type === 'seller' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user.user_type}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updatePremiumStatus(user.id, !user.premium_status)}
                    className="flex-1"
                  >
                    <Crown className="h-3 w-3 mr-1" />
                    {user.premium_status ? 'Remove Premium' : 'Grant Premium'}
                  </Button>
                </div>
                
                <div className="flex gap-1">
                  <Select
                    value={user.user_type}
                    onValueChange={(value) => updateUserType(user.id, value)}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateUserStatus(user.id, user.status === 'suspended' ? 'active' : 'suspended')}
                    className="flex-1"
                  >
                    <Ban className="h-3 w-3 mr-1" />
                    {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No users found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedUserManagement;
