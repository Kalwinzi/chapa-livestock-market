
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Search, Filter, Download } from 'lucide-react';

const AdminSearchManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search query",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      let results: any[] = [];

      switch (searchType) {
        case 'livestock':
          const { data: livestockData } = await supabase
            .from('livestock')
            .select(`
              *,
              profiles!livestock_user_id_fkey(first_name, last_name, email)
            `)
            .or(`name.ilike.%${searchQuery}%,breed.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
          results = livestockData || [];
          break;

        case 'users':
          const { data: userData } = await supabase
            .from('profiles')
            .select('*')
            .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
          results = userData || [];
          break;

        case 'stories':
          const { data: storyData } = await supabase
            .from('stories')
            .select('*')
            .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,author_name.ilike.%${searchQuery}%`);
          results = storyData || [];
          break;

        case 'all':
        default:
          // Search across all tables
          const [livestock, users, stories] = await Promise.all([
            supabase.from('livestock').select('*, profiles!livestock_user_id_fkey(first_name, last_name)')
              .or(`name.ilike.%${searchQuery}%,breed.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`),
            supabase.from('profiles').select('*')
              .or(`first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`),
            supabase.from('stories').select('*')
              .or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,author_name.ilike.%${searchQuery}%`)
          ]);

          results = [
            ...(livestock.data || []).map(item => ({ ...item, type: 'livestock' })),
            ...(users.data || []).map(item => ({ ...item, type: 'user' })),
            ...(stories.data || []).map(item => ({ ...item, type: 'story' }))
          ];
          break;
      }

      setSearchResults(results);
      toast({
        title: "Search Complete",
        description: `Found ${results.length} results for "${searchQuery}"`,
      });
    } catch (error: any) {
      toast({
        title: "Search Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const exportResults = () => {
    if (searchResults.length === 0) {
      toast({
        title: "No Data",
        description: "No search results to export",
        variant: "destructive"
      });
      return;
    }

    const csvData = searchResults.map(item => {
      if (item.type === 'livestock' || searchType === 'livestock') {
        return {
          Type: 'Livestock',
          Name: item.name,
          Breed: item.breed,
          Price: item.price,
          Location: item.location,
          Owner: item.profiles ? `${item.profiles.first_name} ${item.profiles.last_name}` : 'N/A'
        };
      } else if (item.type === 'user' || searchType === 'users') {
        return {
          Type: 'User',
          Name: `${item.first_name} ${item.last_name}`,
          Email: item.email,
          Phone: item.phone || 'N/A',
          Location: item.location || 'N/A',
          UserType: item.user_type
        };
      } else if (item.type === 'story' || searchType === 'stories') {
        return {
          Type: 'Story',
          Title: item.title,
          Author: item.author_name,
          Featured: item.featured ? 'Yes' : 'No',
          Status: item.status,
          Created: new Date(item.created_at).toLocaleDateString()
        };
      }
      return item;
    });

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `search_results_${searchQuery}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Search results exported successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Search className="h-6 w-6 text-blue-500" />
        <h3 className="text-2xl font-bold">Admin Search</h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Search Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger>
                <SelectValue placeholder="Search in..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Data</SelectItem>
                <SelectItem value="livestock">Livestock Only</SelectItem>
                <SelectItem value="users">Users Only</SelectItem>
                <SelectItem value="stories">Stories Only</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Search Results ({searchResults.length})
              <Button onClick={exportResults} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {searchResults.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  {(item.type === 'livestock' || searchType === 'livestock') && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.name}</h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Livestock</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.breed} • {item.location} • TSH {item.price}
                      </p>
                      {item.profiles && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Owner: {item.profiles.first_name} {item.profiles.last_name}
                        </p>
                      )}
                    </div>
                  )}

                  {(item.type === 'user' || searchType === 'users') && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.first_name} {item.last_name}</h4>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">User</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.user_type} • {item.location || 'No location'}
                      </p>
                    </div>
                  )}

                  {(item.type === 'story' || searchType === 'stories') && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{item.title}</h4>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Story</span>
                      </div>
                      <p className="text-sm text-muted-foreground">By {item.author_name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.featured ? 'Featured • ' : ''}{item.status}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSearchManager;
