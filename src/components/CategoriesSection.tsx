
import React from 'react';
import { livestockCategories } from '@/data/livestockData';
import { useToast } from '@/hooks/use-toast';

const CategoriesSection = () => {
  const { toast } = useToast();

  const handleCategoryClick = (categoryName: string, count: string) => {
    // For now, show toast - in full implementation this would navigate to category page
    toast({
      title: `${categoryName} Category`,
      description: `Browsing ${count} ${categoryName.toLowerCase()} listings. Category pages coming soon!`,
    });
    
    // Scroll to featured listings section to show available livestock
    const featuredSection = document.querySelector('#listings');
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover a wide range of livestock categories with thousands of verified listings
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {livestockCategories.map((category, index) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name, category.count)}
              className="bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:border-primary-500 cursor-pointer group transform hover:scale-105"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl mb-3">{category.icon}</div>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{category.name}</h3>
              <p className="text-xl font-bold text-primary-500 mb-1">{category.count}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
