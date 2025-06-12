
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  Beef, 
  ShoppingCart, 
  MessageSquare, 
  BookOpen, 
  BarChart3, 
  Bell, 
  Settings,
  MessageCircle,
  AlertTriangle,
  Image,
  Crown,
  CreditCard,
  Shield,
  Home
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'livestock', label: 'Livestock', icon: Beef },
    { id: 'stories', label: 'Stories', icon: BookOpen },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'chat', label: 'Live Chat', icon: MessageCircle },
    { id: 'payment', label: 'Payment Config', icon: CreditCard },
    { id: 'premium', label: 'Premium Zone', icon: Crown },
    { id: 'reports', label: 'Reports', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'sessions', label: 'Sessions', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="w-64 bg-muted/30 border-r border-border p-4 overflow-y-auto">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
