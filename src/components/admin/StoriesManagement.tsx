
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Save, Edit, Trash2, FileText } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';

const StoriesManagement: React.FC = () => {
  const [newStory, setNewStory] = useState({ title: '', content: '', authorName: '' });
  const [editingStory, setEditingStory] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { loading, setLoading, stories, fetchStories } = useAdminData();

  useEffect(() => {
    fetchStories();
  }, []);

  const handleAddStory = async () => {
    try {
      setLoading(true);
      
      if (!newStory.title || !newStory.content || !newStory.authorName) {
        toast({
          title: "Validation Error",
          description: "Please fill in all fields",
          variant: "destructive"
        });
        return;
      }

      await supabase
        .from('stories')
        .insert({
          title: newStory.title,
          content: newStory.content,
          author_name: newStory.authorName,
          author_id: user?.id,
          featured: true
        });
      
      toast({
        title: "Story Added",
        description: "Community story added successfully",
      });
      
      setNewStory({ title: '', content: '', authorName: '' });
      await fetchStories();
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
    try {
      setLoading(true);
      
      await supabase
        .from('stories')
        .update({
          title: editingStory.title,
          content: editingStory.content,
          author_name: editingStory.author_name
        })
        .eq('id', editingStory.id);
      
      toast({
        title: "Story Updated",
        description: "Story updated successfully",
      });
      
      setEditingStory(null);
      await fetchStories();
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

  const handleDeleteStory = async (storyId: string) => {
    try {
      setLoading(true);
      
      await supabase
        .from('stories')
        .delete()
        .eq('id', storyId);
      
      toast({
        title: "Story Deleted",
        description: "Story deleted successfully",
      });
      
      await fetchStories();
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Community Stories Management</h3>

      {/* Add New Story Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Story title"
              value={newStory.title}
              onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
            />
            <Input
              placeholder="Author name"
              value={newStory.authorName}
              onChange={(e) => setNewStory({ ...newStory, authorName: e.target.value })}
            />
          </div>
          <Textarea
            placeholder="Story content..."
            rows={4}
            value={newStory.content}
            onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
          />
          <Button 
            onClick={handleAddStory}
            disabled={loading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Story
          </Button>
        </CardContent>
      </Card>

      {/* Stories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story: any) => (
          <Card key={story.id}>
            <CardContent className="p-6">
              {editingStory?.id === story.id ? (
                <div className="space-y-4">
                  <Input
                    value={editingStory.title}
                    onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                  />
                  <Input
                    value={editingStory.author_name}
                    onChange={(e) => setEditingStory({ ...editingStory, author_name: e.target.value })}
                  />
                  <Textarea
                    value={editingStory.content}
                    onChange={(e) => setEditingStory({ ...editingStory, content: e.target.value })}
                    rows={4}
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
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{story.author_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(story.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{story.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">{story.content}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      story.featured ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}>
                      {story.featured ? 'Featured' : 'Regular'}
                    </span>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingStory(story)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteStory(story.id)}
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

export default StoriesManagement;
