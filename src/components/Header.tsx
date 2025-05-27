
import React, { useState } from 'react';
import { Menu, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-sm shadow-lg border-b border-cream-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold gradient-text">ChapaMarket</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-sage-600 hover:text-sage-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cream-200">
                Home
              </a>
              <a href="#about" className="text-sage-600 hover:text-sage-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cream-200">
                About
              </a>
              <a href="#features" className="text-sage-600 hover:text-sage-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cream-200">
                Features
              </a>
              <a href="#how-it-works" className="text-sage-600 hover:text-sage-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cream-200">
                How It Works
              </a>
              <a href="#contact" className="text-sage-600 hover:text-sage-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-cream-200">
                Contact
              </a>
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-cream-50">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
            <Button size="sm" className="bg-sage-600 hover:bg-sage-700 text-cream-50 shadow-lg">
              List Your Livestock
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-sage-600 hover:text-sage-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-cream-50 border-t border-cream-300 rounded-b-lg shadow-lg">
              <a href="#home" className="text-sage-600 hover:text-sage-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-cream-200 transition-colors">
                Home
              </a>
              <a href="#about" className="text-sage-600 hover:text-sage-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-cream-200 transition-colors">
                About
              </a>
              <a href="#features" className="text-sage-600 hover:text-sage-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-cream-200 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sage-600 hover:text-sage-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-cream-200 transition-colors">
                How It Works
              </a>
              <a href="#contact" className="text-sage-600 hover:text-sage-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-cream-200 transition-colors">
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full border-sage-600 text-sage-600 hover:bg-sage-600 hover:text-cream-50">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
                <Button size="sm" className="w-full bg-sage-600 hover:bg-sage-700 text-cream-50">
                  List Your Livestock
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
