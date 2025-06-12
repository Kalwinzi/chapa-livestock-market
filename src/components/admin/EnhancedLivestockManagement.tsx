
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Plus, Edit, Trash2, Save, Star, Eye } from 'lucide-react';

const EnhancedLivestockManagement: React.FC = () => {
  const [livestock, setLivestock] = useState<any[]>([]);
  const [newLivestock, setNewLivestock] = useState({
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
  const [editingLivestock, setEditingLivestock] = useState<any>(null);
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
      
      if (!error && data) setLivestock(data);
    } catch (error) {
      console.error('Error fetching livestock:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEditing = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (isEditing && editingLivestock) {
        setEditingLivestock({ ...editingLivestock, image_url: url });
      } else {
        setNewLivestock({ ...newLivestock, image_url: url });
      }
    }
  };

  const handleAddLivestock = async () => {
    if (!newLivestock.name || !newLivestock.category || !newLivestock.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in required fields (name, category, price)",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('livestock')
        .insert({
          ...newLivestock,
          user_id: user?.id,
          verified: true,
          featured: false
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Livestock added successfully",
        });
        setNewLivestock({
          name: '', category: '', breed: '', age: '', gender: '',
          price: '', location: '', description: '', image_url: ''
        });
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
    if (!editingLivestock) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('livestock')
        .update({
          name: editingLivestock.name,
          category: editingLivestock.category,
          breed: editingLivestock.breed,
          age: editingLivestock.age,
          gender: editingLivestock.gender,
          price: editingLivestock.price,
          location: editingLivestock.location,
          description: editingLivestock.description,
          image_url: editingLivestock.image_url
        })
        .eq('id', editingLivestock.id);

      if (!error) {
        toast({
          title: "Success",
          description: "Livestock updated successfully",
        });
        setEditingLivestock(null);
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

  const handleDeleteLivestock = async (id: string) => {
    try {
      setLoading(true);
      
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
          description: "Featured status updated",
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
      <h3 className="text-lg font-semibold">Livestock Management</h3>

      {/* Add New Livestock Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Livestock</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Animal name"
              value={newLivestock.name}
              onChange={(e) => setNewLivestock({ ...newLivestock, name: e.target.value })}
            />
            <Select value={newLivestock.category} onValueChange={(value) => setNewLivestock({ ...newLivestock, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Breed"
              value={newLivestock.breed}
              onChange={(e) => setNewLivestock({ ...newLivestock, breed: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Age"
              value={newLivestock.age}
              onChange={(e) => setNewLivestock({ ...newLivestock, age: e.target.value })}
            />
            <Select value={newLivestock.gender} onValueChange={(value) => setNewLivestock({ ...newLivestock, gender: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Price (TSH)"
              value={newLivestock.price}
              onChange={(e) => setNewLivestock({ ...newLivestock, price: e.target.value })}
            />
            <Input
              placeholder="Location"
              value={newLivestock.location}
              onChange={(e) => setNewLivestock({ ...newLivestock, location: e.target.value })}
            />
          </div>

          <Textarea
            placeholder="Description"
            value={newLivestock.description}
            onChange={(e) => setNewLivestock({ ...newLivestock, description: e.target.value })}
            rows={3}
          />

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, false)}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <Button onClick={handleAddLivestock} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" />
            Add Livestock
          </Button>
        </CardContent>
      </Card>

      {/* Livestock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {livestock.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              {editingLivestock?.id === item.id ? (
                <div className="space-y-3">
                  <Input
                    value={editingLivestock.name}
                    onChange={(e) => setEditingLivestock({ ...editingLivestock, name: e.target.value })}
                  />
                  <Select value={editingLivestock.category} onValueChange={(value) => setEditingLivestock({ ...editingLivestock, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Price"
                    value={editingLivestock.price}
                    onChange={(e) => setEditingLivestock({ ...editingLivestock, price: e.target.value })}
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateLivestock} size="sm" disabled={loading}>
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingLivestock(null)} variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover rounded" />
                  )}
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category} • {item.breed}</p>
                    <p className="text-lg font-bold text-green-600">{item.price} TSH</p>
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
                        variant="outline"
                        onClick={() => toggleFeatured(item.id, item.featured)}
                      >
                        <Star className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingLivestock(item)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteLivestock(item.id)}
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

export default EnhancedLivestockManagement;
