
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { X, LogOut, Sun, Moon, Users, Beef, MessageSquare, Crown, Image, Settings, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import HomepageImageManager from './HomepageImageManager';
import EnhancedLivestockManager from './EnhancedLivestockManager';
import EnhancedStoryManager from './EnhancedStoryManager';
import EnhancedUserManager from './EnhancedUserManager';
import PremiumConfigManager from './PremiumConfigManager';
import PaymentSetupManager from './PaymentSetupManager';
import AdminSearchManager from './AdminSearchManager';

interface EnhancedAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedAdminPanel: React.FC<EnhancedAdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('homepage');
  const { signOut, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const adminTabs = [
    { id: 'homepage', label: 'Homepage Images', icon: Image },
    { id: 'livestock', label: 'Livestock', icon: Beef },
    { id: 'stories', label: 'Stories', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'premium', label: 'Premium Zone', icon: Crown },
    { id: 'payment', label: 'Payment Setup', icon: Settings },
    { id: 'search', label: 'Search', icon: Search },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'homepage':
        return <HomepageImageManager />;
      case 'livestock':
        return <EnhancedLivestockManager />;
      case 'stories':
        return <EnhancedStoryManager />;
      case 'users':
        return <EnhancedUserManager />;
      case 'premium':
        return <PremiumConfigManager />;
      case 'payment':
        return <PaymentSetupManager />;
      case 'search':
        return <AdminSearchManager />;
      default:
        return <HomepageImageManager />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-foreground">ChapaMarket Admin Panel</h1>
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-muted/30 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {adminTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderActiveTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminPanel;
