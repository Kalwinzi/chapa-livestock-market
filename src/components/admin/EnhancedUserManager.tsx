
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Users, Crown, Ban, UserCheck, Trash2, Edit, Search } from 'lucide-react';

const EnhancedUserManager: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setUsers(data);
        setFilteredUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    if (!searchQuery.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user: any) =>
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const updateUserStatus = async (userId: string, action: string) => {
    try {
      setLoading(true);
      let updateData: any = {};

      switch (action) {
        case 'suspend':
          updateData = { status: 'suspended' };
          break;
        case 'activate':
          updateData = { status: 'active' };
          break;
        case 'promote-premium':
          updateData = { 
            premium_status: true,
            premium_expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          };
          break;
        case 'remove-premium':
          updateData = { premium_status: false, premium_expires_at: null };
          break;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);

      if (!error) {
        toast({
          title: "Success",
          description: `User ${action.replace('-', ' ')} successful`,
        });
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async () => {
    if (!editingUser) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          phone: editingUser.phone,
          location: editingUser.location,
          avatar_url: editingUser.avatar_url
        })
        .eq('id', editingUser.id);

      if (!error) {
        toast({
          title: "Success",
          description: "User profile updated successfully",
        });
        setEditingUser(null);
        await fetchUsers();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center">
          <Users className="h-6 w-6 mr-2" />
          User Management ({filteredUsers.length})
        </h3>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="relative">
            <CardContent className="p-4">
              {editingUser?.id === user.id ? (
                <div className="space-y-3">
                  <Input
                    placeholder="First Name"
                    value={editingUser.first_name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, first_name: e.target.value })}
                  />
                  <Input
                    placeholder="Last Name"
                    value={editingUser.last_name || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, last_name: e.target.value })}
                  />
                  <Input
                    placeholder="Phone"
                    value={editingUser.phone || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Location"
                    value={editingUser.location || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, location: e.target.value })}
                  />
                  <Input
                    placeholder="Avatar URL"
                    value={editingUser.avatar_url || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, avatar_url: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={updateUserProfile} size="sm" disabled={loading}>
                      Save
                    </Button>
                    <Button onClick={() => setEditingUser(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                        {user.avatar_url ? (
                          <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{user.first_name} {user.last_name}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    {user.premium_status && (
                      <Crown className="h-4 w-4 text-yellow-500" />
                    )}
                  </div>

                  <div className="space-y-1 text-sm">
                    {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
                    {user.location && <p><strong>Location:</strong> {user.location}</p>}
                    <p><strong>Type:</strong> {user.user_type}</p>
                    <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
                        onClick={() => updateUserStatus(user.id, user.premium_status ? 'remove-premium' : 'promote-premium')}
                        disabled={loading}
                        className="flex-1"
                      >
                        <Crown className="h-3 w-3 mr-1" />
                        {user.premium_status ? 'Remove Premium' : 'Grant Premium'}
                      </Button>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateUserStatus(user.id, user.status === 'suspended' ? 'activate' : 'suspend')}
                        disabled={loading}
                        className="flex-1"
                      >
                        {user.status === 'suspended' ? (
                          <><UserCheck className="h-3 w-3 mr-1" />Activate</>
                        ) : (
                          <><Ban className="h-3 w-3 mr-1" />Suspend</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingUser(user)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUser(user.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedUserManager;
