import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, MessageCircle, Heart, MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ChatSystem from './ChatSystem';
import BuyerContactForm from './BuyerContactForm';

interface Livestock {
  id: string;
  name: string;
  breed?: string;
  age?: string;
  gender?: string;
  price?: string;
  location?: string;
  description?: string;
  image_url?: string;
  user_id?: string;
  created_at?: string;
}

interface Profile {
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface CategoryPageProps {
  category: string;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  const [livestock, setLivestock] = useState<Livestock[]>([]);
  const [filteredLivestock, setFilteredLivestock] = useState<Livestock[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLivestock, setSelectedLivestock] = useState<Livestock | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sellerProfile, setSellerProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchLivestock();
  }, [category]);

  useEffect(() => {
    const filtered = livestock.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.breed && item.breed.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredLivestock(filtered);
  }, [livestock, searchTerm]);

  const fetchLivestock = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('livestock')
        .select('*')
        .eq('category', category.toLowerCase())
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLivestock(data || []);
      setFilteredLivestock(data || []);
    } catch (error) {
      console.error('Error fetching livestock:', error);
      toast({
        title: "Error",
        description: "Failed to load livestock data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactSeller = async (livestockItem: Livestock) => {
    setSelectedLivestock(livestockItem);
    
    if (livestockItem.user_id) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone')
          .eq('id', livestockItem.user_id)
          .single();

        if (error) throw error;
        setSellerProfile(profile);
      } catch (error) {
        console.error('Error fetching seller profile:', error);
      }
    }
    
    setShowContactForm(true);
  };

  const handleStartChat = async (livestockItem: Livestock) => {
    setSelectedLivestock(livestockItem);
    
    if (livestockItem.user_id) {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, phone')
          .eq('id', livestockItem.user_id)
          .single();

        if (error) throw error;
        setSellerProfile(profile);
      } catch (error) {
        console.error('Error fetching seller profile:', error);
      }
    }
    
    setShowChat(true);
  };

  const getCategoryEmoji = (cat: string) => {
    const emojis: { [key: string]: string } = {
      'ng\'ombe': '🐄',
      'mbuzi': '🐐',
      'kondoo': '🐑',
      'nguruwe': '🐷',
      'kuku': '🐔'
    };
    return emojis[cat.toLowerCase()] || '🐄';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">
                {getCategoryEmoji(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Tafuta mifugo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredLivestock.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">{getCategoryEmoji(category)}</div>
            <h3 className="text-xl font-semibold mb-2">Hakuna mifugo ya {category} iliyopatikana</h3>
            <p className="text-muted-foreground">Jaribu kutafuta kwa maneno mengine au urudi baadaye.</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Imepatikana mifugo {filteredLivestock.length} ya {category}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLivestock.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image_url || '/placeholder.svg'}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="bg-white/90">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                      {item.price && (
                        <span className="text-lg font-bold text-primary">
                          {item.price}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {item.breed && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          <span>Aina: {item.breed}</span>
                        </div>
                      )}
                      {item.age && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Umri: {item.age}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleContactSeller(item)}
                      >
                        Wasiliana
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleStartChat(item)}
                        className="flex-1"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Contact Form Modal */}
      {showContactForm && selectedLivestock && (
        <BuyerContactForm
          isOpen={showContactForm}
          onClose={() => {
            setShowContactForm(false);
            setSelectedLivestock(null);
            setSellerProfile(null);
          }}
          livestock={selectedLivestock}
          sellerProfile={sellerProfile}
        />
      )}

      {/* Chat Modal */}
      {showChat && selectedLivestock && (
        <ChatSystem
          isOpen={showChat}
          onClose={() => {
            setShowChat(false);
            setSelectedLivestock(null);
            setSellerProfile(null);
          }}
          livestock={selectedLivestock}
        />
      )}
    </div>
  );
};

export default CategoryPage;
