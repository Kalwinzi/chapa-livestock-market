
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Download,
  MapPin,
  Calendar
} from 'lucide-react';

interface Livestock {
  id: string;
  name: string;
  breed?: string;
  age?: string;
  gender?: string;
  price?: string;
  location?: string;
  description?: string;
  category: string;
  image_url?: string;
  verified?: boolean;
  featured?: boolean;
  created_at?: string;
  user_id?: string;
  profiles?: {
    first_name?: string;
    last_name?: string;
  };
}

const LivestockManagement: React.FC = () => {
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [filteredLivestock, setFilteredLivestock] = useState<Livestock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const categories = [
    'all', 'ng\'ombe', 'mbuzi', 'kondoo', 'nguruwe', 'kuku'
  ];

  useEffect(() => {
    fetchLivestock();
  }, []);

  useEffect(() => {
    filterLivestock();
  }, [livestock, searchTerm, selectedCategory]);

  const fetchLivestock = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('livestock')
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLivestock(data || []);
    } catch (error) {
      console.error('Error fetching livestock:', error);
      toast({
        title: "Error",
        description: "Failed to load livestock",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterLivestock = () => {
    let filtered = livestock;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.breed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    setFilteredLivestock(filtered);
  };

  const handleVerificationToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('livestock')
        .update({ verified: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Listing ${!currentStatus ? 'approved' : 'unapproved'}`,
      });

      fetchLivestock();
    } catch (error) {
      console.error('Error updating verification:', error);
      toast({
        title: "Error",
        description: "Failed to update listing status",
        variant: "destructive",
      });
    }
  };

  const handleFeaturedToggle = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('livestock')
        .update({ featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Listing ${!currentStatus ? 'featured' : 'unfeatured'}`,
      });

      fetchLivestock();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update featured status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      const { error } = await supabase
        .from('livestock')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });

      fetchLivestock();
    } catch (error) {
      console.error('Error deleting livestock:', error);
      toast({
        title: "Error",
        description: "Failed to delete listing",
        variant: "destructive",
      });
    }
  };

  const exportLivestock = () => {
    const csvContent = [
      ['Name', 'Category', 'Breed', 'Price', 'Location', 'Seller', 'Status', 'Date'],
      ...filteredLivestock.map(item => [
        item.name,
        item.category,
        item.breed || '',
        item.price || '',
        item.location || '',
        `${item.profiles?.first_name || ''} ${item.profiles?.last_name || ''}`.trim(),
        item.verified ? 'Approved' : 'Pending',
        item.created_at ? new Date(item.created_at).toLocaleDateString() : ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'livestock.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Livestock data exported successfully",
    });
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      'ng\'ombe': '🐄',
      'mbuzi': '🐐',
      'kondoo': '🐑',
      'nguruwe': '🐷',
      'kuku': '🐔'
    };
    return emojis[category] || '🐄';
  };

  if (loading) {
    return <div className="p-6">Loading livestock...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Livestock Management</h3>
          <p className="text-sm text-muted-foreground">
            {filteredLivestock.length} of {livestock.length} listings
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Input
            placeholder="Search livestock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : `${getCategoryEmoji(category)} ${category}`}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm" onClick={exportLivestock}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="p-4 font-medium">Livestock</th>
                  <th className="p-4 font-medium hidden sm:table-cell">Seller</th>
                  <th className="p-4 font-medium hidden md:table-cell">Price</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Location</th>
                  <th className="p-4 font-medium hidden lg:table-cell">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLivestock.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-accent/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image_url || '/placeholder.svg'}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {getCategoryEmoji(item.category)} {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.breed}</p>
                          <div className="flex gap-1 mt-1">
                            {item.featured && (
                              <Badge variant="secondary" className="text-xs">Featured</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <p className="text-sm">
                        {item.profiles?.first_name} {item.profiles?.last_name}
                      </p>
                    </td>
                    <td className="p-4 text-sm font-medium hidden md:table-cell">
                      {item.price || 'N/A'}
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location || 'N/A'}
                      </div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge 
                        className={
                          item.verified 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        }
                      >
                        {item.verified ? 'Approved' : 'Pending'}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" title="View Details">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title={item.verified ? 'Unapprove' : 'Approve'}
                          onClick={() => handleVerificationToggle(item.id, item.verified || false)}
                        >
                          {item.verified ? <XCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title={item.featured ? 'Unfeature' : 'Feature'}
                          onClick={() => handleFeaturedToggle(item.id, item.featured || false)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
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
  );
};

export default LivestockManagement;
