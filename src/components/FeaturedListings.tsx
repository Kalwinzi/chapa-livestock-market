
import React, { useState } from 'react';
import { MapPin, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const FeaturedListings = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Sample data to prevent blocking
  const featuredListings = [
    {
      id: 1,
      name: "Premium Holstein Cow",
      category: "Cattle",
      price: "TSH 2,500,000",
      image: "https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400",
      location: "Mbeya, Tanzania",
      verified: true,
      details: {
        breed: "Holstein",
        age: "3 years",
        gender: "Female",
        type: "Dairy",
        weight: "450kg"
      },
      seller: {
        name: "John Mwakasege",
        phone: "+255 765 123 456",
        rating: 4.8,
        description: "Experienced dairy farmer"
      }
    },
    {
      id: 2,
      name: "Local Goats",
      category: "Goats",
      price: "TSH 350,000",
      image: "https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400",
      location: "Dodoma, Tanzania",
      verified: true,
      details: {
        breed: "Local",
        age: "2 years",
        gender: "Mixed",
        type: "Meat",
        weight: "35kg"
      },
      seller: {
        name: "Maria Kimaro",
        phone: "+255 754 987 654",
        rating: 4.6,
        description: "Small scale farmer"
      }
    }
  ];

  const handleLocationClick = (location: string) => {
    toast({
      title: "Location Selected",
      description: `Showing livestock near ${location}`,
    });
  };

  const handleContactSeller = (item: any) => {
    toast({
      title: "Contact Seller",
      description: `Contacting ${item.seller.name} about ${item.name}`,
    });
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - ${item.details.breed}, ${item.details.age}`,
    });
  };

  const handleViewMore = () => {
    toast({
      title: "View More Listings",
      description: "Loading more livestock listings...",
    });
  };

  return (
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
          {featuredListings.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.verified && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    ✓ Verified
                  </div>
                )}
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span 
                      className="hover:text-primary cursor-pointer"
                      onClick={() => handleLocationClick(item.location)}
                    >
                      {item.location}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="font-medium">Breed:</span> {item.details.breed}</div>
                  <div><span className="font-medium">Age:</span> {item.details.age}</div>
                  <div><span className="font-medium">Gender:</span> {item.details.gender}</div>
                  <div><span className="font-medium">Weight:</span> {item.details.weight}</div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="text-2xl font-bold text-primary-500">{item.price}</div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewDetails(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleContactSeller(item)}
                      className="bg-primary-500 hover:bg-primary-600 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
              `View More Listings (100+ Available)`
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
