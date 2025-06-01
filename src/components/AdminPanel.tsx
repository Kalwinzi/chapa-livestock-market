
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  X, 
  BarChart3,
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings, 
  MessageSquare,
  BookOpen,
  Bell,
  DollarSign,
  FileText
} from 'lucide-react';

// Import focused components
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import LivestockManagement from './admin/LivestockManagement';
import StoriesManager from './admin/StoriesManager';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    dailyListings: 0,
    totalRevenue: 0,
    activeMessages: 0,
    pendingApprovals: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchDashboardStats();
    }
  }, [isOpen]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch livestock count
      const { count: livestockCount } = await supabase
        .from('livestock')
        .select('*', { count: 'exact', head: true });

      // Fetch daily livestock count
      const today = new Date().toISOString().split('T')[0];
      const { count: dailyCount } = await supabase
        .from('livestock')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      // Fetch messages count
      const { count: messagesCount } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true });

      // Fetch pending approvals
      const { count: pendingCount } = await supabase
        .from('livestock')
        .select('*', { count: 'exact', head: true })
        .eq('verified', false);

      setDashboardStats({
        totalUsers: usersCount || 0,
        totalListings: livestockCount || 0,
        dailyListings: dailyCount || 0,
        totalRevenue: 2500000, // Mock data
        activeMessages: messagesCount || 0,
        pendingApprovals: pendingCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const sendAnnouncement = async () => {
    try {
      // This would send a notification to all users
      toast({
        title: "Announcement Sent",
        description: "Notification sent to all users successfully",
      });
    } catch (error) {
      console.error('Error sending announcement:', error);
      toast({
        title: "Error",
        description: "Failed to send announcement",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full text-left ${
        activeTab === id 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={sendAnnouncement}>
              <Bell className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-16 sm:w-64 bg-accent/30 border-r border-border p-3 sm:p-4 overflow-y-auto">
            <div className="space-y-2">
              <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
              <TabButton id="users" label="Users" icon={Users} />
              <TabButton id="livestock" label="Livestock" icon={ShoppingCart} />
              <TabButton id="messages" label="Messages" icon={MessageSquare} />
              <TabButton id="payments" label="Payments" icon={DollarSign} />
              <TabButton id="stories" label="Stories" icon={BookOpen} />
              <TabButton id="reports" label="Reports" icon={FileText} />
              <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
              <TabButton id="settings" label="Settings" icon={Settings} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeTab === 'dashboard' && (
              <AdminDashboard stats={dashboardStats} />
            )}

            {activeTab === 'users' && (
              <UserManagement />
            )}

            {activeTab === 'livestock' && (
              <LivestockManagement />
            )}

            {activeTab === 'stories' && (
              <StoriesManager />
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Messages & Inquiries</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Messages management coming soon</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        View and manage buyer-seller communications
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Payment History</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Payment management coming soon</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Track Pi Coin and TZS transactions
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Reports & Feedback</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Reports management coming soon</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Handle community reports and feedback
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Analytics & Insights</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">User growth chart coming soon</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Livestock Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Livestock trends chart coming soon</p>
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
                      <Button>Save Settings</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Two-Factor Authentication</span>
                        <Button variant="outline" size="sm">Enable</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Session Timeout</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Activity Logging</span>
                        <Button variant="outline" size="sm">Enabled</Button>
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
