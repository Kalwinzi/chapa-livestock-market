
import React from 'react';
import { MapPin, ShoppingCart, Eye, Heart, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const FeaturedListings = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();

  const listings = [
    {
      id: 1,
      name: 'Premium Holstein Dairy Cow',
      location: 'Arusha, Tanzania',
      price: '2,800,000 TSH',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=350&fit=crop&crop=center',
      seller: 'Kalwin Farms',
      rating: 4.8,
      age: '3 years',
      breed: 'Holstein Friesian',
      verified: true,
      category: 'Dairy Cattle',
      weight: '450kg',
      milkProduction: '25L/day'
    },
    {
      id: 2,
      name: 'Pure Boer Goat Breeding Pair',
      location: 'Dodoma, Tanzania',
      price: '850,000 TSH',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=350&fit=crop&crop=center',
      seller: 'Heritage Livestock',
      rating: 4.9,
      age: '2 years',
      breed: 'Pure Boer',
      verified: true,
      category: 'Goats',
      weight: '65kg each',
      special: 'Breeding Ready'
    },
    {
      id: 3,
      name: 'Local Zebu Bull',
      location: 'Mwanza, Tanzania',
      price: '1,500,000 TSH',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&h=350&fit=crop&crop=center',
      seller: 'Sukuma Ranchers',
      rating: 4.7,
      age: '3.5 years',
      breed: 'Zebu Cross',
      verified: true,
      category: 'Beef Cattle',
      weight: '520kg',
      special: 'Strong Genetics'
    },
    {
      id: 4,
      name: 'Dorper Sheep Flock (5 heads)',
      location: 'Mbeya, Tanzania',
      price: '1,250,000 TSH',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=500&h=350&fit=crop&crop=center',
      seller: 'Highland Farms',
      rating: 4.6,
      age: '1.5-2 years',
      breed: 'Dorper',
      verified: true,
      category: 'Sheep',
      weight: '40-55kg each',
      special: 'Ready for Market'
    },
    {
      id: 5,
      name: 'Improved Kuroiler Chickens (50 birds)',
      location: 'Kilimanjaro, Tanzania',
      price: '500,000 TSH',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=350&fit=crop&crop=center',
      seller: 'Mountain Poultry',
      rating: 4.5,
      age: '4-6 months',
      breed: 'Improved Kuroiler',
      verified: true,
      category: 'Poultry',
      weight: '2-3kg each',
      special: 'High Egg Production'
    },
    {
      id: 6,
      name: 'Saanen Dairy Goats (3 does)',
      location: 'Morogoro, Tanzania',
      price: '900,000 TSH',
      image: 'https://images.unsplash.com/photo-1551916042-8cfde52c26de?w=500&h=350&fit=crop&crop=center',
      seller: 'Uluguru Livestock',
      rating: 4.8,
      age: '1-2 years',
      breed: 'Saanen Cross',
      verified: true,
      category: 'Dairy Goats',
      weight: '45-60kg each',
      milkProduction: '3-4L/day each'
    }
  ];

  const handleLocationClick = (location: string) => {
    toast({
      title: "Location Selected",
      description: `Showing livestock near ${location}. Map integration coming soon!`,
    });
  };

  const handleContactSeller = (item: any) => {
    toast({
      title: "Contacting Seller",
      description: `Connecting you with ${item.seller}. Call: +255 763 953 480 or email: kalwinzic@gmail.com`,
    });
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Viewing Details",
      description: `Full listing details for ${item.name} - Contact seller for more information`,
    });
  };

  const handleFavorite = (item: any) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} saved to your watchlist`,
    });
  };

  return (
    <section id="listings" className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className={`text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-all duration-700 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Award className="inline-block mr-3 h-8 w-8 text-primary-500" />
            Featured Livestock from Tanzania
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Discover premium livestock from verified sellers across Tanzania. Quality guaranteed, fair prices ensured.
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
          {listings.map((listing, index) => (
            <div 
              key={listing.id} 
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {listing.verified && (
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                      <Award className="h-3 w-3 mr-1" />
                      Verified
                    </div>
                  )}
                  <button 
                    onClick={() => handleFavorite(listing)}
                    className="bg-white/95 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
                  >
                    <Heart className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {listing.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <button 
                    onClick={() => handleViewDetails(listing)}
                    className="bg-black/80 hover:bg-black text-white px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-1 hover:scale-105"
                  >
                    <Eye className="h-3 w-3" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                  {listing.name}
                </h3>
                
                <button 
                  onClick={() => handleLocationClick(listing.location)}
                  className="flex items-center text-gray-600 dark:text-gray-300 mb-3 hover:text-primary-500 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Breed:</span>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{listing.breed}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Age:</span>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{listing.age}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Weight:</span>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{listing.weight}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Special:</span>
                    <p className="font-medium text-primary-600 dark:text-primary-400">{listing.special || listing.milkProduction}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Seller:</span>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{listing.seller}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{listing.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {listing.price}
                  </div>
                  <Button 
                    onClick={() => handleContactSeller(listing)}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
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
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105 px-8 py-3 text-lg font-semibold"
            onClick={() => toast({ title: "Browse All", description: "Full catalog with advanced filters coming soon!" })}
          >
            View All Livestock ({listings.length * 10}+ Available)
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
