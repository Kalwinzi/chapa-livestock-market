
import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-green-700">Chapa Farm</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#categories" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Categories
              </a>
              <a href="#listings" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Listings
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </nav>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
            <Button size="sm" className="bg-green-700 hover:bg-green-800">
              Post Listing
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium">
                Home
              </a>
              <a href="#categories" className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium">
                Categories
              </a>
              <a href="#listings" className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium">
                Listings
              </a>
              <a href="#about" className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium">
                Contact
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
                <Button size="sm" className="w-full bg-green-700 hover:bg-green-800">
                  Post Listing
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
