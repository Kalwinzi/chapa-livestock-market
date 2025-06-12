import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Eye, Trash2, Plus } from 'lucide-react';

const HomepageImageManager: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_banners')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setBanners(data);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setNewBanner({ ...newBanner, image_url: url });
    setPreviewUrl(url);
  };

  const handleSaveBanner = async () => {
    if (!newBanner.image_url || !newBanner.title) {
      toast({
        title: "Error",
        description: "Please provide both image URL and title",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Deactivate all existing banners first
      await supabase
        .from('homepage_banners')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Insert new banner as active
      const { error } = await supabase
        .from('homepage_banners')
        .insert({
          title: newBanner.title,
          description: newBanner.description,
          image_url: newBanner.image_url,
          is_active: true
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Homepage banner updated successfully",
        });
        setNewBanner({ title: '', description: '', image_url: '' });
        setPreviewUrl('');
        await fetchBanners();
      }
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

  const activateBanner = async (id: string) => {
    try {
      // Deactivate all banners
      await supabase
        .from('homepage_banners')
        .update({ is_active: false })
        .neq('id', '00000000-0000-0000-0000-000000000000');

      // Activate selected banner
      const { error } = await supabase
        .from('homepage_banners')
        .update({ is_active: true })
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: "Banner activated successfully",
        });
        await fetchBanners();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteBanner = async (id: string) => {
    try {
      const { error } = await supabase
        .from('homepage_banners')
        .delete()
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
        await fetchBanners();
      }
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
      <h3 className="text-2xl font-bold">Homepage Image Control</h3>

      {/* Add New Banner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add New Homepage Banner
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL *</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={newBanner.image_url}
              onChange={(e) => handleImageUrlChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, WebP. Use direct image URLs only.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Banner Title *</label>
            <Input
              placeholder="Banner title"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description (Optional)</label>
            <Textarea
              placeholder="Banner description"
              value={newBanner.description}
              onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
              rows={3}
            />
          </div>
          
          {previewUrl && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Live Preview:</label>
              <div className="border rounded-lg overflow-hidden">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={() => setPreviewUrl('')}
                />
              </div>
            </div>
          )}

          <Button onClick={handleSaveBanner} disabled={loading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save & Activate Banner
          </Button>
        </CardContent>
      </Card>

      {/* Existing Banners */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Existing Banners</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <Card key={banner.id} className={banner.is_active ? 'ring-2 ring-green-500' : ''}>
              <CardContent className="p-4">
                <img 
                  src={banner.image_url} 
                  alt={banner.title}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h4 className="font-semibold mb-2">{banner.title}</h4>
                {banner.description && (
                  <p className="text-sm text-muted-foreground mb-3">{banner.description}</p>
                )}
                <div className="flex justify-between items-center mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {banner.is_active ? 'ACTIVE' : 'Inactive'}
                  </span>
                </div>
                <div className="flex gap-2">
                  {!banner.is_active && (
                    <Button 
                      size="sm" 
                      onClick={() => activateBanner(banner.id)}
                      className="flex-1"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteBanner(banner.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomepageImageManager;
