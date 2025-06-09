
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, User, Settings, LogOut, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import AdminPanel from './AdminPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const { t, theme, toggleTheme } = useTheme();
  const { user, signOut, isAdmin } = useAuth();

  // Auto-open admin panel for admin user after login
  useEffect(() => {
    if (user?.email === 'kalwinzic@gmail.com' && isAdmin) {
      // Small delay to ensure auth state is fully settled
      const timer = setTimeout(() => {
        setIsAdminPanelOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [user, isAdmin]);

  const navigationItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#categories', label: t('nav.categories') },
    { href: '#features', label: t('nav.features') },
    { href: '#stories', label: t('nav.stories') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      setIsAdminPanelOpen(false); // Close admin panel on logout
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <h1 className="text-xl font-bold text-primary-500">ChapaMarket</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-muted-foreground hover:text-primary-500 transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavClick('#categories')}
                className="text-muted-foreground hover:text-primary-500"
              >
                <Search className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary-500"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>

              {user ? (
                <div className="flex items-center space-x-2">
                  {isAdmin && user.email === 'kalwinzic@gmail.com' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAdminPanelOpen(true)}
                      className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  <div className="flex items-center space-x-2 px-3 py-1 bg-accent rounded-lg">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {isAdmin && user.email === 'kalwinzic@gmail.com' 
                        ? 'Admin' 
                        : user.user_metadata?.first_name || user.email?.split('@')[0]
                      }
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-muted-foreground hover:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  {t('auth.signIn')}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left text-muted-foreground hover:text-primary-500 transition-colors py-2 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="text-muted-foreground hover:text-primary-500"
                    >
                      {theme === 'dark' ? '☀️' : '🌙'}
                    </Button>
                  </div>
                  
                  {user ? (
                    <div className="space-y-3">
                      {isAdmin && user.email === 'kalwinzic@gmail.com' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsAdminPanelOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Button>
                      )}
                      <div className="flex items-center space-x-2 px-3 py-2 bg-accent rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {isAdmin && user.email === 'kalwinzic@gmail.com' 
                            ? 'Administrator' 
                            : user.user_metadata?.first_name || user.email?.split('@')[0]
                          }
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="w-full text-red-500 hover:text-red-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                    >
                      {t('auth.signIn')}
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)} 
      />
    </>
  );
};

export default Header;
