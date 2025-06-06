import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { 
  X, Users, ShoppingCart, TrendingUp, Settings, Search, Filter, Eye, Edit, Trash2, Ban, 
  CheckCircle, AlertCircle, BarChart3, MessageSquare, DollarSign, Calendar, Plus,
  FileText, Megaphone, BookOpen, Bot, Coins, Lock, History, Activity, Mail,
  CreditCard, Star, PieChart, Database, Globe, Shield
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
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    pendingApprovals: 0,
    activeMessages: 0
  });

  const [users, setUsers] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stories, setStories] = useState([]);

  // Fetch admin dashboard data
  useEffect(() => {
    if (isOpen && user) {
      fetchDashboardData();
    }
  }, [isOpen, user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch livestock count
      const { count: livestockCount } = await supabase
        .from('livestock')
        .select('*', { count: 'exact', head: true });

      // Fetch orders count and total revenue
      const { data: ordersData, count: ordersCount } = await supabase
        .from('orders')
        .select('total_amount', { count: 'exact' });

      const totalRevenue = ordersData?.reduce((sum, order) => sum + parseFloat(order.total_amount || '0'), 0) || 0;

      // Fetch pending livestock approvals
      const { count: pendingCount } = await supabase
        .from('livestock')
        .select('*', { count: 'exact', head: true })
        .eq('verified', false);

      // Fetch active messages
      const { count: messagesCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalListings: livestockCount || 0,
        totalOrders: ordersCount || 0,
        monthlyRevenue: totalRevenue,
        pendingApprovals: pendingCount || 0,
        activeMessages: messagesCount || 0
      });

      // Fetch detailed data for tables
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: livestockData } = await supabase
        .from('livestock')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: ordersDataDetailed } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:buyer_id(first_name, last_name, email),
          seller:seller_id(first_name, last_name, email),
          livestock:livestock_id(name, category)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: messagesData } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(first_name, last_name, email),
          receiver:receiver_id(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(usersData || []);
      setLivestock(livestockData || []);
      setOrders(ordersDataDetailed || []);
      setMessages(messagesData || []);
      setStories(storiesData || []);

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

  const handleUserAction = async (action: string, userId: string) => {
    try {
      if (action === 'ban') {
        // In a real implementation, you'd add a banned field to profiles
        await supabase
          .from('profiles')
          .update({ user_type: 'banned' })
          .eq('id', userId);
      }
      
      toast({
        title: "Action Completed",
        description: `User ${action} successfully`,
      });
      
      fetchDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleLivestockAction = async (action: string, livestockId: string) => {
    try {
      if (action === 'approve') {
        await supabase
          .from('livestock')
          .update({ verified: true })
          .eq('id', livestockId);
      } else if (action === 'reject') {
        await supabase
          .from('livestock')
          .update({ verified: false })
          .eq('id', livestockId);
      } else if (action === 'delete') {
        await supabase
          .from('livestock')
          .delete()
          .eq('id', livestockId);
      }
      
      toast({
        title: "Livestock Updated",
        description: `Livestock ${action} successfully`,
      });
      
      fetchDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAddStory = async (title: string, content: string, authorName: string) => {
    try {
      await supabase
        .from('stories')
        .insert({
          title,
          content,
          author_name: authorName,
          author_id: user?.id,
          featured: true
        });
      
      toast({
        title: "Story Added",
        description: "Community story added successfully",
      });
      
      fetchDashboardData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
        activeTab === id 
          ? 'bg-primary-500 text-white' 
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
          <div className="w-16 sm:w-64 bg-accent-50 dark:bg-gray-900/50 border-r border-border p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-2">
              <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
              <TabButton id="users" label="Users" icon={Users} />
              <TabButton id="livestock" label="Livestock" icon={ShoppingCart} />
              <TabButton id="orders" label="Orders" icon={DollarSign} />
              <TabButton id="messages" label="Messages" icon={MessageSquare} />
              <TabButton id="stories" label="Stories" icon={FileText} />
              <TabButton id="notifications" label="Notifications" icon={Megaphone} />
              <TabButton id="education" label="Education" icon={BookOpen} />
              <TabButton id="ai-assistant" label="AI Assistant" icon={Bot} />
              <TabButton id="pi-coin" label="Pi Coin" icon={Coins} />
              <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
              <TabButton id="security" label="Security" icon={Shield} />
              <TabButton id="settings" label="Settings" icon={Settings} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            )}

            {!loading && activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-xl sm:text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Livestock</p>
                          <p className="text-xl sm:text-2xl font-bold">{stats.totalListings.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xl sm:text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl sm:text-2xl font-bold">{stats.pendingApprovals}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Messages</p>
                          <p className="text-xl sm:text-2xl font-bold">{stats.activeMessages}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Orders</p>
                          <p className="text-xl sm:text-2xl font-bold">{stats.totalOrders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order: any) => (
                        <div key={order.id} className="flex items-center space-x-3 p-3 bg-accent-50 dark:bg-accent-900/30 rounded-lg">
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
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr className="text-left">
                            <th className="p-4 font-medium">User</th>
                            <th className="p-4 font-medium hidden sm:table-cell">Type</th>
                            <th className="p-4 font-medium hidden md:table-cell">Location</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Join Date</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user: any) => (
                            <tr key={user.id} className="border-b border-border">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-sm">{user.first_name} {user.last_name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </td>
                              <td className="p-4 hidden sm:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.user_type === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                  user.user_type === 'seller' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                  'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                }`}>
                                  {user.user_type}
                                </span>
                              </td>
                              <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{user.location}</td>
                              <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">
                                {new Date(user.created_at).toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleUserAction('view', user.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleUserAction('ban', user.id)}
                                  >
                                    <Ban className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                    <Button className="bg-primary-500 hover:bg-primary-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Livestock
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr className="text-left">
                            <th className="p-4 font-medium">Animal</th>
                            <th className="p-4 font-medium hidden sm:table-cell">Category</th>
                            <th className="p-4 font-medium hidden md:table-cell">Price</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {livestock.map((animal: any) => (
                            <tr key={animal.id} className="border-b border-border">
                              <td className="p-4">
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
                              </td>
                              <td className="p-4 text-sm hidden sm:table-cell">{animal.category}</td>
                              <td className="p-4 text-sm font-medium hidden md:table-cell">{animal.price}</td>
                              <td className="p-4 hidden lg:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  animal.verified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}>
                                  {animal.verified ? 'Approved' : 'Pending'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleLivestockAction('approve', animal.id)}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleLivestockAction('edit', animal.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleLivestockAction('delete', animal.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Stories Management */}
            {activeTab === 'stories' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">Community Stories</h3>
                  <Button 
                    className="bg-primary-500 hover:bg-primary-600"
                    onClick={() => {
                      const title = prompt('Story title:');
                      const content = prompt('Story content:');
                      const author = prompt('Author name:');
                      if (title && content && author) {
                        handleAddStory(title, content, author);
                      }
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Story
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stories.map((story: any) => (
                    <Card key={story.id}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            {story.author_image && (
                              <img 
                                src={story.author_image} 
                                alt={story.author_name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            )}
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
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs with placeholder content */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Orders Management</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Orders management functionality ready</p>
                      <p className="text-sm text-muted-foreground mt-2">Total Orders: {stats.totalOrders}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Messages & Conversations</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Message management system ready</p>
                      <p className="text-sm text-muted-foreground mt-2">Active Messages: {stats.activeMessages}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Push Notifications Manager</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input placeholder="Notification title" className="flex-1" />
                        <Button className="bg-primary-500 hover:bg-primary-600">
                          <Megaphone className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                      <Textarea placeholder="Notification message..." rows={3} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Education Content</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Livestock education content manager</p>
                      <Button className="mt-4" variant="outline">Upload Content</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'ai-assistant' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">AI Assistant Controls</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">AI assistant management panel</p>
                      <div className="flex gap-2 mt-4 justify-center">
                        <Button variant="outline">Enable AI</Button>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'pi-coin' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Pi Coin Transaction Monitoring</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Coins className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Pi Coin payment system dashboard</p>
                      <p className="text-sm text-muted-foreground mt-2">Monitor and manage Pi Coin transactions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Analytics & Reports</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Revenue Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Revenue chart visualization</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">User growth analytics</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Security & Admin Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Admin Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Button variant="outline" size="sm">
                          <Lock className="h-4 w-4 mr-2" />
                          Setup 2FA
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Login History</span>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4 mr-2" />
                          View History
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Activity Logs</span>
                        <Button variant="outline" size="sm">
                          <Activity className="h-4 w-4 mr-2" />
                          View Logs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">System Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rate Limiting</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Error Logs</span>
                        <Button variant="outline" size="sm">View Errors</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Security Scan</span>
                        <Button variant="outline" size="sm">Run Scan</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

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
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Payment Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payment Methods</span>
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mobile Money</span>
                        <Button variant="outline" size="sm">Setup</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pi Coin Integration</span>
                        <Button variant="outline" size="sm">Configure</Button>
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
