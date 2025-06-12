
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X, Crown, Settings, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import AdminPanel from './AdminPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-primary">ChapaMarket</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('categories')} className="text-foreground hover:text-primary transition-colors">
                Livestock
              </button>
              <button onClick={() => scrollToSection('stories')} className="text-foreground hover:text-primary transition-colors">
                Stories
              </button>
              <button onClick={() => scrollToSection('premium')} className="text-foreground hover:text-primary transition-colors flex items-center">
                <Crown className="h-4 w-4 mr-1" />
                Premium
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
                Contact
              </button>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {user.user_metadata?.first_name || user.email}
                  </span>
                  
                  {isAdmin && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAdminPanelOpen(true)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Admin
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)}>
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection('categories')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
                  Livestock
                </button>
                <button onClick={() => scrollToSection('stories')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
                  Stories
                </button>
                <button onClick={() => scrollToSection('premium')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors flex items-center">
                  <Crown className="h-4 w-4 mr-1" />
                  Premium
                </button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors">
                  Contact
                </button>
                
                {isAdmin && (
                  <button 
                    onClick={() => {
                      setIsAdminPanelOpen(true);
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Admin Panel
                  </button>
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
      
      <AdminPanel 
        isOpen={isAdminPanelOpen} 
        onClose={() => setIsAdminPanelOpen(false)} 
      />
    </>
  );
};

export default Header;
