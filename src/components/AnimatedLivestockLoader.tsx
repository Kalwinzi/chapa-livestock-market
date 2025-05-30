
import React from 'react';

const AnimatedLivestockLoader = () => {
  const animals = ['🐄', '🐐', '🐑', '🐔', '🐷'];
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {animals.map((animal, index) => (
            <div
              key={index}
              className="text-4xl animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '1s'
              }}
            >
              {animal}
            </div>
          ))}
        </div>
        <div className="text-primary-500 font-semibold text-lg mb-2">ChapaMarket</div>
        <div className="text-muted-foreground">Loading premium livestock...</div>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLivestockLoader;
