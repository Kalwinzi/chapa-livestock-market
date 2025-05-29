
import React, { useState } from 'react';
import { Settings, Users, Package, BarChart3, MessageSquare, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Admin Action",
      description: `${action} functionality will be implemented in full version.`,
    });
  };

  if (!isOpen) return null;

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Active Listings', value: '856', icon: Package, color: 'text-green-600' },
    { label: 'Monthly Sales', value: '₦2.5M', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Support Tickets', value: '23', icon: MessageSquare, color: 'text-orange-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-green-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6" />
            <h2 className="text-2xl font-bold">ChapaMarket Admin Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2 hover:bg-green-600 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-88px)]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'listings', label: 'Listings', icon: Package },
                { id: 'support', label: 'Support', icon: MessageSquare },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h3>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        'New user registration: John Mwanza from Arusha',
                        'Livestock listing approved: Holstein Cow #1247',
                        'Transaction completed: Goat sale - 450,000 TSH',
                        'Support ticket resolved: Payment inquiry #789',
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h3>
                  <Button onClick={() => handleAction('Add User')} className="bg-green-600 hover:bg-green-700">
                    Add New User
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {[
                        { name: 'Kalwin Zic', email: 'kalwinzic@gmail.com', role: 'Admin', status: 'Active' },
                        { name: 'John Mwanza', email: 'john@example.com', role: 'Seller', status: 'Active' },
                        { name: 'Mary Mollel', email: 'mary@example.com', role: 'Buyer', status: 'Pending' },
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-white">{user.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{user.role}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Add similar content for other tabs */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Livestock Listings</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage and moderate livestock listings across Tanzania.</p>
                <Button onClick={() => handleAction('Manage Listings')} className="bg-green-600 hover:bg-green-700">
                  View All Listings
                </Button>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Handle customer inquiries and support tickets.</p>
                <Button onClick={() => handleAction('Support Dashboard')} className="bg-green-600 hover:bg-green-700">
                  Open Support Center
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
