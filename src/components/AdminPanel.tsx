
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  X, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  Settings, 
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  DollarSign,
  Calendar
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const mockStats = {
    totalUsers: 2847,
    totalListings: 1253,
    monthlyRevenue: 45230,
    pendingApprovals: 23,
    activeTickets: 12
  };

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', verified: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', verified: false, joinDate: '2024-01-20' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'Banned', verified: true, joinDate: '2024-01-10' }
  ];

  const mockListings = [
    { id: 1, title: 'Holstein Dairy Cow', seller: 'John Doe', price: '$1,200', status: 'Approved', date: '2024-01-25' },
    { id: 2, title: 'Angus Beef Cattle', seller: 'Jane Smith', price: '$1,500', status: 'Pending', date: '2024-01-26' },
    { id: 3, title: 'Saanen Goats', seller: 'Bob Wilson', price: '$300', status: 'Rejected', date: '2024-01-24' }
  ];

  const handleUserAction = (action: string, userId: number) => {
    toast({
      title: "Action Completed",
      description: `User ${action} successfully`,
    });
  };

  const handleListingAction = (action: string, listingId: number) => {
    toast({
      title: "Listing Updated",
      description: `Listing ${action} successfully`,
    });
  };

  if (!isOpen) return null;

  const TabButton = ({ id, label, icon: Icon }: { id: string; label: string; icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
        activeTab === id 
          ? 'bg-primary-500 text-white' 
          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-background rounded-xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Admin Dashboard</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-16 sm:w-64 bg-accent-50 dark:bg-gray-900/50 border-r border-border p-3 sm:p-4">
            <div className="space-y-2">
              <TabButton id="dashboard" label="Dashboard" icon={BarChart3} />
              <TabButton id="users" label="Users" icon={Users} />
              <TabButton id="listings" label="Livestock" icon={ShoppingCart} />
              <TabButton id="analytics" label="Analytics" icon={TrendingUp} />
              <TabButton id="support" label="Support" icon={MessageSquare} />
              <TabButton id="settings" label="Settings" icon={Settings} />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Users</p>
                          <p className="text-xl sm:text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Listings</p>
                          <p className="text-xl sm:text-2xl font-bold">{mockStats.totalListings.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xl sm:text-2xl font-bold">${mockStats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Pending</p>
                          <p className="text-xl sm:text-2xl font-bold">{mockStats.pendingApprovals}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Tickets</p>
                          <p className="text-xl sm:text-2xl font-bold">{mockStats.activeTickets}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-accent-50 dark:bg-accent-900/30 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">New livestock listing approved</p>
                          <p className="text-xs text-muted-foreground">Holstein Dairy Cow by John Doe</p>
                        </div>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-accent-50 dark:bg-accent-900/30 rounded-lg">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-xs text-muted-foreground">jane@example.com</p>
                        </div>
                        <span className="text-xs text-muted-foreground">5 min ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr className="text-left">
                            <th className="p-4 font-medium">User</th>
                            <th className="p-4 font-medium hidden sm:table-cell">Status</th>
                            <th className="p-4 font-medium hidden md:table-cell">Verified</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Join Date</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockUsers.map((user) => (
                            <tr key={user.id} className="border-b border-border">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-sm">{user.name}</p>
                                  <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                              </td>
                              <td className="p-4 hidden sm:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                  user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="p-4 hidden md:table-cell">
                                {user.verified ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-orange-500" />
                                )}
                              </td>
                              <td className="p-4 text-sm text-muted-foreground hidden lg:table-cell">{user.joinDate}</td>
                              <td className="p-4">
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleUserAction('viewed', user.id)}
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleUserAction('banned', user.id)}
                                  >
                                    <Ban className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h3 className="text-lg font-semibold">Livestock Management</h3>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full sm:w-64"
                    />
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border">
                          <tr className="text-left">
                            <th className="p-4 font-medium">Listing</th>
                            <th className="p-4 font-medium hidden sm:table-cell">Seller</th>
                            <th className="p-4 font-medium hidden md:table-cell">Price</th>
                            <th className="p-4 font-medium hidden lg:table-cell">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockListings.map((listing) => (
                            <tr key={listing.id} className="border-b border-border">
                              <td className="p-4">
                                <div>
                                  <p className="font-medium text-sm">{listing.title}</p>
                                  <p className="text-xs text-muted-foreground">{listing.date}</p>
                                </div>
                              </td>
                              <td className="p-4 text-sm hidden sm:table-cell">{listing.seller}</td>
                              <td className="p-4 text-sm font-medium hidden md:table-cell">{listing.price}</td>
                              <td className="p-4 hidden lg:table-cell">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  listing.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                  listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}>
                                  {listing.status}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleListingAction('approved', listing.id)}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleListingAction('edited', listing.id)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleListingAction('deleted', listing.id)}
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Analytics Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Monthly Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Chart placeholder - Revenue trends</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-accent-50 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Chart placeholder - User growth</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Support Tickets</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No active support tickets</p>
                      <Button className="mt-4" variant="outline">Create New Ticket</Button>
                    </div>
                  </CardContent>
                </Card>
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
