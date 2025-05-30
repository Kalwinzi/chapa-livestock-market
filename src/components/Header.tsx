
import React, { useState } from 'react';
import { Menu, UserPlus, Moon, Sun, Globe, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignUpForm from './SignUpForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'sw', name: 'Kiswahili' }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm shadow-sm border-b border-border">
        {/* Trust Banner */}
        <div className="bg-primary-600 dark:bg-primary-700 text-white py-1.5">
          <div className="container-custom">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium">
                🛡️ {t('hero.trusted')}
              </p>
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-lg sm:text-xl">C</span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
                    ChapaMarket
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">Africa's Livestock Platform</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <div className="flex items-center space-x-6">
                <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                  {t('nav.home')}
                </a>
                <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                  {t('nav.about')}
                </a>
                <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('#features'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                  {t('nav.features')}
                </a>
                <a href="#how-it-works" onClick={(e) => { e.preventDefault(); handleNavClick('#how-it-works'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                  {t('nav.how')}
                </a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                  {t('nav.contact')}
                </a>
              </div>
            </nav>

            {/* Right side controls */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-border hover:scale-105 transition-transform">
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">{languageOptions.find(lang => lang.code === language)?.name || 'EN'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {languageOptions.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      onClick={() => setLanguage(lang.code as any)}
                      className="hover:bg-accent transition-colors"
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="border-border hover:scale-105 transition-transform"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsSignUpOpen(true)}
                className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:scale-105 transition-all"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {t('nav.signup')}
              </Button>
              
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                📱 Download App
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="border-border p-2"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden animate-slide-down bg-background border-t border-border">
              <div className="px-2 pt-2 pb-4 space-y-1">
                <a 
                  href="#home" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.home')}
                </a>
                <a 
                  href="#about" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.about')}
                </a>
                <a 
                  href="#features" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#features'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.features')}
                </a>
                <a 
                  href="#how-it-works" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#how-it-works'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.how')}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.contact')}
                </a>
                
                {/* Mobile Language Selector */}
                <div className="px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full border-border">
                        <Globe className="h-4 w-4 mr-2" />
                        {languageOptions.find(lang => lang.code === language)?.name || 'EN'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {languageOptions.map((lang) => (
                        <DropdownMenuItem 
                          key={lang.code} 
                          onClick={() => setLanguage(lang.code as any)}
                        >
                          {lang.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="px-3 py-2 space-y-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {setIsSignUpOpen(true); setIsMenuOpen(false);}}
                    className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('nav.signup')}
                  </Button>
                  <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                    📱 Download App
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <SignUpForm isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
    </>
  );
};

export default Header;
