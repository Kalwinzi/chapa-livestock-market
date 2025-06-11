
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Filter } from 'lucide-react';
import { searchLivestock } from '@/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { elementRef, isVisible } = useScrollAnimation<HTMLElement>();
  const { toast } = useToast();

  const searchResults = useMemo(() => {
    if (!searchQuery && !selectedLocation && !selectedCategory) return [];
    
    let results = searchLivestock(searchQuery, selectedLocation);
    
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    return results;
  }, [searchQuery, selectedLocation, selectedCategory]);

  const handleSearch = () => {
    if (!searchQuery && !selectedLocation && !selectedCategory) {
      toast({
        title: "Search Required",
        description: "Please enter a search term, select a location, or choose a category.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Search Results",
      description: `Found ${searchResults.length} livestock matching your criteria.`,
    });
  };

  const categories = ["Cattle", "Goats", "Sheep", "Pigs", "Poultry", "Others"];
  const locations = ["Arusha", "Dar es Salaam", "Dodoma", "Mwanza", "Iringa", "Kilimanjaro", "Mbeya", "Morogoro", "Singida", "Tanga"];

  return (
    <section ref={elementRef} id="search" className="py-16 bg-primary-50 dark:bg-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Livestock
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of verified livestock listings across Tanzania
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search livestock, breeds, or types..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-12">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location.toLowerCase()}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSearch}
              size="lg" 
              className="w-full h-12 text-lg font-semibold"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Livestock
            </Button>

            {searchResults.length > 0 && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>{searchResults.length}</strong> livestock found matching your search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
