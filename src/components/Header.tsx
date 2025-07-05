
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X, Sun, Moon, LogOut, Settings, Crown, Globe, Coins } from 'lucide-react';
import AuthModal from './AuthModal';
import AdminPanel from './AdminPanel';

const Header = () => {
  const { user, signOut, isAdmin } = useAuth();
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const piBalance = "1.00"; // This would come from user data in real app

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleLogout = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
        {/* Pi Balance Bar */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Coins className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="font-medium">{t('balance')}: {piBalance} Pi</span>
                <span className="text-muted-foreground">({t('payment.rate')})</span>
              </div>
              <div className="text-muted-foreground">
                {t('hero.trusted')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                ChapaMarket
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('search')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.search')}
              </button>
              <button 
                onClick={() => scrollToSection('sell')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.sell')}
              </button>
              <button 
                onClick={() => scrollToSection('livestock')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.market')}
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {t('nav.learn')}
              </button>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-1"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">{languages.find(l => l.code === language)?.flag}</span>
                </Button>
                
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-accent flex items-center space-x-2 ${
                          language === lang.code ? 'bg-accent' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  {user.user_metadata?.premium_status && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {user.user_metadata?.first_name || user.email}
                  </span>
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAdminPanelOpen(true)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {t('admin.title')}
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  {t('nav.signup')}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-foreground hover:text-primary transition-colors text-left font-medium"
                >
                  {t('nav.home')}
                </button>
                <button 
                  onClick={() => scrollToSection('search')}
                  className="text-foreground hover:text-primary transition-colors text-left font-medium"
                >
                  {t('nav.search')}
                </button>
                <button 
                  onClick={() => scrollToSection('sell')}
                  className="text-foreground hover:text-primary transition-colors text-left font-medium"
                >
                  {t('nav.sell')}
                </button>
                <button 
                  onClick={() => scrollToSection('livestock')}
                  className="text-foreground hover:text-primary transition-colors text-left font-medium"
                >
                  {t('nav.market')}
                </button>
                <button 
                  onClick={() => scrollToSection('learn')}
                  className="text-foreground hover:text-primary transition-colors text-left font-medium"
                >
                  {t('nav.learn')}
                </button>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {languages.find(l => l.code === language)?.flag}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleToggleTheme}
                    >
                      {theme === 'dark' ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                      {theme === 'dark' ? 'Light' : 'Dark'}
                    </Button>
                  </div>
                  
                  {user ? (
                    <div className="flex flex-col space-y-2">
                      {isAdmin && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsAdminPanelOpen(true);
                            setIsMenuOpen(false);
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          {t('admin.title')}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('nav.signup')}
                    </Button>
                  )}
                </div>
                
                {/* Mobile Language Dropdown */}
                {isLanguageDropdownOpen && (
                  <div className="pt-2 border-t border-border">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-accent flex items-center space-x-2 rounded ${
                          language === lang.code ? 'bg-accent' : ''
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {isAdmin && (
        <AdminPanel 
          isOpen={isAdminPanelOpen} 
          onClose={() => setIsAdminPanelOpen(false)} 
        />
      )}
    </>
  );
};

export default Header;
