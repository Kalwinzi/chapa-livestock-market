
import React from 'react';
import { MapPin, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      name: 'Premium Holstein Dairy Cow',
      location: 'Nairobi, Kenya',
      price: '$1,200',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop',
      seller: 'Green Valley Farm',
      rating: 4.8,
      age: '3 years',
      breed: 'Holstein'
    },
    {
      id: 2,
      name: 'Angus Beef Cattle',
      location: 'Cape Town, South Africa',
      price: '$900',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop',
      seller: 'Sunrise Ranch',
      rating: 4.9,
      age: '2 years',
      breed: 'Angus'
    },
    {
      id: 3,
      name: 'Boer Goat Breeding Pair',
      location: 'Lagos, Nigeria',
      price: '$450',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      seller: 'Heritage Farms',
      rating: 4.7,
      age: '1.5 years',
      breed: 'Boer'
    },
    {
      id: 4,
      name: 'Merino Sheep Flock',
      location: 'Addis Ababa, Ethiopia',
      price: '$320',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      seller: 'Highland Pastures',
      rating: 4.6,
      age: '2 years',
      breed: 'Merino'
    },
    {
      id: 5,
      name: 'Free-Range Chickens',
      location: 'Accra, Ghana',
      price: '$8',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
      seller: 'Natural Poultry Co.',
      rating: 4.5,
      age: '6 months',
      breed: 'Rhode Island Red'
    },
    {
      id: 6,
      name: 'Dairy Goat Herd',
      location: 'Kigali, Rwanda',
      price: '$280',
      image: 'https://images.unsplash.com/photo-1551916042-8cfde52c26de?w=400&h=300&fit=crop',
      seller: 'Valley View Farm',
      rating: 4.8,
      age: '1 year',
      breed: 'Saanen'
    }
  ];

  return (
    <section id="listings" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Livestock</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover high-quality livestock from verified sellers across Africa
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-700 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{listing.name}</h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{listing.location}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Breed: </span>
                    <span className="text-sm font-medium">{listing.breed}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Age: </span>
                    <span className="text-sm font-medium">{listing.age}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Seller: </span>
                    <span className="text-sm font-medium">{listing.seller}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium ml-1">{listing.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold text-green-700">{listing.price}</div>
                  <Button className="bg-green-700 hover:bg-green-800">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
