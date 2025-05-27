
import React from 'react';

const CategoriesSection = () => {
  const categories = [
    {
      name: 'Cattle',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 8c0-3.3-2.7-6-6-6S7 4.7 7 8c0 1.1.3 2.1.8 3L12 16l4.2-5c.5-.9.8-1.9.8-3zM12 4c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"/>
          <circle cx="12" cy="8" r="2"/>
        </svg>
      ),
      count: '5,240',
      description: 'Dairy & Beef Cattle'
    },
    {
      name: 'Goats',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      count: '3,120',
      description: 'Dairy & Meat Goats'
    },
    {
      name: 'Sheep',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      ),
      count: '2,890',
      description: 'Wool & Meat Sheep'
    },
    {
      name: 'Poultry',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7l1.5-6h7L17 11h-2l-1.5-2h-3L9 11zm1-4h4l-.5-2h-3L10 7z"/>
          <path d="M20 18l-8-6-8 6v3h16v-3z"/>
        </svg>
      ),
      count: '8,760',
      description: 'Chickens, Ducks & More'
    },
    {
      name: 'Pigs',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      count: '1,240',
      description: 'Breeding & Commercial'
    },
    {
      name: 'Other',
      icon: (
        <svg className="w-12 h-12 mx-auto mb-4 text-green-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
        </svg>
      ),
      count: '890',
      description: 'Rabbits, Fish & More'
    }
  ];

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of livestock categories with thousands of verified listings
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-green-500 cursor-pointer group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-2xl font-bold text-green-700 mb-1">{category.count}</p>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
