
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';
import { useFavorites } from '@/hooks/useFavorites';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { getFeaturedLivestock, allLivestockData } from '@/data/livestockData';
import BuyerContactForm from './BuyerContactForm';
import LazyImage from './optimized/LazyImage';
import OptimizedListingGrid from './optimized/OptimizedListingGrid';
import PageLoader from './optimized/PageLoader';

const FeaturedListings = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const [selectedLivestock, setSelectedLivestock] = useState<any>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { favorites, toggleFavorite } = useFavorites();
  
  usePerformanceMonitor('FeaturedListings');

  const featuredListings = getFeaturedLivestock();

  const handleLocationClick = (location: string) => {
    toast({
      title: "Location Selected",
      description: `Showing livestock near ${location}. Map feature coming soon!`,
    });
  };

  const handleContactSeller = (item: any) => {
    setSelectedLivestock(item);
    setIsContactFormOpen(true);
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - Breed: ${item.details.breed}, Age: ${item.details.age}, Gender: ${item.details.gender}, Type: ${item.details.type}, Weight: ${item.details.weight || 'N/A'}. Seller: ${item.seller.name} (${item.seller.phone}) - ${item.seller.description}`,
    });
  };

  const handleViewMore = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
    setIsLoading(false);
    toast({
      title: "View More Listings",
      description: `Showing all ${allLivestockData.length} available livestock listings`,
    });
  };

  return (
    <>
      <section id="listings" className="py-16 bg-accent-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              ref={titleRef}
              className={`text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ${
                titleVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              Featured Livestock from Tanzania
            </h2>
            <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              Discover high-quality livestock from verified sellers across Tanzania
            </p>
          </div>
          
          <div ref={gridRef}>
            <PageLoader isLoading={isLoading} loadingText="Loading livestock...">
              <OptimizedListingGrid
                listings={featuredListings}
                onContactSeller={handleContactSeller}
                onViewDetails={handleViewDetails}
                itemsPerPage={6}
              />
            </PageLoader>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
              onClick={handleViewMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Loading...
                </>
              ) : (
                `View More Listings (${allLivestockData.length}+ Available)`
              )}
            </Button>
          </div>
        </div>
      </section>

      <BuyerContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        livestock={selectedLivestock}
      />
    </>
  );
};

export default FeaturedListings;
