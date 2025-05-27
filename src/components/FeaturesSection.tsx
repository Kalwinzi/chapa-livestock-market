
import React from 'react';
import { MapPin, Shield, Users, Mail, Settings } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-sage-800 font-bold text-xl">π</div>,
      title: 'Pi Network Payments',
      description: 'Secure cryptocurrency transactions using Pi Network for seamless, borderless payments across Africa.'
    },
    {
      icon: <MapPin className="h-12 w-12 text-sage-600" />,
      title: 'Location Search',
      description: 'Google Maps integration allows you to find livestock near you and connect with local farmers and traders.'
    },
    {
      icon: <Shield className="h-12 w-12 text-sage-600" />,
      title: 'Verified Sellers',
      description: 'All sellers undergo rigorous verification to ensure authenticity and build trust in every transaction.'
    },
    {
      icon: <Mail className="h-12 w-12 text-sage-600" />,
      title: 'Secure Chat',
      description: 'Built-in messaging system for safe communication between buyers and sellers with transaction history.'
    },
    {
      icon: <Users className="h-12 w-12 text-sage-600" />,
      title: 'Community Network',
      description: 'Join a thriving community of farmers, traders, and livestock enthusiasts across 20+ African countries.'
    },
    {
      icon: <Settings className="h-12 w-12 text-sage-600" />,
      title: 'Admin Tools',
      description: 'Comprehensive dashboard for managing listings, tracking sales, and analyzing market trends.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage-700 mb-6">
            Powerful Features for Modern Trading
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Advanced tools and secure systems designed to make livestock trading simple, safe, and profitable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-cream-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up border border-cream-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-sage-700 mb-4 text-center font-serif">
                {feature.title}
              </h3>
              <p className="text-sage-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
