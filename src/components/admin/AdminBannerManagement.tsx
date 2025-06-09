
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Save, Edit, Trash2, Image, Eye, EyeOff } from 'lucide-react';

const AdminBannerManagement: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    image_url: '',
    link_url: '',
    active: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      // Since we don't have a banners table, we'll simulate with sample data
      const sampleBanners = [
        {
          id: '1',
          title: 'Welcome to ChapaMarket',
          subtitle: 'Your trusted livestock marketplace in Tanzania',
          image_url: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800',
          link_url: '/categories',
          active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Premium Cattle Available',
          subtitle: 'High-quality livestock from verified sellers',
          image_url: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800',
          link_url: '/categories/cattle',
          active: true,
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      setBanners(sampleBanners);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch banners",
        variant: "destructive"
      });
    }
  };

  const handleAddBanner = async () => {
    try {
      setLoading(true);
      
      if (!newBanner.title || !newBanner.image_url) {
        toast({
          title: "Validation Error",
          description: "Please fill in title and image URL",
          variant: "destructive"
        });
        return;
      }

      const banner = {
        id: Date.now().toString(),
        ...newBanner,
        created_at: new Date().toISOString()
      };

      setBanners(prev => [banner, ...prev]);
      setNewBanner({ title: '', subtitle: '', image_url: '', link_url: '', active: true });
      
      toast({
        title: "Banner Added",
        description: "Banner added successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBanner = async () => {
    try {
      setLoading(true);
      
      setBanners(prev => prev.map(banner => 
        banner.id === editingBanner.id ? editingBanner : banner
      ));
      
      setEditingBanner(null);
      
      toast({
        title: "Banner Updated",
        description: "Banner updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBanner = async (bannerId: string) => {
    try {
      setLoading(true);
      
      setBanners(prev => prev.filter(banner => banner.id !== bannerId));
      
      toast({
        title: "Banner Deleted",
        description: "Banner deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleBannerStatus = async (bannerId: string) => {
    try {
      setBanners(prev => prev.map(banner => 
        banner.id === bannerId ? { ...banner, active: !banner.active } : banner
      ));
      
      toast({
        title: "Banner Updated",
        description: "Banner status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Banner & Hero Management</h3>

      {/* Add New Banner */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Banner title"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
            <Input
              placeholder="Subtitle (optional)"
              value={newBanner.subtitle}
              onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              value={newBanner.image_url}
              onChange={(e) => setNewBanner({ ...newBanner, image_url: e.target.value })}
            />
            <Input
              placeholder="Link URL (optional)"
              value={newBanner.link_url}
              onChange={(e) => setNewBanner({ ...newBanner, link_url: e.target.value })}
            />
          </div>
          <Button 
            onClick={handleAddBanner}
            disabled={loading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Banner
          </Button>
        </CardContent>
      </Card>

      {/* Banners List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <Card key={banner.id}>
            <CardContent className="p-0">
              {editingBanner?.id === banner.id ? (
                <div className="p-6 space-y-4">
                  <Input
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    placeholder="Title"
                  />
                  <Input
                    value={editingBanner.subtitle}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                    placeholder="Subtitle"
                  />
                  <Input
                    value={editingBanner.image_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, image_url: e.target.value })}
                    placeholder="Image URL"
                  />
                  <Input
                    value={editingBanner.link_url}
                    onChange={(e) => setEditingBanner({ ...editingBanner, link_url: e.target.value })}
                    placeholder="Link URL"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateBanner} size="sm" disabled={loading}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingBanner(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {banner.image_url && (
                    <div className="relative">
                      <img 
                        src={banner.image_url} 
                        alt={banner.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2">
                        <Button
                          size="sm"
                          variant={banner.active ? "default" : "secondary"}
                          onClick={() => toggleBannerStatus(banner.id)}
                        >
                          {banner.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="p-4 space-y-2">
                    <h4 className="font-semibold">{banner.title}</h4>
                    {banner.subtitle && (
                      <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
                    )}
                    {banner.link_url && (
                      <p className="text-xs text-blue-600 truncate">{banner.link_url}</p>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        banner.active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {banner.active ? 'Active' : 'Inactive'}
                      </span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingBanner(banner)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteBanner(banner.id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBannerManagement;
