
import React, { useState } from 'react';
import { Settings, Users, Package, BarChart3, MessageSquare, X, Lock, Eye, EyeOff, Plus, Edit, Trash2, CheckCircle, XCircle, TrendingUp, Calendar, Phone, Mail, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [newListingData, setNewListingData] = useState({
    title: '', category: '', price: '', location: '', description: '', seller: ''
  });
  const { toast } = useToast();

  // Mock data for demonstration
  const [users, setUsers] = useState([
    { id: 1, name: 'Kalwin Zic', email: 'kalwinzic@gmail.com', role: 'Admin', status: 'Active', joined: '2024-01-15', verified: true },
    { id: 2, name: 'John Mwanza', email: 'john@example.com', role: 'Seller', status: 'Active', joined: '2024-02-20', verified: true },
    { id: 3, name: 'Mary Mollel', email: 'mary@example.com', role: 'Buyer', status: 'Pending', joined: '2024-03-10', verified: false },
    { id: 4, name: 'Peter Kamau', email: 'peter@example.com', role: 'Seller', status: 'Banned', joined: '2024-01-28', verified: true },
    { id: 5, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Buyer', status: 'Active', joined: '2024-03-15', verified: true },
  ]);

  const [listings, setListings] = useState([
    { id: 1, title: 'Holstein Dairy Cow', category: 'Cattle', price: '2,500,000 TSH', seller: 'John Mwanza', status: 'Active', location: 'Arusha', created: '2024-03-20' },
    { id: 2, title: 'Boer Goats - Breeding Pair', category: 'Goats', price: '800,000 TSH', seller: 'Mary Mollel', status: 'Pending', location: 'Moshi', created: '2024-03-18' },
    { id: 3, title: 'Dorper Sheep Flock', category: 'Sheep', price: '1,200,000 TSH', seller: 'Peter Kamau', status: 'Rejected', location: 'Dodoma', created: '2024-03-15' },
    { id: 4, title: 'Local Chickens', category: 'Poultry', price: '25,000 TSH', seller: 'Sarah Johnson', status: 'Active', location: 'Dar es Salaam', created: '2024-03-22' },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, title: 'Payment Issue', user: 'John Mwanza', priority: 'High', status: 'Open', created: '2024-03-20', category: 'Payment' },
    { id: 2, title: 'Listing Not Showing', user: 'Mary Mollel', priority: 'Medium', status: 'In Progress', created: '2024-03-19', category: 'Technical' },
    { id: 3, title: 'Account Verification', user: 'Peter Kamau', priority: 'Low', status: 'Resolved', created: '2024-03-18', category: 'Account' },
    { id: 4, title: 'Seller Contact Issue', user: 'Sarah Johnson', priority: 'Medium', status: 'Open', created: '2024-03-21', category: 'Communication' },
  ]);

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

  const handleUserAction = (userId: number, action: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'ban':
            return { ...user, status: 'Banned' };
          case 'activate':
            return { ...user, status: 'Active' };
          case 'verify':
            return { ...user, verified: true };
          default:
            return user;
        }
      }
      return user;
    }));

    toast({
      title: "User Updated",
      description: `User has been ${action}ed successfully.`,
    });
  };

  const handleListingAction = (listingId: number, action: string) => {
    setListings(listings.map(listing => {
      if (listing.id === listingId) {
        switch (action) {
          case 'approve':
            return { ...listing, status: 'Active' };
          case 'reject':
            return { ...listing, status: 'Rejected' };
          case 'delete':
            return null;
          default:
            return listing;
        }
      }
      return listing;
    }).filter(Boolean) as any[]);

    toast({
      title: "Listing Updated",
      description: `Listing has been ${action}d successfully.`,
    });
  };

  const handleTicketAction = (ticketId: number, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));

    toast({
      title: "Ticket Updated",
      description: `Ticket status changed to ${newStatus}.`,
    });
  };

  const addNewListing = () => {
    const newListing = {
      id: listings.length + 1,
      ...newListingData,
      status: 'Pending',
      created: new Date().toISOString().split('T')[0]
    };
    setListings([...listings, newListing]);
    setNewListingData({ title: '', category: '', price: '', location: '', description: '', seller: '' });
    
    toast({
      title: "Listing Added",
      description: "New livestock listing has been created.",
    });
  };

  if (!isOpen) return null;

  const stats = [
    { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'text-blue-600', growth: '+12%' },
    { label: 'Active Listings', value: listings.filter(l => l.status === 'Active').length.toString(), icon: Package, color: 'text-green-600', growth: '+8%' },
    { label: 'Monthly Sales', value: '₦2.5M', icon: BarChart3, color: 'text-purple-600', growth: '+15%' },
    { label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length.toString(), icon: MessageSquare, color: 'text-orange-600', growth: '-5%' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
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
                  
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
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
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Package className="h-5 w-5 text-orange-600" />
                          <span>Pending Approvals</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {listings.filter(l => l.status === 'Pending').length}
                        </div>
                        <p className="text-sm text-gray-600">Listings waiting for review</p>
                        <Button 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => setActiveTab('listings')}
                        >
                          Review Now
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-blue-600" />
                          <span>New Users</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {users.filter(u => u.status === 'Pending').length}
                        </div>
                        <p className="text-sm text-gray-600">Users awaiting verification</p>
                        <Button 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => setActiveTab('users')}
                        >
                          Manage Users
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MessageSquare className="h-5 w-5 text-red-600" />
                          <span>Open Tickets</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-600 mb-2">
                          {tickets.filter(t => t.status === 'Open').length}
                        </div>
                        <p className="text-sm text-gray-600">Support tickets to handle</p>
                        <Button 
                          size="sm" 
                          className="mt-3 w-full"
                          onClick={() => setActiveTab('support')}
                        >
                          Handle Tickets
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h3>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Verified</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users
                            .filter(user => 
                              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={user.status === 'Active' ? 'default' : 
                                           user.status === 'Banned' ? 'destructive' : 'secondary'}
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {user.verified ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                              </TableCell>
                              <TableCell>{user.joined}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {user.status !== 'Banned' && (
                                    <Button 
                                      size="sm" 
                                      variant="destructive"
                                      onClick={() => handleUserAction(user.id, 'ban')}
                                    >
                                      Ban
                                    </Button>
                                  )}
                                  {user.status === 'Banned' && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleUserAction(user.id, 'activate')}
                                    >
                                      Activate
                                    </Button>
                                  )}
                                  {!user.verified && (
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleUserAction(user.id, 'verify')}
                                    >
                                      Verify
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'listings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Livestock Management</h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Listing
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Livestock Listing</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Input
                            placeholder="Listing Title"
                            value={newListingData.title}
                            onChange={(e) => setNewListingData({...newListingData, title: e.target.value})}
                          />
                          <Select value={newListingData.category} onValueChange={(value) => setNewListingData({...newListingData, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Cattle">Cattle</SelectItem>
                              <SelectItem value="Goats">Goats</SelectItem>
                              <SelectItem value="Sheep">Sheep</SelectItem>
                              <SelectItem value="Poultry">Poultry</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            placeholder="Price (TSH)"
                            value={newListingData.price}
                            onChange={(e) => setNewListingData({...newListingData, price: e.target.value})}
                          />
                          <Input
                            placeholder="Location"
                            value={newListingData.location}
                            onChange={(e) => setNewListingData({...newListingData, location: e.target.value})}
                          />
                          <Input
                            placeholder="Seller Name"
                            value={newListingData.seller}
                            onChange={(e) => setNewListingData({...newListingData, seller: e.target.value})}
                          />
                          <Textarea
                            placeholder="Description"
                            value={newListingData.description}
                            onChange={(e) => setNewListingData({...newListingData, description: e.target.value})}
                          />
                          <Button onClick={addNewListing} className="w-full">
                            Create Listing
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Listing</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {listings.map((listing) => (
                            <TableRow key={listing.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{listing.title}</div>
                                  <div className="text-sm text-gray-500">{listing.location}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{listing.category}</Badge>
                              </TableCell>
                              <TableCell>{listing.price}</TableCell>
                              <TableCell>{listing.seller}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={listing.status === 'Active' ? 'default' : 
                                           listing.status === 'Rejected' ? 'destructive' : 'secondary'}
                                >
                                  {listing.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {listing.status === 'Pending' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        onClick={() => handleListingAction(listing.id, 'approve')}
                                      >
                                        Approve
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="destructive"
                                        onClick={() => handleListingAction(listing.id, 'reject')}
                                      >
                                        Reject
                                      </Button>
                                    </>
                                  )}
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleListingAction(listing.id, 'delete')}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Support Center</h3>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      New Ticket
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.status === 'Open').length}</div>
                        <div className="text-sm text-gray-600">Open</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'In Progress').length}</div>
                        <div className="text-sm text-gray-600">In Progress</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">{tickets.filter(t => t.status === 'Resolved').length}</div>
                        <div className="text-sm text-gray-600">Resolved</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{tickets.length}</div>
                        <div className="text-sm text-gray-600">Total</div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Ticket</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                              <TableCell>
                                <div>
                                  <div className="font-medium">{ticket.title}</div>
                                  <div className="text-sm text-gray-500">{ticket.category}</div>
                                </div>
                              </TableCell>
                              <TableCell>{ticket.user}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={ticket.priority === 'High' ? 'destructive' : 
                                           ticket.priority === 'Medium' ? 'default' : 'secondary'}
                                >
                                  {ticket.priority}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={ticket.status === 'Resolved' ? 'default' : 
                                           ticket.status === 'In Progress' ? 'secondary' : 'outline'}
                                >
                                  {ticket.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{ticket.created}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {ticket.status === 'Open' && (
                                    <Button 
                                      size="sm"
                                      onClick={() => handleTicketAction(ticket.id, 'In Progress')}
                                    >
                                      Start
                                    </Button>
                                  )}
                                  {ticket.status === 'In Progress' && (
                                    <Button 
                                      size="sm"
                                      onClick={() => handleTicketAction(ticket.id, 'Resolved')}
                                    >
                                      Resolve
                                    </Button>
                                  )}
                                  <Button size="sm" variant="outline">
                                    View
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
