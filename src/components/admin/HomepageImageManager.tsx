
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';
import ImageManager from './ImageManager';

const HomepageImageManager: React.FC = () => {
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Get current homepage image from localStorage or use default
    const storedImage = localStorage.getItem('homepage_banner_url');
    if (storedImage) {
      setCurrentImageUrl(storedImage);
    } else {
      // Use the current default image
      setCurrentImageUrl('/lovable-uploads/3c56169f-0372-418f-823a-8d738d0d35b2.png');
    }
  }, []);

  const handleImageUpdate = async (url: string) => {
    try {
      // Store the new image URL in localStorage
      localStorage.setItem('homepage_banner_url', url);
      setCurrentImageUrl(url);
      
      // Trigger a custom event to update the homepage
      window.dispatchEvent(new CustomEvent('homepageImageUpdated', { detail: { url } }));
      
      toast({
        title: "Homepage Updated",
        description: "Homepage banner image has been updated successfully. Refresh the page to see changes.",
      });
    } catch (error) {
      throw new Error('Failed to update homepage image');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Homepage Banner Management</h3>
        <p className="text-sm text-muted-foreground">
          Update the main banner image displayed on the homepage hero section.
        </p>
      </div>

      <ImageManager
        title="Homepage Banner Image"
        currentImageUrl={currentImageUrl}
        onImageUpdate={handleImageUpdate}
        placeholder="Enter homepage banner image URL (recommended: 1920x1080)"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Current Homepage Banner</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentImageUrl ? (
            <div className="border rounded-lg overflow-hidden">
              <img
                src={currentImageUrl}
                alt="Current homepage banner"
                className="w-full h-48 object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
              <p className="text-muted-foreground">No image set</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomepageImageManager;
