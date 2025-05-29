
import React, { useState } from 'react';
import { Menu, UserPlus, Moon, Sun, Globe, Bot, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SignUpForm from './SignUpForm';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const { toast } = useToast();

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'zh', name: '中文' }
  ];

  const handleAIAssistant = () => {
    toast({
      title: "AI Assistant",
      description: "Smart livestock assistance coming soon! Stay tuned for intelligent farming support.",
    });
  };

  const handleDownloadApp = () => {
    toast({
      title: "Download App",
      description: "Mobile app launching soon! Get ready for livestock trading on the go.",
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm shadow-lg border-b border-border">
        {/* Trust Banner */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white py-2">
          <div className="container-custom">
            <div className="text-center">
              <p className="text-sm font-medium animate-fade-in">
                {t('hero.trusted')} - Africa's Most Trusted Livestock Platform
              </p>
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="flex items-center justify-between h-14"> {/* Reduced height from h-16 to h-14 */}
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-serif font-bold gradient-text">ChapaMarket</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6"> {/* Reduced spacing */}
                <a href="#home" className="text-foreground hover:text-primary-500 px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent">
                  {t('nav.home')}
                </a>
                <a href="#about" className="text-foreground hover:text-primary-500 px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent">
                  {t('nav.about')}
                </a>
                <a href="#features" className="text-foreground hover:text-primary-500 px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent">
                  {t('nav.features')}
                </a>
                <a href="#guides" className="text-foreground hover:text-primary-500 px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent">
                  Guides
                </a>
                <a href="#contact" className="text-foreground hover:text-primary-500 px-2 py-1 rounded-md text-sm font-medium transition-all duration-300 hover:bg-accent">
                  {t('nav.contact')}
                </a>
              </div>
            </nav>

            {/* Right side controls */}
            <div className="hidden md:flex items-center space-x-3"> {/* Reduced spacing */}
              {/* Country/Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-border hover:scale-105 transition-transform">
                    <Globe className="h-4 w-4 mr-2" />
                    {languageOptions.find(lang => lang.code === language)?.name || 'EN'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
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

              {/* AI Assistant Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleAIAssistant}
                className="border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white hover:scale-105 transition-all"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>

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
              
              {/* Download App Button - Standout Color */}
              <Button 
                size="sm" 
                onClick={handleDownloadApp}
                className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Download App
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="border-border"
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-primary-500 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden animate-slide-down">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border rounded-b-lg shadow-lg">
                <a href="#home" className="text-foreground hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors">
                  {t('nav.home')}
                </a>
                <a href="#about" className="text-foreground hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors">
                  {t('nav.about')}
                </a>
                <a href="#features" className="text-foreground hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors">
                  {t('nav.features')}
                </a>
                <a href="#how-it-works" className="text-foreground hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors">
                  {t('nav.how')}
                </a>
                <a href="#contact" className="text-foreground hover:text-primary-500 block px-3 py-2 rounded-md text-base font-medium hover:bg-accent transition-colors">
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
                
                <div className="px-3 py-2 space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAIAssistant}
                    className="w-full border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white transition-all"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    AI Assistant
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsSignUpOpen(true)}
                    className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t('nav.signup')}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleDownloadApp}
                    className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download App
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
