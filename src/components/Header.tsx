import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu } from 'lucide-react';
import AuthModal from './AuthModal';
import AdminPanel from './AdminPanel';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-primary">ChapaMarket</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#search" className="text-sm font-medium hover:text-primary transition-colors">
              Search
            </a>
            <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#premium" className="text-sm font-medium hover:text-primary transition-colors text-yellow-600 font-semibold">
              Premium
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Welcome, {user.user_metadata?.first_name || 'User'}
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
              <Button variant="outline" size="sm" onClick={signOut}>
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
            <a href="#home" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="#search" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Search
            </a>
            <a href="#categories" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#premium" className="block py-2 text-sm font-medium hover:text-primary transition-colors text-yellow-600 font-semibold">
              Premium
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
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
