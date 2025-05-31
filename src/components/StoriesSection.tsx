
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, User } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  title: string;
  image: string;
  shortDescription: string;
  fullStory: string;
}

const StoriesSection = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      name: "Mzee Masuruzu",
      title: "Traditional Herder with 30+ Years Experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      shortDescription: "A wise traditional herder who has been caring for livestock for over three decades, passing down ancient wisdom to younger generations.",
      fullStory: "Mzee Masuruzu has been a pillar of the livestock community for over 30 years. Starting as a young boy helping his father, he learned the traditional ways of animal husbandry that have been passed down through generations. His deep understanding of animal behavior, seasonal patterns, and natural remedies has made him a respected figure in the community. Through ChapaMarket, he now shares his knowledge with farmers across Africa, helping them improve their livestock care practices. His cattle are known for their exceptional health and productivity, a testament to his time-tested methods."
    },
    {
      id: 2,
      name: "Mh. Hima",
      title: "Local Leader Promoting Sustainable Farming",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      shortDescription: "A passionate community leader dedicated to promoting sustainable livestock farming practices that benefit both farmers and the environment.",
      fullStory: "Mh. Hima has transformed her community's approach to livestock farming by introducing sustainable practices that increase productivity while protecting the environment. As a local leader, she organized training sessions on rotational grazing, water conservation, and organic feed production. Her initiatives have helped over 200 farmers in her region improve their livestock yields by 40% while reducing environmental impact. Through ChapaMarket, she connects with other sustainable farming advocates and continues to expand her network of environmentally conscious farmers across the continent."
    },
    {
      id: 3,
      name: "Bwana Mifugo",
      title: "Animal Doctor & Livestock Care Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      shortDescription: "A dedicated veterinarian who provides essential healthcare services to livestock across rural communities, ensuring animal welfare and productivity.",
      fullStory: "Dr. Mifugo has dedicated his career to improving livestock health in rural communities. With his mobile veterinary clinic, he travels to remote areas providing vaccinations, treatments, and health consultations. His expertise has saved thousands of animals and prevented disease outbreaks that could have devastated local farming communities. He uses ChapaMarket not only to connect with farmers needing his services but also to share preventive care tips and best practices. His work has been instrumental in improving livestock survival rates and overall herd health across multiple regions."
    },
    {
      id: 4,
      name: "John",
      title: "Young Entrepreneur - From 2 Goats to 150+ Animals",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=face",
      shortDescription: "An inspiring young entrepreneur who started with just 2 goats and built a thriving livestock business with over 150 animals.",
      fullStory: "John's journey began five years ago when he purchased his first two goats with savings from his part-time job. Through careful planning, reinvestment of profits, and strategic use of ChapaMarket to buy and sell livestock, he has built an impressive operation with over 150 animals including goats, sheep, and cattle. His success story demonstrates the power of determination and smart business practices. He now mentors other young entrepreneurs and uses ChapaMarket to expand his network and find new markets for his livestock. His business has not only provided financial independence but also created employment opportunities for others in his community."
    }
  ];

  const openStory = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet the inspiring people who are transforming livestock farming across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{story.name}</h3>
                  <p className="text-sm text-primary-500 font-medium mb-3">{story.title}</p>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {story.shortDescription}
                </p>
                
                <Button 
                  onClick={() => openStory(story)}
                  variant="outline" 
                  className="w-full hover:bg-primary-500 hover:text-white transition-colors"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedStory.name}</h2>
                  <p className="text-primary-500 font-medium">{selectedStory.title}</p>
                </div>
              </div>
              <button onClick={closeStory} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-base">
                {selectedStory.fullStory}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
