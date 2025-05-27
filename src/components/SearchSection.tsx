
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="py-20 bg-cream-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold text-sage-700 mb-6">Find Livestock Near You</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-xl text-sage-600">Search thousands of verified listings across Africa</p>
          </div>
          
          <div className="bg-cream-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-cream-300 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 border-2 border-cream-300 focus:border-sage-500 focus:ring-sage-500 bg-cream-50 text-sage-700 rounded-xl"
                />
              </div>
              
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Location (city, region)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-14 border-2 border-cream-300 focus:border-sage-500 focus:ring-sage-500 bg-cream-50 text-sage-700 rounded-xl"
                />
              </div>
              
              {/* Search Button */}
              <Button className="h-14 bg-sage-600 hover:bg-sage-700 text-cream-50 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Search className="h-5 w-5 mr-2" />
                Search Livestock
              </Button>
            </div>
            
            {/* Quick Filters */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <span className="text-sage-600 font-medium mr-3">Popular:</span>
              {['Dairy Cows', 'Beef Cattle', 'Goats', 'Sheep', 'Chickens'].map((filter) => (
                <button
                  key={filter}
                  className="px-4 py-2 bg-gold-100 text-sage-700 rounded-full text-sm hover:bg-gold-200 transition-all duration-300 border border-gold-300 font-medium"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
