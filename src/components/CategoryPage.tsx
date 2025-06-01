
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Heart, MapPin, Phone, MessageCircle, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLivestockByCategory, searchLivestock, type LivestockItem } from '@/data/livestockData';
import { useToast } from '@/hooks/use-toast';
import BuyerContactForm from './BuyerContactForm';
import ChatSystem from './ChatSystem';

interface CategoryPageProps {
  category: string;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  const [livestock, setLivestock] = useState<LivestockItem[]>([]);
  const [filteredLivestock, setFilteredLivestock] = useState<LivestockItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    location: 'all',
    type: 'all',
    gender: 'all'
  });
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedLivestock, setSelectedLivestock] = useState<LivestockItem | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const categoryData = getLivestockByCategory(category);
    setLivestock(categoryData);
    setFilteredLivestock(categoryData);
  }, [category]);

  useEffect(() => {
    let filtered = livestock;

    // Apply search filter
    if (searchTerm) {
      filtered = searchLivestock(searchTerm).filter(item => item.category === category);
    }

    // Apply other filters
    if (selectedFilters.priceRange !== 'all') {
      filtered = filtered.filter(item => {
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        switch (selectedFilters.priceRange) {
          case 'low': return price < 500000;
          case 'medium': return price >= 500000 && price < 1500000;
          case 'high': return price >= 1500000;
          default: return true;
        }
      });
    }

    if (selectedFilters.location !== 'all') {
      filtered = filtered.filter(item => 
        item.location.toLowerCase().includes(selectedFilters.location.toLowerCase())
      );
    }

    if (selectedFilters.type !== 'all') {
      filtered = filtered.filter(item => item.details.type === selectedFilters.type);
    }

    if (selectedFilters.gender !== 'all') {
      filtered = filtered.filter(item => item.details.gender === selectedFilters.gender);
    }

    setFilteredLivestock(filtered);
  }, [searchTerm, selectedFilters, livestock, category]);

  const handleContactSeller = (animal: LivestockItem) => {
    setSelectedLivestock(animal);
    setIsContactFormOpen(true);
    toast({
      title: "Contact Seller",
      description: `Opening contact form for ${animal.name}`,
    });
  };

  const handleStartChat = (animal: LivestockItem) => {
    setSelectedLivestock(animal);
    setIsChatOpen(true);
    toast({
      title: "Chat Started",
      description: `Starting chat with ${animal.seller.name}`,
    });
  };

  const toggleFavorite = (animalId: number) => {
    setFavorites(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
    
    const action = favorites.includes(animalId) ? 'removed from' : 'added to';
    toast({
      title: "Favorites Updated",
      description: `Livestock ${action} your favorites`,
    });
  };

  const getLocationNames = () => {
    const locations = [...new Set(livestock.map(item => 
      item.location.split(',')[0].trim()
    ))];
    return locations.slice(0, 5); // Limit to 5 locations
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Categories
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{category}</h1>
                <p className="text-muted-foreground">{filteredLivestock.length} animals available</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${category.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedFilters.priceRange}
                onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Prices</option>
                <option value="low">Under 500K TSH</option>
                <option value="medium">500K - 1.5M TSH</option>
                <option value="high">Above 1.5M TSH</option>
              </select>

              <select
                value={selectedFilters.location}
                onChange={(e) => setSelectedFilters({...selectedFilters, location: e.target.value})}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Locations</option>
                {getLocationNames().map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>

              <select
                value={selectedFilters.type}
                onChange={(e) => setSelectedFilters({...selectedFilters, type: e.target.value})}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Types</option>
                <option value="Kienyeji">Kienyeji</option>
                <option value="Kisasa">Kisasa</option>
                <option value="Mixed">Mixed</option>
              </select>

              <select
                value={selectedFilters.gender}
                onChange={(e) => setSelectedFilters({...selectedFilters, gender: e.target.value})}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Livestock Grid */}
      <div className="container mx-auto px-4 py-8">
        {filteredLivestock.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🐄</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No {category} Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLivestock.map((animal) => (
              <Card key={animal.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="relative">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(animal.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart 
                      className={`h-4 w-4 ${favorites.includes(animal.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </button>
                  {animal.verified && (
                    <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                      Verified
                    </Badge>
                  )}
                  {animal.featured && (
                    <Badge className="absolute top-8 left-3 bg-primary-500 text-white">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary-500 transition-colors">
                      {animal.name}
                    </h3>
                    <span className="text-lg font-bold text-primary-500">{animal.price}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {animal.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <span className="font-medium">Breed:</span> {animal.details.breed}
                    </div>
                    <div>
                      <span className="font-medium">Age:</span> {animal.details.age}
                    </div>
                    <div>
                      <span className="font-medium">Gender:</span> {animal.details.gender}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {animal.details.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary-600">
                          {animal.seller.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{animal.seller.name}</p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs text-muted-foreground">{animal.seller.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleContactSeller(animal)}
                      className="flex-1 bg-primary-500 hover:bg-primary-600 text-white"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button
                      onClick={() => handleStartChat(animal)}
                      variant="outline"
                      className="flex-1 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                      size="sm"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      {selectedLivestock && (
        <BuyerContactForm
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          livestock={selectedLivestock}
        />
      )}

      {/* Chat Modal */}
      {selectedLivestock && (
        <ChatSystem
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          sellerName={selectedLivestock.seller.name}
        />
      )}
    </div>
  );
};

export default CategoryPage;
