
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';
import { getFeaturedLivestock, allLivestockData } from '@/data/livestockData';
import BuyerContactForm from './BuyerContactForm';

const FeaturedListings = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const [selectedLivestock, setSelectedLivestock] = useState<any>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const { toast } = useToast();

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

  const handleFavorite = (item: any) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} saved to your favorites`,
    });
  };

  const handleViewMore = () => {
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
          
          <div 
            ref={gridRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 delay-300 ${
              gridVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {featuredListings.map((listing) => (
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
                  
                  <button 
                    onClick={() => handleLocationClick(listing.location)}
                    className="flex items-center text-muted-foreground mb-2 hover:text-primary-500 transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </button>
                  
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
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105"
              onClick={handleViewMore}
            >
              View More Listings ({allLivestockData.length}+ Available)
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
