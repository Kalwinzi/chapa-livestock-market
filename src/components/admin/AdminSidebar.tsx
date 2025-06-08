
import React from 'react';
import { 
  BarChart3, Users, ShoppingCart, DollarSign, MessageSquare, FileText,
  TrendingUp, Megaphone, Settings, CreditCard
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
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
  );
};

export default AdminSidebar;
