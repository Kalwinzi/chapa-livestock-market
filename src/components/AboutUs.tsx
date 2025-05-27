
import React from 'react';
import { CheckCircle, Users, Shield, Globe } from 'lucide-react';

const AboutUs = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-green-700" />,
      title: 'Verified Sellers',
      description: 'All sellers go through our rigorous verification process'
    },
    {
      icon: <Users className="h-8 w-8 text-green-700" />,
      title: 'Community Driven',
      description: 'Built by farmers, for farmers across the African continent'
    },
    {
      icon: <Globe className="h-8 w-8 text-green-700" />,
      title: 'Pan-African Reach',
      description: 'Connecting livestock markets across 15+ African countries'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Revolutionizing Livestock Trade in Africa
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Chapa Farm was born from a simple vision: to create a trusted, transparent marketplace where African farmers and livestock traders could connect, trade, and grow their businesses together.
            </p>
            <p className="text-gray-600 mb-8">
              Founded in 2020 by a team of agricultural experts and technology enthusiasts, we've grown to become Africa's largest online livestock marketplace, serving over 25,000 active users across 15 countries.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-700 mb-1">99.5%</div>
                <div className="text-gray-600">Transaction Success Rate</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-700 mb-1">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=300&h=200&fit=crop"
                alt="African farm"
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop"
                alt="Livestock"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
            </div>
            <div className="space-y-4 mt-8">
              <img
                src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop"
                alt="Happy farmer"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop"
                alt="Farm landscape"
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "To empower African farmers and livestock traders by providing a secure, transparent, and efficient digital marketplace that drives economic growth and food security across the continent."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
