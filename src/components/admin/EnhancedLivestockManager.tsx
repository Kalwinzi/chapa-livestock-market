
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Edit, Trash2, Save, Star, Eye, X } from 'lucide-react';

const EnhancedLivestockManager: React.FC = () => {
  const [livestock, setLivestock] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    breed: '',
    age: '',
    gender: '',
    price: '',
    location: '',
    description: '',
    image_url: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const categories = [
    'Cattle', 'Goats', 'Sheep', 'Chickens', 'Camels', 'Donkeys', 
    'Pigs', 'Ducks', 'Turkeys', 'Guinea Fowl'
  ];

  useEffect(() => {
    fetchLivestock();
  }, []);

  const fetchLivestock = async () => {
    try {
      const { data, error } = await supabase
        .from('livestock')
        .select(`
          *,
          profiles!livestock_user_id_fkey(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        setLivestock(data);
      }
    } catch (error) {
      console.error('Error fetching livestock:', error);
    }
  };

  const handleAddLivestock = async () => {
    if (!newItem.name || !newItem.category || !newItem.price) {
      toast({
        title: "Error",
        description: "Please fill in name, category, and price",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('livestock')
        .insert({
          ...newItem,
          user_id: user?.id,
          verified: true,
          featured: false
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Livestock added successfully",
        });
        setNewItem({
          name: '', category: '', breed: '', age: '', gender: '',
          price: '', location: '', description: '', image_url: ''
        });
        setShowAddForm(false);
        await fetchLivestock();
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

  const handleUpdateLivestock = async () => {
    if (!editingItem) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('livestock')
        .update({
          name: editingItem.name,
          category: editingItem.category,
          breed: editingItem.breed,
          age: editingItem.age,
          gender: editingItem.gender,
          price: editingItem.price,
          location: editingItem.location,
          description: editingItem.description,
          image_url: editingItem.image_url
        })
        .eq('id', editingItem.id);

      if (!error) {
        toast({
          title: "Success",
          description: "Livestock updated successfully",
        });
        setEditingItem(null);
        await fetchLivestock();
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
        .from('livestock')
        .update({ featured: !currentFeatured })
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: `Livestock ${!currentFeatured ? 'featured' : 'unfeatured'} successfully`,
        });
        await fetchLivestock();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteLivestock = async (id: string) => {
    if (!confirm('Are you sure you want to delete this livestock?')) return;

    try {
      const { error } = await supabase
        .from('livestock')
        .delete()
        .eq('id', id);

      if (!error) {
        toast({
          title: "Success",
          description: "Livestock deleted successfully",
        });
        await fetchLivestock();
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
        <h3 className="text-2xl font-bold">Livestock Management</h3>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Livestock
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Add New Livestock
              <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Animal name *"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Category *" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Breed"
                value={newItem.breed}
                onChange={(e) => setNewItem({ ...newItem, breed: e.target.value })}
              />
              <Input
                placeholder="Age"
                value={newItem.age}
                onChange={(e) => setNewItem({ ...newItem, age: e.target.value })}
              />
              <Select value={newItem.gender} onValueChange={(value) => setNewItem({ ...newItem, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Price (TSH) *"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              />
            </div>

            <Input
              placeholder="Image URL (https://example.com/image.jpg)"
              value={newItem.image_url}
              onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })}
            />

            <Textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              rows={3}
            />

            {newItem.image_url && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Preview:</label>
                <img 
                  src={newItem.image_url} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <Button onClick={handleAddLivestock} disabled={loading} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Add Livestock
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Livestock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {livestock.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <img 
                src={item.image_url || '/api/placeholder/400/250'} 
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              {item.featured && (
                <Star className="absolute top-2 right-2 h-5 w-5 text-yellow-400 fill-current" />
              )}
            </div>
            
            <CardContent className="p-4">
              {editingItem?.id === item.id ? (
                <div className="space-y-3">
                  {/* Edit Form */}
                  <Input
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                  <Input
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  />
                  <Input
                    placeholder="Image URL"
                    value={editingItem.image_url}
                    onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateLivestock} size="sm" disabled={loading}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingItem(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-lg">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category} • {item.breed}</p>
                    <p className="text-lg font-bold text-green-600">TSH {item.price}</p>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {item.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Verified</span>
                      )}
                      {item.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => toggleFeatured(item.id, item.featured)}
                        title={item.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <Star className={`h-3 w-3 ${item.featured ? 'fill-current text-yellow-500' : ''}`} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setEditingItem(item)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => deleteLivestock(item.id)}
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

export default EnhancedLivestockManager;
