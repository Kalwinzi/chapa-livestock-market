
import React from 'react';
import { UserPlus, Upload, ShoppingCart, Send } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-12 w-12 text-sage-600" />,
      title: 'Create Account',
      description: 'Sign up for free and verify your identity to join our trusted community of farmers and traders across Africa.'
    },
    {
      icon: <Upload className="h-12 w-12 text-sage-600" />,
      title: 'List Livestock',
      description: 'Upload high-quality photos and detailed information about your livestock. Our verification team ensures quality listings.'
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-sage-600" />,
      title: 'Connect & Trade',
      description: 'Browse listings, connect with verified sellers, negotiate prices, and complete secure transactions with Pi Network payments.'
    },
    {
      icon: <Send className="h-12 w-12 text-sage-600" />,
      title: 'Safe Delivery',
      description: 'Arrange pickup or delivery through our network of trusted transport partners with real-time tracking.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage-700 mb-6">
            How ChapaMarket Works
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Join thousands of farmers and traders who trust our platform for safe, secure livestock transactions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative mb-8">
                <div className="bg-cream-200 rounded-full p-8 w-32 h-32 mx-auto flex items-center justify-center group-hover:bg-gold-200 transition-all duration-300 shadow-lg">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gold-300 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-3 h-3 bg-gold-400 rounded-full"></div>
                  </div>
                )}
                <div className="absolute -top-2 -left-2 bg-sage-600 text-cream-50 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold font-serif">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-sage-700 mb-4 font-serif">{step.title}</h3>
              <p className="text-sage-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-sage-600 to-earth-600 rounded-3xl p-12 text-center text-cream-50 animate-fade-in">
          <h3 className="text-3xl font-bold font-serif mb-4">Ready to Transform Your Livestock Business?</h3>
          <p className="text-xl mb-8 opacity-90">Join our community today and discover the future of livestock trading in Africa</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold-500 hover:bg-gold-600 text-sage-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Selling
            </button>
            <button className="border-2 border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-sage-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
              Browse Livestock
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
