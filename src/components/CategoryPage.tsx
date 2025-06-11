
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, MapPin, Heart, Eye, ShoppingCart } from 'lucide-react';
import { getLivestockByCategory, searchLivestock, type LivestockItem } from '@/data';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import BuyerContactForm from './BuyerContactForm';

interface CategoryPageProps {
  category: string;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLivestock, setSelectedLivestock] = useState<LivestockItem | null>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  const filteredListings = useMemo(() => {
    let listings = getLivestockByCategory(category);
    
    if (searchQuery) {
      listings = searchLivestock(searchQuery).filter(item => item.category === category);
    }
    
    return listings;
  }, [category, searchQuery]);

  const handleContactSeller = (item: LivestockItem) => {
    setSelectedLivestock(item);
    setIsContactFormOpen(true);
  };

  const handleViewDetails = (item: LivestockItem) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - ${item.details.breed}, ${item.details.age}, ${item.details.gender}`,
    });
  };

  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="outline" onClick={onBack} className="mb-4">
              ← Back to Categories
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{category} Listings</h1>
            <p className="text-muted-foreground">
              {filteredListings.length} {category.toLowerCase()} available
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${category.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.verified && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Verified
                  </div>
                )}
                <button
                  onClick={() => toggleFavorite(item.id.toString())}
                  className="absolute top-2 left-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(item.id.toString())
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-2xl font-bold text-primary-500 mb-2">{item.price}</p>
                
                <div className="space-y-1 text-sm text-muted-foreground mb-4">
                  <p>Breed: {item.details.breed}</p>
                  <p>Age: {item.details.age}</p>
                  <p>Gender: {item.details.gender}</p>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetails(item)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleContactSeller(item)}
                    className="flex-1"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No {category.toLowerCase()} found{searchQuery && ` for "${searchQuery}"`}.
            </p>
          </div>
        )}
      </div>

      <BuyerContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        livestock={selectedLivestock}
      />
    </div>
  );
};

export default CategoryPage;
