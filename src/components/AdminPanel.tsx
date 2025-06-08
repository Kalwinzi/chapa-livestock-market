
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  X, Users, ShoppingCart, TrendingUp, Settings, Search, Filter, Eye, Edit, Trash2, Ban, 
  CheckCircle, AlertCircle, BarChart3, MessageSquare, DollarSign, Calendar, Plus,
  FileText, Megaphone, BookOpen, Bot, Coins, Lock, History, Activity, Mail,
  CreditCard, Star, PieChart, Database, Globe, Shield, Save, Upload, Download,
  UserCheck, UserX, AlertTriangle, Loader2
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  // State for all data
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    pendingApprovals: 0,
    activeMessages: 0,
    activeUsers: 0,
    completedOrders: 0
  });

  const [users, setUsers] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stories, setStories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  
  // Form states
  const [newStory, setNewStory] = useState({ title: '', content: '', authorName: '' });
  const [editingStory, setEditingStory] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingLivestock, setEditingLivestock] = useState<any>(null);

  // Security check - only allow admin access
  useEffect(() => {
    if (isOpen && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel",
        variant: "destructive"
      });
      onClose();
    }
  }, [isOpen, isAdmin, onClose, toast]);

  // Fetch all admin dashboard data
  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchDashboardData();
    }
  }, [isOpen, isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch comprehensive stats
      const [
        { count: usersCount },
        { count: livestockCount },
        { count: ordersCount },
        { data: ordersData },
        { count: pendingCount },
        { count: messagesCount },
        { count: activeUsersCount },
        { count: completedOrdersCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('livestock').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('livestock').select('*', { count: 'exact', head: true }).eq('verified', false),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'seller'),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'completed')
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + parseFloat(order.total_amount || '0'), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalListings: livestockCount || 0,
        totalOrders: ordersCount || 0,
        monthlyRevenue: totalRevenue,
        pendingApprovals: pendingCount || 0,
        activeMessages: messagesCount || 0,
        activeUsers: activeUsersCount || 0,
        completedOrders: completedOrdersCount || 0
      });

      // Fetch detailed data
      await Promise.all([
        fetchUsers(),
        fetchLivestock(),
        fetchOrders(),
        fetchMessages(),
        fetchStories(),
        fetchTransactions(),
        fetchAnalytics()
      ]);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setUsers(data || []);
  };

  const fetchLivestock = async () => {
    const { data, error } = await supabase
      .from('livestock')
      .select(`
        *,
        profiles!livestock_user_id_fkey(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setLivestock(data || []);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        buyer:buyer_id(first_name, last_name, email),
        seller:seller_id(first_name, last_name, email),
        livestock:livestock_id(name, category, price)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setOrders(data || []);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(first_name, last_name, email),
        receiver:receiver_id(first_name, last_name, email),
        livestock:livestock_id(name)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setMessages(data || []);
  };

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setStories(data || []);
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        profiles!transactions_user_id_fkey(first_name, last_name, email),
        orders!transactions_order_id_fkey(total_amount)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setTransactions(data || []);
  };

  const fetchAnalytics = async () => {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (!error) setAnalytics(data || []);
  };

  // User Management Functions
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

  // Livestock Management Functions
  const handleLivestockAction = async (action: string, livestockId: string) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'approve':
          await supabase
            .from('livestock')
            .update({ verified: true })
            .eq('id', livestockId);
          break;
        case 'reject':
          await supabase
            .from('livestock')
            .update({ verified: false })
            .eq('id', livestockId);
          break;
        case 'feature':
          await supabase
            .from('livestock')
            .update({ featured: true })
            .eq('id', livestockId);
          break;
        case 'unfeature':
          await supabase
            .from('livestock')
            .update({ featured: false })
            .eq('id', livestockId);
          break;
        case 'delete':
          await supabase
            .from('livestock')
            .delete()
            .eq('id', livestockId);
          break;
      }
      
      toast({
        title: "Livestock Updated",
        description: `Livestock ${action} successful`,
      });
      
      await fetchLivestock();
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

  // Story Management Functions
  const handleAddStory = async () => {
    try {
      setLoading(true);
      
      if (!newStory.title || !newStory.content || !newStory.authorName) {
        toast({
          title: "Validation Error",
          description: "Please fill in all fields",
          variant: "destructive"
        });
        return;
      }

      await supabase
        .from('stories')
        .insert({
          title: newStory.title,
          content: newStory.content,
          author_name: newStory.authorName,
          author_id: user?.id,
          featured: true
        });
      
      toast({
        title: "Story Added",
        description: "Community story added successfully",
      });
      
      setNewStory({ title: '', content: '', authorName: '' });
      await fetchStories();
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

  const handleUpdateStory = async () => {
    try {
      setLoading(true);
      
      await supabase
        .from('stories')
        .update({
          title: editingStory.title,
          content: editingStory.content,
          author_name: editingStory.author_name
        })
        .eq('id', editingStory.id);
      
      toast({
        title: "Story Updated",
        description: "Story updated successfully",
      });
      
      setEditingStory(null);
      await fetchStories();
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

  const handleDeleteStory = async (storyId: string) => {
    try {
      setLoading(true);
      
      await supabase
        .from('stories')
        .delete()
        .eq('id', storyId);
      
      toast({
        title: "Story Deleted",
        description: "Story deleted successfully",
      });
      
      await fetchStories();
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

  // Export Functions
  const exportData = async (type: string) => {
    try {
      let data: any[] = [];
      let filename = '';
      
      switch (type) {
        case 'users':
          data = users;
          filename = 'users_export.csv';
          break;
        case 'livestock':
          data = livestock;
          filename = 'livestock_export.csv';
          break;
        case 'orders':
          data = orders;
          filename = 'orders_export.csv';
          break;
        case 'transactions':
          data = transactions;
          filename = 'transactions_export.csv';
          break;
      }
      
      if (data.length === 0) {
        toast({
          title: "No Data",
          description: "No data available to export",
          variant: "destructive"
        });
        return;
      }
      
      // Convert to CSV
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(item => Object.values(item).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: `${type} data exported successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  // Security check - don't render if not admin
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground mb-4">You don't have permission to access the admin panel.</p>
            <Button onClick={onClose}>Close</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
        activeTab === id 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">ChapaMarket Admin Dashboard</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-16 sm:w-64 bg-accent/50 border-r border-border p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-2">
              <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
              <TabButton id="users" label="Users" icon={Users} />
              <TabButton id="livestock" label="Livestock" icon={ShoppingCart} />
              <TabButton id="orders" label="Orders" icon={DollarSign} />
              <TabButton id="messages" label="Messages" icon={MessageSquare} />
              <TabButton id="stories" label="Stories" icon={FileText} />
              <TabButton id="transactions" label="Transactions" icon={CreditCard} />
              <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
              <TabButton id="notifications" label="Notifications" icon={Megaphone} />
              <TabButton id="settings" label="Settings" icon={Settings} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-2xl font-bold">{stats.totalUsers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Livestock</p>
                          <p className="text-2xl font-bold">{stats.totalListings}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => setActiveTab('users')} variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button onClick={() => setActiveTab('livestock')} variant="outline">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Review Listings
                      </Button>
                      <Button onClick={() => setActiveTab('orders')} variant="outline">
                        <DollarSign className="h-4 w-4 mr-2" />
                        View Orders
                      </Button>
                      <Button onClick={() => exportData('users')} variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 5).map((order: any) => (
                        <div key={order.id} className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">New order placed</p>
                            <p className="text-xs text-muted-foreground">
                              {order.livestock?.name} - ${order.total_amount}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
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
                    <Button onClick={() => exportData('users')} variant="outline" size="sm">
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
                                  onClick={() => setEditingUser(user)}
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
            )}

            {/* Livestock Management */}
            {activeTab === 'livestock' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">Livestock Management</h3>
                  <div className="flex gap-2">
                    <Button onClick={() => exportData('livestock')} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Animal</TableHead>
                          <TableHead className="hidden sm:table-cell">Seller</TableHead>
                          <TableHead className="hidden md:table-cell">Price</TableHead>
                          <TableHead className="hidden lg:table-cell">Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {livestock.map((animal: any) => (
                          <TableRow key={animal.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                {animal.image_url && (
                                  <img 
                                    src={animal.image_url} 
                                    alt={animal.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-sm">{animal.name}</p>
                                  <p className="text-xs text-muted-foreground">{animal.breed}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm hidden sm:table-cell">
                              {animal.profiles?.first_name} {animal.profiles?.last_name}
                            </TableCell>
                            <TableCell className="text-sm font-medium hidden md:table-cell">
                              ${animal.price}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                animal.verified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                              }`}>
                                {animal.verified ? 'Approved' : 'Pending'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {!animal.verified && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleLivestockAction('approve', animal.id)}
                                    title="Approve livestock"
                                    disabled={loading}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                )}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleLivestockAction(animal.featured ? 'unfeature' : 'feature', animal.id)}
                                  title={animal.featured ? 'Remove from featured' : 'Add to featured'}
                                  disabled={loading}
                                >
                                  <Star className={`h-3 w-3 ${animal.featured ? 'fill-current' : ''}`} />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingLivestock(animal)}
                                  title="Edit livestock"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleLivestockAction('delete', animal.id)}
                                  title="Delete livestock"
                                  disabled={loading}
                                >
                                  <Trash2 className="h-3 w-3" />
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
            )}

            {/* Orders Management */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">Orders Management</h3>
                  <Button onClick={() => exportData('orders')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Orders
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Buyer</TableHead>
                          <TableHead>Livestock</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order: any) => (
                          <TableRow key={order.id}>
                            <TableCell className="text-sm font-mono">
                              {order.id.slice(0, 8)}...
                            </TableCell>
                            <TableCell className="text-sm">
                              {order.buyer?.first_name} {order.buyer?.last_name}
                            </TableCell>
                            <TableCell className="text-sm">
                              {order.livestock?.name}
                            </TableCell>
                            <TableCell className="text-sm font-medium">
                              ${order.total_amount}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.order_status === 'completed' ? 'bg-green-100 text-green-800' :
                                order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.order_status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Messages Management */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Messages & Conversations</h3>
                <Card>
                  <CardContent className="space-y-4 p-6">
                    {messages.map((message: any) => (
                      <div key={message.id} className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">
                              From: {message.sender?.first_name} {message.sender?.last_name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              To: {message.receiver?.first_name} {message.receiver?.last_name}
                            </p>
                            {message.livestock && (
                              <p className="text-xs text-muted-foreground">
                                Re: {message.livestock.name}
                              </p>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Stories Management */}
            {activeTab === 'stories' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Community Stories Management</h3>

                {/* Add New Story Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Story</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Story title"
                        value={newStory.title}
                        onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      />
                      <Input
                        placeholder="Author name"
                        value={newStory.authorName}
                        onChange={(e) => setNewStory({ ...newStory, authorName: e.target.value })}
                      />
                    </div>
                    <Textarea
                      placeholder="Story content..."
                      rows={4}
                      value={newStory.content}
                      onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                    />
                    <Button 
                      onClick={handleAddStory}
                      disabled={loading}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Story
                    </Button>
                  </CardContent>
                </Card>

                {/* Stories List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.map((story: any) => (
                    <Card key={story.id}>
                      <CardContent className="p-6">
                        {editingStory?.id === story.id ? (
                          <div className="space-y-4">
                            <Input
                              value={editingStory.title}
                              onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                            />
                            <Input
                              value={editingStory.author_name}
                              onChange={(e) => setEditingStory({ ...editingStory, author_name: e.target.value })}
                            />
                            <Textarea
                              value={editingStory.content}
                              onChange={(e) => setEditingStory({ ...editingStory, content: e.target.value })}
                              rows={4}
                            />
                            <div className="flex gap-2">
                              <Button onClick={handleUpdateStory} size="sm" disabled={loading}>
                                <Save className="h-3 w-3 mr-1" />
                                Save
                              </Button>
                              <Button onClick={() => setEditingStory(null)} variant="outline" size="sm">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{story.author_name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(story.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">{story.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-3">{story.content}</p>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                story.featured ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                              }`}>
                                {story.featured ? 'Featured' : 'Regular'}
                              </span>
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setEditingStory(story)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteStory(story.id)}
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
            )}

            {/* Transactions Management */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">Transactions</h3>
                  <Button onClick={() => exportData('transactions')} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transaction ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {transactions.map((transaction: any) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="text-sm font-mono">
                              {transaction.transaction_id || transaction.id.slice(0, 8)}
                            </TableCell>
                            <TableCell className="text-sm">
                              {transaction.profiles?.first_name} {transaction.profiles?.last_name}
                            </TableCell>
                            <TableCell className="text-sm font-medium">
                              {transaction.amount} {transaction.currency}
                            </TableCell>
                            <TableCell className="text-sm">
                              {transaction.payment_method}
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {transaction.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-sm">
                              {new Date(transaction.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Analytics & Reports</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Revenue Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-accent/50 rounded-lg flex flex-col items-center justify-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Revenue chart visualization</p>
                        <p className="text-sm text-muted-foreground">Total: ${stats.monthlyRevenue}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-48 bg-accent/50 rounded-lg flex flex-col items-center justify-center">
                        <Users className="h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">User growth analytics</p>
                        <p className="text-sm text-muted-foreground">Total: {stats.totalUsers} users</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics Data Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Events</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Type</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Livestock</TableHead>
                          <TableHead>Session</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.map((event: any) => (
                          <TableRow key={event.id}>
                            <TableCell className="text-sm">{event.event_type}</TableCell>
                            <TableCell className="text-sm">{event.user_id?.slice(0, 8) || 'Anonymous'}</TableCell>
                            <TableCell className="text-sm">{event.livestock_id?.slice(0, 8) || 'N/A'}</TableCell>
                            <TableCell className="text-sm">{event.session_id?.slice(0, 8) || 'N/A'}</TableCell>
                            <TableCell className="text-sm">
                              {new Date(event.created_at).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Push Notifications Manager</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input placeholder="Notification title" className="flex-1" />
                        <Button 
                          onClick={() => toast({ title: "Notification Sent", description: "Push notification sent successfully" })}
                        >
                          <Megaphone className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                      <Textarea placeholder="Notification message..." rows={3} />
                      <div className="flex gap-2">
                        <Button variant="outline">Schedule</Button>
                        <Button variant="outline">Send to All</Button>
                        <Button variant="outline">Send to Sellers</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">System Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">General Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Site Name</label>
                        <Input defaultValue="ChapaMarket" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Admin Email</label>
                        <Input defaultValue="admin@chapamarket.com" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Language Management</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({ title: "Languages", description: "Managing supported languages" })}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => toast({ title: "Settings Saved", description: "System settings updated successfully" })}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Settings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({ title: "2FA Setup", description: "Two-factor authentication setup coming soon" })}
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Setup 2FA
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Login History</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({ title: "Login History", description: "Viewing admin login history" })}
                        >
                          <History className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Activity Logs</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toast({ title: "Activity Logs", description: "Viewing admin activity logs" })}
                        >
                          <Activity className="h-4 w-4 mr-2" />
                          View Logs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
