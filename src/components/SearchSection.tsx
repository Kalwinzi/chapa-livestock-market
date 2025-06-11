
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Filter, Eye, ShoppingCart, Crown } from 'lucide-react';
import { enhancedLivestockData, enhancedLivestockCategories } from '@/data/enhancedLivestockItems';
import { useToast } from '@/hooks/use-toast';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const locations = [
    'Dar es Salaam', 'Arusha', 'Mwanza', 'Dodoma', 'Mbeya', 
    'Morogoro', 'Tanga', 'Iringa', 'Shinyanga', 'Kilimanjaro'
  ];

  const handleSearch = () => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate search with enhanced data
    let results = enhancedLivestockData;
    
    if (searchQuery) {
      results = results.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    if (selectedLocation) {
      results = results.filter(item => item.location.includes(selectedLocation));
    }
    
    setTimeout(() => {
      setSearchResults(results);
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found ${results.length} livestock matching your criteria`,
      });
    }, 1000);
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - ${item.details.breed}, ${item.details.age}`,
    });
  };

  const handleContactSeller = (item: any) => {
    toast({
      title: "Contact Seller",
      description: `Contacting ${item.seller.name} about ${item.name}`,
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <section id="search" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Find Your Perfect Livestock</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of verified livestock listings across Tanzania
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or breed..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {enhancedLivestockCategories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.icon} {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      <MapPin className="h-4 w-4 mr-2 inline" />
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch} 
                className="bg-primary-500 hover:bg-primary-600 text-white"
                disabled={isSearching}
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
            
            {hasSearched && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Found {searchResults.length} results</span>
                <Button variant="ghost" size="sm" onClick={clearSearch}>
                  Clear filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-6">
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.slice(0, 12).map((item) => (
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
                      {item.featured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <Crown className="w-3 h-3" />
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-2xl font-bold text-primary-500 mb-2">{item.price}</p>
                      
                      <div className="space-y-1 text-sm text-muted-foreground mb-4">
                        <p>Breed: {item.details.breed}</p>
                        <p>Age: {item.details.age}</p>
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No livestock found matching your search criteria. Try adjusting your filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchSection;
