
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CategoryPage from './CategoryPage';

interface Category {
  name: string;
  icon: string;
  count: number;
}

const CategoriesSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Get livestock counts by category
      const { data, error } = await supabase
        .from('livestock')
        .select('category');

      if (error) {
        console.error('Error fetching categories:', error);
        return;
      }

      // Count livestock by category
      const categoryCounts: { [key: string]: number } = {};
      data?.forEach(item => {
        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
      });

      // Define category icons
      const categoryIcons: { [key: string]: string } = {
        'Cattle': '🐄',
        'Goats': '🐐', 
        'Sheep': '🐑',
        'Poultry': '🐓',
        'Pigs': '🐷',
        'Dairy Cows': '🥛',
        'Beef Cattle': '🥩'
      };

      // Create categories array
      const categoriesArray = Object.entries(categoryCounts).map(([name, count]) => ({
        name,
        icon: categoryIcons[name] || '🐾',
        count
      }));

      setCategories(categoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryClick = (categoryName: string, count: number) => {
    toast({
      title: `Kigori cha ${categoryName}`,
      description: `Kutazama orodha ${count} za ${categoryName.toLowerCase()}...`,
    });
    
    setSelectedCategory(categoryName);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    return <CategoryPage category={selectedCategory} onBack={handleBackToCategories} />;
  }

  return (
    <section id="categories" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Vuruga kwa Kigori</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gundua aina mbalimbali za vikundi vya mifugo na maelfu ya orodha zilizohakikiwa
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name, category.count)}
              className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-primary-500 cursor-pointer group transform hover:scale-105"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl mb-4">{category.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{category.name}</h3>
              <p className="text-2xl font-bold text-primary-500 mb-1">{category.count}</p>
              <p className="text-sm text-muted-foreground">Zinapatikana</p>
              <div className="mt-3 text-xs text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Bofya kutazama →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
