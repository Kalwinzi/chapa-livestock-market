
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Story {
  id: string;
  title: string;
  content: string;
  author_name: string;
  author_image: string | null;
  featured: boolean;
}

const StoriesSection = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('featured', true)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const openStory = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading stories...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the inspiring people who are transforming livestock farming across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={story.author_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                    alt={story.author_name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{story.author_name}</h3>
                  <p className="text-sm text-primary-500 font-medium mb-3">{story.title}</p>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {story.content.substring(0, 150)}...
                </p>
                
                <Button 
                  onClick={() => openStory(story)}
                  variant="outline" 
                  className="w-full hover:bg-primary-500 hover:text-white transition-colors"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedStory.author_image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'}
                  alt={selectedStory.author_name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedStory.author_name}</h2>
                  <p className="text-primary-500 font-medium">{selectedStory.title}</p>
                </div>
              </div>
              <button onClick={closeStory} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-base">
                {selectedStory.content}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
