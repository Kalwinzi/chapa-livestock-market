
import React from 'react';
import { MapPin, ShoppingCart, Eye, Heart } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop',
      seller: 'Kalwin Farms',
      rating: 4.8,
      age: '3 years',
      breed: 'Holstein',
      verified: true
    },
    {
      id: 2,
      name: 'Boer Goat Breeding Pair',
      location: 'Dodoma, Tanzania',
      price: '850,000 TSH',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      seller: 'Heritage Livestock',
      rating: 4.9,
      age: '2 years',
      breed: 'Boer',
      verified: true
    },
    {
      id: 3,
      name: 'Local Zebu Cattle',
      location: 'Mwanza, Tanzania',
      price: '1,200,000 TSH',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop',
      seller: 'Sukuma Ranchers',
      rating: 4.7,
      age: '2.5 years',
      breed: 'Zebu',
      verified: true
    },
    {
      id: 4,
      name: 'Dorper Sheep Flock',
      location: 'Mbeya, Tanzania',
      price: '450,000 TSH',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      seller: 'Highland Farms',
      rating: 4.6,
      age: '1.5 years',
      breed: 'Dorper',
      verified: true
    },
    {
      id: 5,
      name: 'Free-Range Chickens',
      location: 'Kilimanjaro, Tanzania',
      price: '25,000 TSH',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
      seller: 'Mountain Poultry',
      rating: 4.5,
      age: '6 months',
      breed: 'Kuroiler',
      verified: true
    },
    {
      id: 6,
      name: 'Dairy Goat Herd',
      location: 'Morogoro, Tanzania',
      price: '680,000 TSH',
      image: 'https://images.unsplash.com/photo-1551916042-8cfde52c26de?w=400&h=300&fit=crop',
      seller: 'Uluguru Livestock',
      rating: 4.8,
      age: '1 year',
      breed: 'Saanen Cross',
      verified: true
    }
  ];

  const handleLocationClick = (location: string) => {
    toast({
      title: "Location Selected",
      description: `Showing livestock near ${location}. Map feature coming soon!`,
    });
  };

  const handleBuyClick = (item: any) => {
    toast({
      title: "Contact Seller",
      description: `Connecting you with ${item.seller} for ${item.name}`,
    });
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Viewing Details",
      description: `Full details for ${item.name} - Contact: kalwinzic@gmail.com`,
    });
  };

  const handleFavorite = (item: any) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} saved to your favorites`,
    });
  };

  return (
    <section id="listings" className="py-16 bg-gray-50 dark:bg-gray-900/50">
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
            Featured Livestock from Tanzania
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
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
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
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
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{listing.name}</h3>
                
                <button 
                  onClick={() => handleLocationClick(listing.location)}
                  className="flex items-center text-gray-600 dark:text-gray-300 mb-2 hover:text-primary-500 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </button>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Breed: </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{listing.breed}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Age: </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{listing.age}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Seller: </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{listing.seller}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium ml-1 text-gray-700 dark:text-gray-200">{listing.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">{listing.price}</div>
                  <Button 
                    onClick={() => handleBuyClick(listing)}
                    className="bg-green-700 hover:bg-green-800 text-white transition-all duration-300 hover:scale-105"
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
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all duration-300 hover:scale-105"
            onClick={() => toast({ title: "Browse All", description: "Full catalog coming soon!" })}
          >
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
