
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
import PremiumManagement from './admin/PremiumManagement';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminVerified, setAdminVerified] = useState(true); // Removed password gate
  const [loading, setLoading] = useState(false); // No loading for now
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  // Simplified admin verification - no password gate
  useEffect(() => {
    if (!isOpen) return;
    
    setAdminVerified(true);
    setLoading(false);
    
    toast({
      title: "Admin Access Granted",
      description: "Welcome to the admin dashboard!",
    });
  }, [isOpen, toast]);

  if (!isOpen) return null;

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
      case 'premium':
        return <PremiumManagement />;
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
