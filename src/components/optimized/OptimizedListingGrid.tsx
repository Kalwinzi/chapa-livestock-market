
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Eye, MapPin, ShoppingCart } from 'lucide-react';
import LazyImage from './LazyImage';
import { usePerformanceCache } from '@/hooks/usePerformanceCache';
import { useFavorites } from '@/hooks/useFavorites';

interface OptimizedListingGridProps {
  listings: any[];
  onContactSeller: (listing: any) => void;
  onViewDetails: (listing: any) => void;
  itemsPerPage?: number;
}

const OptimizedListingGrid: React.FC<OptimizedListingGridProps> = ({
  listings,
  onContactSeller,
  onViewDetails,
  itemsPerPage = 12
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { getCachedData, setCachedData } = usePerformanceCache();
  const { favorites, toggleFavorite } = useFavorites();

  const cacheKey = `listings-page-${currentPage}`;

  const paginatedListings = useMemo(() => {
    const cached = getCachedData(cacheKey) as any[];
    if (cached) return cached;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const result = listings.slice(start, end);
    
    setCachedData(cacheKey, result, 2 * 60 * 1000); // Cache for 2 minutes
    return result;
  }, [listings, currentPage, itemsPerPage, getCachedData, setCachedData, cacheKey]);

  const totalPages = Math.ceil(listings.length / itemsPerPage);

  const loadNextPage = async () => {
    if (currentPage >= totalPages) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
    setCurrentPage(prev => prev + 1);
    setIsLoading(false);
  };

  const handleFavorite = (listing: any) => {
    toggleFavorite(listing.id.toString());
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedListings && paginatedListings.map((listing) => (
          <Card 
            key={listing.id} 
            className="group hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border"
          >
            <div className="relative">
              <LazyImage
                src={listing.image}
                alt={listing.name}
                className="w-full h-48 object-cover rounded-t-lg"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                {listing.verified && (
                  <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    ✓ Verified
                  </div>
                )}
                <button 
                  onClick={() => handleFavorite(listing)}
                  className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(listing.id.toString()) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">{listing.name}</h3>
              
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm line-clamp-1">{listing.location}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Breed: </span>
                  <span className="font-medium text-foreground line-clamp-1">{listing.details?.breed}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Age: </span>
                  <span className="font-medium text-foreground">{listing.details?.age}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div className="text-xl font-bold text-primary-500">{listing.price}</div>
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm font-medium ml-1 text-foreground">{listing.seller?.rating || '4.5'}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(listing)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Details
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => onContactSeller(listing)}
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

      {currentPage < totalPages && (
        <div className="text-center">
          <Button 
            onClick={loadNextPage}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Loading...
              </>
            ) : (
              `Load More (${listings.length - currentPage * itemsPerPage} remaining)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptimizedListingGrid;
