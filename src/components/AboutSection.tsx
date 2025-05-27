
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage-700 mb-8">
            Empowering Africa's Livestock Community
          </h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-sage-600 leading-relaxed mb-8">
            ChapaMarket bridges the gap between rural livestock farmers and urban markets across Africa. 
            Our platform empowers thousands of farmers and traders to connect, trade, and prosper through 
            secure transactions, verified seller profiles, and innovative payment solutions including Pi Network integration.
          </p>
          <p className="text-lg text-sage-600 leading-relaxed">
            We believe in transparency, trust, and economic empowerment. By providing farmers with direct 
            access to buyers and modern trading tools, we're revolutionizing how livestock commerce happens 
            across the African continent.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
