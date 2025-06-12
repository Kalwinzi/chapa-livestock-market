
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import AdminDashboard from './admin/AdminDashboard';
import EnhancedUserManagement from './admin/EnhancedUserManagement';
import EnhancedLivestockManagement from './admin/EnhancedLivestockManagement';
import OrdersManagement from './admin/OrdersManagement';
import MessagesManagement from './admin/MessagesManagement';
import StoriesManagement from './admin/StoriesManagement';
import AnalyticsManagement from './admin/AnalyticsManagement';
import NotificationsManagement from './admin/NotificationsManagement';
import SettingsManagement from './admin/SettingsManagement';
import AdminChatSystem from './admin/AdminChatSystem';
import AdminReportsManagement from './admin/AdminReportsManagement';
import HomepageImageManager from './admin/HomepageImageManager';
import PaymentConfigurationManager from './admin/PaymentConfigurationManager';
import PremiumManagement from './admin/PremiumManagement';
import SessionManagement from './admin/SessionManagement';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  if (!isOpen) return null;

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'homepage':
        return <HomepageImageManager />;
      case 'users':
        return <EnhancedUserManagement />;
      case 'livestock':
        return <EnhancedLivestockManagement />;
      case 'orders':
        return <OrdersManagement />;
      case 'messages':
        return <MessagesManagement />;
      case 'chat':
        return <AdminChatSystem />;
      case 'stories':
        return <StoriesManagement />;
      case 'banners':
        return <HomepageImageManager />;
      case 'payment':
        return <PaymentConfigurationManager />;
      case 'reports':
        return <AdminReportsManagement />;
      case 'analytics':
        return <AnalyticsManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'premium':
        return <PremiumManagement />;
      case 'sessions':
        return <SessionManagement />;
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
