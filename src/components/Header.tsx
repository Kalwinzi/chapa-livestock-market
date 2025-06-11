
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, Crown } from 'lucide-react';
import AuthModal from './AuthModal';
import AdminPanel from './AdminPanel';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Clear any cached data
      localStorage.removeItem('chapamarket_user');
      sessionStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary-500">ChapaMarket</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('#home')}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('#about')}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('#search')}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Search
            </button>
            <button 
              onClick={() => scrollToSection('#categories')}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Categories
            </button>
            <button 
              onClick={() => scrollToSection('#premium')}
              className="text-sm font-medium hover:text-primary-500 transition-colors text-yellow-600 font-semibold flex items-center gap-1"
            >
              <Crown className="h-4 w-4" />
              Premium
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="text-sm font-medium hover:text-primary-500 transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Welcome, {user.user_metadata?.first_name || user.email?.split('@')[0] || 'User'}
              </span>
              {isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdminPanel(true)}
                  className="text-xs"
                >
                  Admin
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>
              Sign In
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-2">
            <button 
              onClick={() => scrollToSection('#home')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('#about')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors w-full text-left"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('#search')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors w-full text-left"
            >
              Search
            </button>
            <button 
              onClick={() => scrollToSection('#categories')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors w-full text-left"
            >
              Categories
            </button>
            <button 
              onClick={() => scrollToSection('#premium')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors text-yellow-600 font-semibold w-full text-left flex items-center gap-1"
            >
              <Crown className="h-4 w-4" />
              Premium
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="block py-2 text-sm font-medium hover:text-primary-500 transition-colors w-full text-left"
            >
              Contact
            </button>
          </nav>
        </div>
      )}

      {/* Modals */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}

      {showAdminPanel && (
        <AdminPanel 
          isOpen={showAdminPanel} 
          onClose={() => setShowAdminPanel(false)} 
        />
      )}
    </header>
  );
};

export default Header;
