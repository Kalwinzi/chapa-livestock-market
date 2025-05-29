
import React from 'react';
import { Book, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';

const GuidesSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();
  const { toast } = useToast();

  const guides = [
    {
      id: 1,
      title: 'Cattle Farming Guide',
      description: 'Complete guide to raising healthy cattle in Tanzania',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=400&h=250&fit=crop',
      duration: '45 min read',
      level: 'Beginner',
      topics: ['Feeding', 'Housing', 'Health', 'Breeding']
    },
    {
      id: 2,
      title: 'Goat Management',
      description: 'Best practices for goat farming and dairy production',
      image: 'https://images.unsplash.com/photo-1551916042-8cfde52c26de?w=400&h=250&fit=crop',
      duration: '30 min read',
      level: 'Intermediate',
      topics: ['Nutrition', 'Milking', 'Disease Prevention', 'Marketing']
    },
    {
      id: 3,
      title: 'Poultry Excellence',
      description: 'Modern chicken farming techniques for maximum productivity',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=250&fit=crop',
      duration: '25 min read',
      level: 'Beginner',
      topics: ['Housing', 'Feeding', 'Egg Production', 'Broiler Management']
    },
    {
      id: 4,
      title: 'Sheep Farming',
      description: 'Comprehensive sheep breeding and wool production guide',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop',
      duration: '35 min read',
      level: 'Advanced',
      topics: ['Breeding', 'Wool Quality', 'Grazing', 'Market Analysis']
    },
    {
      id: 5,
      title: 'Fish Farming',
      description: 'Aquaculture techniques for sustainable fish production',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop',
      duration: '40 min read',
      level: 'Intermediate',
      topics: ['Pond Management', 'Fish Health', 'Feeding', 'Harvesting']
    },
    {
      id: 6,
      title: 'Pig Farming',
      description: 'Modern pig farming for commercial success',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=250&fit=crop',
      duration: '30 min read',
      level: 'Intermediate',
      topics: ['Housing', 'Nutrition', 'Breeding', 'Health Management']
    }
  ];

  const handleGuideClick = (guide: any) => {
    toast({
      title: "Guide Opening",
      description: `${guide.title} - Full guide coming soon!`,
    });
  };

  return (
    <section id="guides" className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
            <Book className="inline-block mr-3 h-8 w-8 text-primary-500" />
            Learning Guides & Resources
          </h2>
          <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Master livestock farming with our comprehensive guides written by Tanzania's leading agricultural experts
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
          {guides.map((guide, index) => (
            <Card 
              key={guide.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
              onClick={() => handleGuideClick(guide)}
            >
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {guide.level}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">
                  {guide.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {guide.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {guide.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    Guide
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {guide.topics.map((topic, idx) => (
                      <span 
                        key={idx}
                        className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 px-2 py-1 rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300 group-hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGuideClick(guide);
                  }}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
