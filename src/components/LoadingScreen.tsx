
import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8 animate-pulse">
          <h1 className="text-5xl font-serif font-bold text-white mb-2 animate-bounce">
            ChapaMarket
          </h1>
          <p className="text-xl text-white/90 animate-fade-in">
            Africa's Most Trusted Livestock Platform
          </p>
        </div>
        
        <div className="w-64 bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-white/80 text-sm">Loading... {progress}%</p>
        
        <div className="mt-8 flex justify-center space-x-4">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-0"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
