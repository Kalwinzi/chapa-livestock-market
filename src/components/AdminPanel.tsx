
import React, { useState } from 'react';
import { Settings, Users, Package, BarChart3, MessageSquare, X, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    if (email === 'kalwinzic@gmail.com' && password === 'Chapa@2004') {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to ChapaMarket Admin Panel",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setActiveTab('overview');
  };

  const handleAction = (action: string) => {
    toast({
      title: "Admin Action",
      description: `${action} functionality will be implemented in full version.`,
    });
  };

  if (!isOpen) return null;

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600', growth: '+12%' },
    { label: 'Active Listings', value: '856', icon: Package, color: 'text-green-600', growth: '+8%' },
    { label: 'Monthly Sales', value: '₦2.5M', icon: BarChart3, color: 'text-purple-600', growth: '+15%' },
    { label: 'Support Tickets', value: '23', icon: MessageSquare, color: 'text-orange-600', growth: '-5%' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6" />
            <h2 className="text-2xl font-bold">ChapaMarket Admin Panel</h2>
          </div>
          <div className="flex items-center space-x-3">
            {isLoggedIn && (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:bg-green-600"
              >
                Logout
              </Button>
            )}
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 p-2 hover:bg-green-600 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {!isLoggedIn ? (
          /* Login Form */
          <div className="flex items-center justify-center h-[calc(90vh-88px)]">
            <div className="w-full max-w-md p-8">
              <div className="text-center mb-8">
                <Lock className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Enter your credentials to access the admin panel</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@chapamarket.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button
                  onClick={handleLogin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                >
                  Login to Admin Panel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-[calc(90vh-88px)]">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Dashboard', icon: BarChart3 },
                  { id: 'users', label: 'User Management', icon: Users },
                  { id: 'listings', label: 'Livestock Management', icon: Package },
                  { id: 'support', label: 'Support Center', icon: MessageSquare },
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
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Last updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {/* Enhanced Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                              <p className={`text-sm font-medium ${
                                stat.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {stat.growth} from last month
                              </p>
                            </div>
                            <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700`}>
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Recent Admin Activity
                        <Button size="sm" variant="outline" onClick={() => handleAction('View All Activity')}>
                          View All
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { action: 'New user registration', details: 'John Mwanza from Arusha', time: '2 min ago', type: 'user' },
                          { action: 'Livestock listing approved', details: 'Holstein Cow #1247', time: '5 min ago', type: 'listing' },
                          { action: 'Transaction completed', details: 'Goat sale - 450,000 TSH', time: '12 min ago', type: 'transaction' },
                          { action: 'Support ticket resolved', details: 'Payment inquiry #789', time: '25 min ago', type: 'support' },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'user' ? 'bg-blue-500' :
                              activity.type === 'listing' ? 'bg-green-500' :
                              activity.type === 'transaction' ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 dark:text-white">{activity.action}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.details}</p>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
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
                          { name: 'Kalwin Zic', email: 'kalwinzic@gmail.com', role: 'Admin', status: 'Active', joined: '2024-01-15' },
                          { name: 'John Mwanza', email: 'john@example.com', role: 'Seller', status: 'Active', joined: '2024-02-20' },
                          { name: 'Mary Mollel', email: 'mary@example.com', role: 'Buyer', status: 'Pending', joined: '2024-03-10' },
                        ].map((user, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 dark:text-white">{user.name}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">Joined: {user.joined}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-sm text-gray-600 dark:text-gray-400 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                                {user.role}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              }`}>
                                {user.status}
                              </span>
                              <Button size="sm" variant="outline" onClick={() => handleAction(`Manage ${user.name}`)}>
                                Manage
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Livestock Management</h3>
                    <Button onClick={() => handleAction('Add Listing')} className="bg-green-600 hover:bg-green-700">
                      Add New Listing
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Manage and moderate livestock listings across Tanzania and other African countries.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button onClick={() => handleAction('Pending Approvals')} variant="outline" className="h-20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">23</div>
                            <div className="text-sm">Pending Approvals</div>
                          </div>
                        </Button>
                        <Button onClick={() => handleAction('Active Listings')} variant="outline" className="h-20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">856</div>
                            <div className="text-sm">Active Listings</div>
                          </div>
                        </Button>
                        <Button onClick={() => handleAction('Reported Content')} variant="outline" className="h-20">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">5</div>
                            <div className="text-sm">Reported Content</div>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Support Center</h3>
                    <Button onClick={() => handleAction('New Ticket')} className="bg-green-600 hover:bg-green-700">
                      Create Ticket
                    </Button>
                  </div>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Handle customer inquiries and support tickets efficiently.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={() => handleAction('Open Tickets')} variant="outline" className="h-16">
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">12</div>
                            <div className="text-sm">Open Tickets</div>
                          </div>
                        </Button>
                        <Button onClick={() => handleAction('Resolved Tickets')} variant="outline" className="h-16">
                          <div className="text-center">
                            <div className="text-xl font-bold text-green-600">245</div>
                            <div className="text-sm">Resolved This Month</div>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
