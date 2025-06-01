
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  Image,
  Save,
  X
} from 'lucide-react';

interface Story {
  id: string;
  title: string;
  content: string;
  author: string;
  location: string;
  featured: boolean;
  image?: string;
  created_at: string;
}

const StoriesManager: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    location: '',
    featured: false
  });
  const { toast } = useToast();

  // Mock data for stories
  useEffect(() => {
    const mockStories: Story[] = [
      {
        id: '1',
        title: 'Mafanikio ya Kilimo cha Ng\'ombe wa Maziwa',
        content: 'Tangu nianze kilimo changu cha ng\'ombe wa maziwa mwaka 2020, maisha yangu yamebadilika kabisa. Nilianza na ng\'ombe 5 tu, lakini sasa nina ng\'ombe 25 wa aina ya Holstein.',
        author: 'Mama Fatuma',
        location: 'Arusha',
        featured: true,
        image: '/placeholder.svg',
        created_at: '2024-01-15'
      },
      {
        id: '2',
        title: 'Jinsi Mbuzi Walivyoniletea Kipato',
        content: 'Kufuga mbuzi ni biashara inayofaa sana hasa katika mazingira ya ukame. Mimi nimeweza kujenga nyumba na kulipa ada za shule za watoto wangu kutokana na mbuzi.',
        author: 'Bwana John',
        location: 'Dodoma',
        featured: false,
        image: '/placeholder.svg',
        created_at: '2024-01-10'
      }
    ];
    setStories(mockStories);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStory) {
      // Update existing story
      const updatedStories = stories.map(story =>
        story.id === editingStory.id
          ? { ...story, ...formData }
          : story
      );
      setStories(updatedStories);
      setEditingStory(null);
      toast({
        title: "Success",
        description: "Story updated successfully",
      });
    } else {
      // Add new story
      const newStory: Story = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setStories([newStory, ...stories]);
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Story added successfully",
      });
    }

    setFormData({
      title: '',
      content: '',
      author: '',
      location: '',
      featured: false
    });
  };

  const handleEdit = (story: Story) => {
    setEditingStory(story);
    setFormData({
      title: story.title,
      content: story.content,
      author: story.author,
      location: story.location,
      featured: story.featured
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return;
    
    setStories(stories.filter(story => story.id !== id));
    toast({
      title: "Success",
      description: "Story deleted successfully",
    });
  };

  const toggleFeatured = (id: string) => {
    const updatedStories = stories.map(story =>
      story.id === id
        ? { ...story, featured: !story.featured }
        : story
    );
    setStories(updatedStories);
    toast({
      title: "Success",
      description: "Story featured status updated",
    });
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingStory(null);
    setFormData({
      title: '',
      content: '',
      author: '',
      location: '',
      featured: false
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Stories & Blog Manager</h3>
          <p className="text-sm text-muted-foreground">
            Manage community stories and featured content
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingStory ? 'Edit Story' : 'Add New Story'}
              <Button variant="ghost" size="sm" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Story title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Location"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Story content"
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Feature this story
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingStory ? 'Update' : 'Save'} Story
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Card key={story.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{story.title}</h4>
                    {story.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    By {story.author} • {story.location}
                  </p>
                  <p className="text-sm line-clamp-3 mb-4">
                    {story.content}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(story.created_at).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFeatured(story.id)}
                    title={story.featured ? 'Remove from featured' : 'Feature story'}
                  >
                    <Star className={`h-4 w-4 ${story.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(story)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(story.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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

export default StoriesManager;
