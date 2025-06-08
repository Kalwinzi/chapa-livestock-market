
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Ban, UserCheck, Star, Download } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const { loading, setLoading, users, fetchUsers } = useAdminData();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAction = async (action: string, userId: string) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'block':
          await supabase
            .from('profiles')
            .update({ user_type: 'banned' })
            .eq('id', userId);
          break;
        case 'unblock':
          await supabase
            .from('profiles')
            .update({ user_type: 'buyer' })
            .eq('id', userId);
          break;
        case 'delete':
          await supabase
            .from('profiles')
            .delete()
            .eq('id', userId);
          break;
        case 'promote':
          await supabase
            .from('profiles')
            .update({ user_type: 'seller' })
            .eq('id', userId);
          break;
      }
      
      toast({
        title: "User Updated",
        description: `User ${action} successful`,
      });
      
      await fetchUsers();
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

  const exportData = async () => {
    try {
      if (users.length === 0) {
        toast({
          title: "No Data",
          description: "No users available to export",
          variant: "destructive"
        });
        return;
      }
      
      const headers = Object.keys(users[0]).join(',');
      const rows = users.map(item => Object.values(item).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Users data exported successfully",
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold">User Management</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.filter((user: any) => 
                user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{user.first_name} {user.last_name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.user_type === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                      user.user_type === 'seller' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      user.user_type === 'banned' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {user.user_type}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                    {user.location || 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground hidden lg:table-cell">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        title="View user details"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      {user.user_type !== 'banned' ? (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleUserAction('block', user.id)}
                          title="Block user"
                          disabled={loading}
                        >
                          <Ban className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleUserAction('unblock', user.id)}
                          title="Unblock user"
                          disabled={loading}
                        >
                          <UserCheck className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleUserAction('promote', user.id)}
                        title="Promote to seller"
                        disabled={loading}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
