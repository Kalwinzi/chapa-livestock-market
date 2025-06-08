
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

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

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
      case 'stories':
        return <StoriesManagement />;
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
