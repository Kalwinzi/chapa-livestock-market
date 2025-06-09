
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import AdminDashboard from './admin/AdminDashboard';
import UserManagement from './admin/UserManagement';
import LivestockManagement from './admin/LivestockManagement';
import OrdersManagement from './admin/OrdersManagement';
import MessagesManagement from './admin/MessagesManagement';
import StoriesManagement from './admin/StoriesManagement';
import AnalyticsManagement from './admin/AnalyticsManagement';
import NotificationsManagement from './admin/NotificationsManagement';
import SettingsManagement from './admin/SettingsManagement';
import AdminChatSystem from './admin/AdminChatSystem';
import AdminReportsManagement from './admin/AdminReportsManagement';
import AdminBannerManagement from './admin/AdminBannerManagement';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminVerified, setAdminVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  // Enhanced admin verification
  useEffect(() => {
    const verifyAdminAccess = async () => {
      if (!isOpen) return;
      
      setLoading(true);
      
      try {
        // Check if user exists and has admin role
        if (!user) {
          toast({
            title: "Access Denied",
            description: "You must be logged in to access the admin panel",
            variant: "destructive"
          });
          onClose();
          return;
        }

        // Verify admin status with additional security check
        if (!isAdmin || user.email !== 'kalwinzic@gmail.com') {
          toast({
            title: "Access Denied",
            description: "You don't have permission to access the admin panel",
            variant: "destructive"
          });
          onClose();
          return;
        }

        setAdminVerified(true);
        
        toast({
          title: "Admin Access Granted",
          description: `Welcome to the admin dashboard, ${user.user_metadata?.first_name || 'Admin'}!`,
        });
      } catch (error) {
        console.error('Admin verification error:', error);
        toast({
          title: "Verification Error",
          description: "Failed to verify admin access",
          variant: "destructive"
        });
        onClose();
      } finally {
        setLoading(false);
      }
    };

    verifyAdminAccess();
  }, [isOpen, user, isAdmin, onClose, toast]);

  if (!isOpen) return null;

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Verifying Admin Access</h3>
            <p className="text-muted-foreground">Please wait while we verify your credentials...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Security check - don't render if not verified admin
  if (!adminVerified || !isAdmin || user?.email !== 'kalwinzic@gmail.com') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p className="text-muted-foreground mb-4">
              Only the authorized admin (kalwinzic@gmail.com) can access this panel.
            </p>
            <Button onClick={onClose}>Close</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'livestock':
        return <LivestockManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'chat':
        return <AdminChatSystem />;
      case 'stories':
        return <StoriesManagement />;
      case 'banners':
        return <AdminBannerManagement />;
      case 'reports':
        return <AdminReportsManagement />;
      case 'analytics':
        return <AnalyticsManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'settings':
        return <SettingsManagement />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        <AdminHeader onClose={onClose} />
        
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
