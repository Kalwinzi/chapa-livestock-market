
import React from 'react';
import { UserPlus, Upload, ShoppingCart, Send } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-12 w-12 text-green-700" />,
      title: 'Create Account',
      description: 'Sign up for free and verify your identity to join our trusted community of buyers and sellers.'
    },
    {
      icon: <Upload className="h-12 w-12 text-green-700" />,
      title: 'Post Listings',
      description: 'Upload photos and details of your livestock. Our verification team ensures quality listings.'
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-green-700" />,
      title: 'Buy & Sell',
      description: 'Connect with buyers or sellers, negotiate prices, and complete transactions securely.'
    },
    {
      icon: <Send className="h-12 w-12 text-green-700" />,
      title: 'Safe Delivery',
      description: 'Arrange pickup or delivery through our network of trusted transport partners.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How Chapa Farm Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of farmers and traders who trust our platform for safe, secure livestock transactions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-green-200 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-3 h-3 bg-green-200 rounded-full"></div>
                  </div>
                )}
                <div className="absolute -top-2 -left-2 bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-green-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-6">Join our community today and discover the easiest way to buy and sell livestock in Africa</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Selling
            </button>
            <button className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Livestock
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
