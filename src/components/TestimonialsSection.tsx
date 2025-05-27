
import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Amara Okonkwo',
      role: 'Cattle Farmer, Nigeria',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=face',
      quote: "ChapaMarket revolutionized my farming business. I can now reach buyers across West Africa and receive payments through Pi Network. My income has tripled in just six months!"
    },
    {
      name: 'Joseph Mutua',
      role: 'Livestock Trader, Kenya',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: "The verification system gives me confidence in every transaction. I've built lasting relationships with farmers from Uganda to Tanzania through this platform."
    },
    {
      name: 'Fatima Al-Rashid',
      role: 'Goat Breeder, Morocco',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      quote: "The location search feature helped me connect with local buyers I never knew existed. ChapaMarket made selling my goats so much easier and more profitable."
    },
    {
      name: 'Emmanuel Asante',
      role: 'Poultry Farmer, Ghana',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: "From small-scale to commercial farming, ChapaMarket supported my growth every step of the way. The admin tools help me track everything efficiently."
    }
  ];

  return (
    <section className="py-20 bg-cream-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage-700 mb-6">
            Stories from Our Community
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Hear from farmers and traders who have transformed their businesses with ChapaMarket
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-cream-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-cream-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gold-400"
                />
                <div>
                  <h4 className="text-lg font-semibold text-sage-700 font-serif">{testimonial.name}</h4>
                  <p className="text-sage-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-sage-600 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex text-gold-500 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
