
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Livestock Near You</h2>
            <p className="text-gray-600">Search thousands of verified listings across Africa</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Location (city, region)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                />
              </div>
              
              {/* Search Button */}
              <Button className="h-12 bg-green-700 hover:bg-green-800 text-white font-semibold">
                <Search className="h-5 w-5 mr-2" />
                Search Livestock
              </Button>
            </div>
            
            {/* Quick Filters */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 mr-2">Popular:</span>
              {['Dairy Cows', 'Beef Cattle', 'Goats', 'Sheep', 'Chickens'].map((filter) => (
                <button
                  key={filter}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
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
