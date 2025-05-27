
import React, { useState } from 'react';
import { MapPin, Heart, Star, Filter, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductListings = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { id: 'all', name: 'All Livestock', count: 1250 },
    { id: 'cattle', name: 'Cattle', count: 480 },
    { id: 'goats', name: 'Goats', count: 320 },
    { id: 'sheep', name: 'Sheep', count: 250 },
    { id: 'poultry', name: 'Poultry', count: 200 }
  ];

  const listings = [
    {
      id: 1,
      name: 'Premium Holstein Dairy Cows',
      category: 'cattle',
      price: '₦850,000',
      originalPrice: '₦950,000',
      location: 'Kaduna State, Nigeria',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=300&fit=crop',
      seller: 'Green Valley Ranch',
      rating: 4.9,
      reviews: 47,
      age: '2-3 years',
      breed: 'Holstein Friesian',
      featured: true,
      verified: true,
      tags: ['Vaccinated', 'Health Certified', 'High Yield']
    },
    {
      id: 2,
      name: 'Angus Beef Cattle',
      category: 'cattle',
      price: '₦720,000',
      location: 'Plateau State, Nigeria',
      image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=400&h=300&fit=crop',
      seller: 'Sunrise Farms',
      rating: 4.8,
      reviews: 32,
      age: '1.5-2 years',
      breed: 'Aberdeen Angus',
      featured: false,
      verified: true,
      tags: ['Grass Fed', 'Premium Quality']
    },
    {
      id: 3,
      name: 'Boer Goat Breeding Stock',
      category: 'goats',
      price: '₦180,000',
      location: 'Ogun State, Nigeria',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      seller: 'Heritage Livestock',
      rating: 4.7,
      reviews: 28,
      age: '1-2 years',
      breed: 'Boer',
      featured: true,
      verified: true,
      tags: ['Breeding Stock', 'High Fertility']
    },
    {
      id: 4,
      name: 'Merino Sheep Flock',
      category: 'sheep',
      price: '₦95,000',
      location: 'Kano State, Nigeria',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=300&fit=crop',
      seller: 'Northern Pastures',
      rating: 4.6,
      reviews: 19,
      age: '1-3 years',
      breed: 'Merino',
      featured: false,
      verified: true,
      tags: ['Wool Quality', 'Hardy Breed']
    },
    {
      id: 5,
      name: 'Free-Range Chickens',
      category: 'poultry',
      price: '₦3,500',
      location: 'Lagos State, Nigeria',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop',
      seller: 'Urban Farm Co.',
      rating: 4.5,
      reviews: 156,
      age: '4-6 months',
      breed: 'Rhode Island Red',
      featured: false,
      verified: true,
      tags: ['Free Range', 'Organic Feed']
    },
    {
      id: 6,
      name: 'Saanen Dairy Goats',
      category: 'goats',
      price: '₦125,000',
      location: 'Enugu State, Nigeria',
      image: 'https://images.unsplash.com/photo-1551916042-8cfde52c26de?w=400&h=300&fit=crop',
      seller: 'Alpine Farms',
      rating: 4.8,
      reviews: 24,
      age: '1-2 years',
      breed: 'Saanen',
      featured: false,
      verified: true,
      tags: ['High Milk Yield', 'Disease Resistant']
    }
  ];

  const filteredListings = listings.filter(listing => 
    selectedCategory === 'all' || listing.category === selectedCategory
  );

  return (
    <section id="listings" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-h2 md:text-5xl font-bold text-text-primary mb-6">
            Featured Livestock
          </h2>
          <p className="text-body-lg text-text-secondary max-w-3xl mx-auto">
            Discover high-quality livestock from verified sellers across Africa. 
            Every animal is health-certified and comes with our quality guarantee.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 animate-slide-up">
          {/* Category Filter */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white shadow-soft'
                      : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
              className="bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden group animate-scale-in card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {listing.featured && (
                    <Badge className="bg-accent text-white">Featured</Badge>
                  )}
                  {listing.verified && (
                    <Badge className="bg-primary text-white">Verified</Badge>
                  )}
                </div>
                
                {/* Wishlist button */}
                <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>

                {/* Price overlay */}
                <div className="absolute bottom-3 left-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-lg font-bold text-primary">{listing.price}</div>
                    {listing.originalPrice && (
                      <div className="text-sm text-gray-500 line-through">{listing.originalPrice}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors">
                    {listing.name}
                  </h3>
                  
                  <div className="flex items-center text-text-secondary text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {listing.location}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {listing.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-primary-50 text-primary text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Breed:</span>
                    <div className="font-medium text-text-primary">{listing.breed}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Age:</span>
                    <div className="font-medium text-text-primary">{listing.age}</div>
                  </div>
                </div>

                {/* Seller info */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm font-medium text-text-primary">{listing.seller}</div>
                    <div className="flex items-center text-sm text-text-secondary">
                      <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                      {listing.rating} ({listing.reviews} reviews)
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button className="flex-1 btn-primary">
                    Contact Seller
                  </Button>
                  <Button variant="outline" size="sm" className="p-3">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center animate-fade-in">
          <Button variant="outline" size="lg" className="px-8 py-3">
            Load More Listings
          </Button>
          <p className="text-sm text-text-secondary mt-4">
            Showing 6 of 1,250+ verified listings
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductListings;
