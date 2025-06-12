
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Edit, Trash2, Save, Star, X } from 'lucide-react';

const EnhancedStoryManager: React.FC = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [editingStory, setEditingStory] = useState<any>(null);
  const [newStory, setNewStory] = useState({
    title: '',
    content: '',
    author_name: '',
    image_url: '',
    author_image: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setStories(data);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleAddStory = async () => {
    if (!newStory.title || !newStory.content || !newStory.author_name) {
      toast({
        title: "Error",
        description: "Please fill in title, content, and author name",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('stories')
        .insert({
          ...newStory,
          author_id: user?.id,
          featured: true,
          status: 'published'
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Story added successfully",
        });
        setNewStory({
          title: '', content: '', author_name: '', image_url: '', author_image: ''
        });
        setShowAddForm(false);
        await fetchStories();
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

  const handleUpdateStory = async () => {
    if (!editingStory) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('stories')
        .update({
          title: editingStory.title,
          content: editingStory.content,
          author_name: editingStory.author_name,
          image_url: editingStory.image_url,
          author_image: editingStory.author_image
        })
        .eq('id', editingStory.id);

      if (!error) {
        toast({
          title: "Success",
          description: "Story updated successfully",
        });
        setEditingStory(null);
        await fetchStories();
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

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('stories')
        .update({ featured: !currentFeatured })
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: `Story ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`,
        });
        await fetchStories();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteStory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;

    try {
      const { error } = await supabase
        .from('stories')
        .delete()
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: "Story deleted successfully",
        });
        await fetchStories();
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
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Story Management</h3>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Add New Story
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Story title *"
                value={newStory.title}
                onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
              />
              <Input
                placeholder="Author name *"
                value={newStory.author_name}
                onChange={(e) => setNewStory({ ...newStory, author_name: e.target.value })}
              />
            </div>

            <Input
              placeholder="Story image URL (https://example.com/image.jpg)"
              value={newStory.image_url}
              onChange={(e) => setNewStory({ ...newStory, image_url: e.target.value })}
            />

            <Input
              placeholder="Author image URL (optional)"
              value={newStory.author_image}
              onChange={(e) => setNewStory({ ...newStory, author_image: e.target.value })}
            />

            <Textarea
              placeholder="Story content *"
              value={newStory.content}
              onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
              rows={4}
            />

            {newStory.image_url && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Story Image Preview:</label>
                <img 
                  src={newStory.image_url} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <Button onClick={handleAddStory} disabled={loading} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Add Story
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={story.image_url || story.author_image || '/api/placeholder/400/250'} 
                alt={story.title}
                className="w-full h-48 object-cover"
              />
              {story.featured && (
                <Star className="absolute top-2 right-2 h-5 w-5 text-yellow-400 fill-current" />
              )}
            </div>
            
            <CardContent className="p-4">
              {editingStory?.id === story.id ? (
                <div className="space-y-3">
                  <Input
                    value={editingStory.title}
                    onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                  />
                  <Input
                    value={editingStory.author_name}
                    onChange={(e) => setEditingStory({ ...editingStory, author_name: e.target.value })}
                  />
                  <Input
                    placeholder="Image URL"
                    value={editingStory.image_url}
                    onChange={(e) => setEditingStory({ ...editingStory, image_url: e.target.value })}
                  />
                  <Textarea
                    value={editingStory.content}
                    onChange={(e) => setEditingStory({ ...editingStory, content: e.target.value })}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateStory} size="sm" disabled={loading}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingStory(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg">{story.title}</h4>
                    <p className="text-sm text-muted-foreground">By {story.author_name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {story.content.substring(0, 100)}...
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {story.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded ${
                        story.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {story.status}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => toggleFeatured(story.id, story.featured)}
                        title={story.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className={`h-3 w-3 ${story.featured ? 'fill-current text-yellow-500' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setEditingStory(story)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deleteStory(story.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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

export default EnhancedStoryManager;
