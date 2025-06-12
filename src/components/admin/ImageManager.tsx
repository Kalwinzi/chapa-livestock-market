
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Image, Save, Eye, AlertCircle } from 'lucide-react';

interface ImageManagerProps {
  title: string;
  currentImageUrl?: string;
  onImageUpdate: (url: string) => Promise<void>;
  placeholder?: string;
}

const ImageManager: React.FC<ImageManagerProps> = ({
  title,
  currentImageUrl = '',
  onImageUpdate,
  placeholder = 'Enter image URL (JPG, PNG, WEBP)'
}) => {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();

  const validateImageUrl = (url: string): boolean => {
    const imageFormats = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i;
    try {
      const validUrl = new URL(url);
      return imageFormats.test(validUrl.pathname) || imageFormats.test(validUrl.href);
    } catch {
      return false;
    }
  };

  const handlePreview = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Preview Error",
        description: "Please enter an image URL first",
        variant: "destructive"
      });
      return;
    }

    if (!validateImageUrl(imageUrl)) {
      toast({
        title: "Invalid Image URL",
        description: "Please enter a valid image URL (JPG, PNG, WEBP)",
        variant: "destructive"
      });
      return;
    }

    setPreviewUrl(imageUrl);
    setImageError(false);
  };

  const handleSave = async () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Save Error",
        description: "Please enter an image URL",
        variant: "destructive"
      });
      return;
    }

    if (!validateImageUrl(imageUrl)) {
      toast({
        title: "Invalid Image URL",
        description: "Please enter a valid image URL (JPG, PNG, WEBP)",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      await onImageUpdate(imageUrl);
      setPreviewUrl(imageUrl);
      toast({
        title: "Image Updated",
        description: `${title} image has been updated successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update image",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Image className="h-5 w-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="url"
            placeholder={placeholder}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreview}
              className="flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </Button>
          </div>
        </div>

        {/* Image Preview */}
        {previewUrl && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Preview:</h4>
            <div className="relative border-2 border-dashed border-border rounded-lg p-4">
              {imageError ? (
                <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
                  <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Failed to load image</p>
                    <p className="text-xs text-muted-foreground">Please check the URL</p>
                  </div>
                </div>
              ) : (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>Supported formats: JPG, PNG, WEBP</p>
          <p>Example: https://example.com/image.jpg</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageManager;
