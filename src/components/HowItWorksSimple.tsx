
import React from 'react';
import { Search, Users, Shield, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HowItWorksSimple = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation<HTMLDivElement>();

  const steps = [
    {
      icon: Search,
      title: "Browse Livestock",
      description: "Explore our extensive collection of verified livestock from trusted sellers across Africa.",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Connect with Sellers",
      description: "Fill out our secure contact form to get in touch with verified sellers about livestock you're interested in.",
      color: "bg-green-500"
    },
    {
      icon: Shield,
      title: "Secure Transaction",
      description: "Complete your purchase safely with our verified seller network and buyer protection system.",
      color: "bg-purple-500"
    },
    {
      icon: MessageCircle,
      title: "Ongoing Support",
      description: "Receive continued support from our team for any questions or concerns about your purchase.",
      color: "bg-orange-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-accent-50 dark:bg-gray-900/50">
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
            How ChapaMarket Works
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Your trusted platform for buying and selling premium livestock across Africa
          </p>
        </div>
        
        <div 
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-700 delay-300 ${
            gridVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border group"
            >
              <div className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-primary-50 dark:bg-primary-900/30 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-primary-500">Open Every Day</span> - We're here to help you find the perfect livestock
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSimple;
