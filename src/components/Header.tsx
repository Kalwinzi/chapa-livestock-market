
import React, { useState, useEffect } from 'react';
import { Menu, X, Search, UserPlus, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft' : 'bg-white/90'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary">ChapaMarket</h1>
              <p className="text-xs text-text-secondary -mt-1">Livestock Marketplace</p>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
              <Input
                type="text"
                placeholder="Search livestock, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary rounded-lg bg-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-text-primary hover:text-primary font-medium transition-colors duration-200">
              Home
            </a>
            <a href="#listings" className="text-text-primary hover:text-primary font-medium transition-colors duration-200">
              Browse
            </a>
            <a href="#how-it-works" className="text-text-primary hover:text-primary font-medium transition-colors duration-200">
              How It Works
            </a>
            <a href="#about" className="text-text-primary hover:text-primary font-medium transition-colors duration-200">
              About
            </a>
            <a href="#contact" className="text-text-primary hover:text-primary font-medium transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
              <UserPlus className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button className="btn-primary">
              List Livestock
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted h-5 w-5" />
            <Input
              type="text"
              placeholder="Search livestock..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 focus:border-primary rounded-lg"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-6 space-y-2 bg-white border-t border-gray-200 rounded-b-lg shadow-soft">
              <a href="#home" className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                Home
              </a>
              <a href="#listings" className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                Browse Livestock
              </a>
              <a href="#how-it-works" className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                How It Works
              </a>
              <a href="#about" className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                About
              </a>
              <a href="#contact" className="block px-4 py-3 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg font-medium transition-all duration-200">
                Contact
              </a>
              <div className="px-4 py-2 space-y-3 border-t border-gray-200 mt-4 pt-4">
                <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
                <Button className="w-full btn-primary">
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
