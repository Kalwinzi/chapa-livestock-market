import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Save, Eye, Trash2, Image as ImageIcon } from 'lucide-react';

const HomepageBannerManager: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [newBanner, setNewBanner] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
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
      
      if (!error && data) setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setNewBanner({ ...newBanner, image_url: url });
    }
  };

  const handleSaveBanner = async () => {
    if (!newBanner.title || !newBanner.image_url) {
      toast({
        title: "Validation Error",
        description: "Please provide title and image",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
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
          description: "Banner saved successfully",
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

  const toggleBannerStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('homepage_banners')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: "Banner status updated",
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
      <h3 className="text-lg font-semibold">Homepage Banner Manager</h3>

      {/* Upload New Banner */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Banner title"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <Textarea
            placeholder="Banner description (optional)"
            value={newBanner.description}
            onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
            rows={3}
          />
          
          {previewUrl && (
            <div className="border rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <img src={previewUrl} alt="Preview" className="max-h-40 w-auto rounded" />
            </div>
          )}

          <Button onClick={handleSaveBanner} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Banner
          </Button>
        </CardContent>
      </Card>

      {/* Existing Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <Card key={banner.id}>
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
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {banner.is_active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => toggleBannerStatus(banner.id, banner.is_active)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deleteBanner(banner.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomepageBannerManager;
