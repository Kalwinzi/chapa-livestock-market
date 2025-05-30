
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Eye, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getLivestockByCategory, LivestockItem } from '@/data/livestockData';
import { useToast } from '@/hooks/use-toast';

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const [listings] = useState<LivestockItem[]>(getLivestockByCategory(category));
  const [filteredListings, setFilteredListings] = useState<LivestockItem[]>(listings);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const { toast } = useToast();

  const applyFilters = () => {
    let filtered = listings;

    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(item => item.details.gender === genderFilter);
    }

    if (typeFilter) {
      filtered = filtered.filter(item => item.details.type === typeFilter);
    }

    setFilteredListings(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchQuery, genderFilter, typeFilter]);

  const handleContactSeller = (item: LivestockItem) => {
    const message = `Hello, I'm interested in your ${item.name} (${item.details.breed}, ${item.details.age}, ${item.details.gender}) listed at ${item.price}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/${item.seller.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Contacting Seller",
      description: `Opening WhatsApp to contact ${item.seller.name}`,
    });
  };

  const handleViewDetails = (item: LivestockItem) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - Breed: ${item.details.breed}, Age: ${item.details.age}, Gender: ${item.details.gender}, Type: ${item.details.type}. Seller: ${item.seller.name} (${item.seller.phone})`,
    });
  };

  const handleFavorite = (item: LivestockItem) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} saved to your favorites`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{category} Listings</h1>
          <p className="text-muted-foreground mb-8">
            Browse {filteredListings.length} verified {category.toLowerCase()} from trusted sellers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4"
              />
            </div>
            
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="h-10 w-full border border-input bg-background text-foreground rounded-md px-3"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 w-full border border-input bg-background text-foreground rounded-md px-3"
            >
              <option value="">All Types</option>
              <option value="Kienyeji">Kienyeji (Local)</option>
              <option value="Kisasa">Kisasa (Improved)</option>
              <option value="Mixed">Mixed</option>
            </select>

            <Button 
              onClick={applyFilters}
              className="bg-primary-500 hover:bg-primary-600"
            >
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredListings.map((listing) => (
            <div key={listing.id} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-border">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {listing.verified && (
                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      ✓ Verified
                    </div>
                  )}
                  <button 
                    onClick={() => handleFavorite(listing)}
                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <button 
                    onClick={() => handleViewDetails(listing)}
                    className="bg-black/70 text-white px-3 py-1 rounded-full text-sm hover:bg-black/90 transition-colors flex items-center space-x-1"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{listing.name}</h3>
                
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Breed: </span>
                    <span className="font-medium text-foreground">{listing.details.breed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Age: </span>
                    <span className="font-medium text-foreground">{listing.details.age}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gender: </span>
                    <span className="font-medium text-foreground">{listing.details.gender}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type: </span>
                    <span className="font-medium text-foreground">{listing.details.type}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-muted-foreground text-sm">Seller: </span>
                    <span className="font-medium text-foreground text-sm">{listing.seller.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium ml-1 text-foreground">{listing.seller.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-500">{listing.price}</div>
                  <Button 
                    onClick={() => handleContactSeller(listing)}
                    className="bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 hover:scale-105"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No livestock found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setGenderFilter('');
                setTypeFilter('');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
