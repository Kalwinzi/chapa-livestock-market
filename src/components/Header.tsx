
import React, { useState } from 'react';
import { Menu, UserPlus, Moon, Sun, Globe, X, Search, Bell, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import SignUpForm from './SignUpForm';
import NotificationSystem from './NotificationSystem';
import AdminPanel from './AdminPanel';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, toggleTheme, language, setLanguage, t } = useTheme();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' },
    { code: 'pt', name: 'Português' },
    { code: 'sw', name: 'Kiswahili' }
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Matokeo ya Utafutaji",
        description: `Kutafuta "${searchTerm}" katika orodha za mifugo...`,
      });
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Umetoka",
        description: "Umetoka kikamilifu",
      });
    } catch (error) {
      toast({
        title: "Hitilafu",
        description: "Kuna tatizo limetokea",
        variant: "destructive"
      });
    }
  };

  const handleSocialSignUp = (provider: string) => {
    toast({
      title: `${provider} Sign Up`,
      description: `Uthibitisho wa ${provider} utapatikana hivi karibuni...`,
    });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xl font-bold gradient-text">ChapaMarket</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                {t('nav.home')}
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                {t('nav.about')}
              </a>
              <a href="#categories" onClick={(e) => { e.preventDefault(); handleNavClick('#categories'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                Vikundi
              </a>
              <a href="#features" onClick={(e) => { e.preventDefault(); handleNavClick('#features'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                {t('nav.features')}
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} className="text-sm font-medium text-foreground hover:text-primary-500 px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent">
                {t('nav.contact')}
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Tafuta mifugo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-48"
                    autoFocus
                  />
                  <Button type="submit" variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="text-muted-foreground hover:text-foreground">
                  <Search className="h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <NotificationSystem />
              <Button 
                onClick={() => setShowAdmin(true)}
                variant="ghost" 
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Admin
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Akaunti</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background border border-border shadow-lg">
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Toka
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">Ingia</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border border-border shadow-lg">
                      <DropdownMenuItem onClick={() => setIsSignUpOpen(true)}>
                        Ingia kwa Barua Pepe
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSocialSignUp('Google')}>
                        Endelea na Google
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSocialSignUp('Facebook')}>
                        Endelea na Facebook
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button size="sm" className="bg-primary-500 hover:bg-primary-600" onClick={() => setIsSignUpOpen(true)}>
                    Anza
                  </Button>
                </>
              )}
            </div>

            <div className="lg:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <NotificationSystem />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-foreground" />
                ) : (
                  <Menu className="h-6 w-6 text-foreground" />
                )}
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Tafuta mifugo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                  autoFocus
                />
                <Button type="submit" variant="ghost" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            </div>
          )}

          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-slide-down">
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
                  href="#categories" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#categories'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  Vikundi
                </a>
                <a 
                  href="#features" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#features'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.features')}
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }} 
                  className="text-foreground hover:text-primary-500 block px-3 py-3 rounded-md text-base font-medium hover:bg-accent transition-colors"
                >
                  {t('nav.contact')}
                </a>
                
                <div className="px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full border-border">
                        <Globe className="h-4 w-4 mr-2" />
                        {languageOptions.find(lang => lang.code === language)?.name || 'SW'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border border-border">
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
                  {user ? (
                    <Button 
                      onClick={handleSignOut}
                      variant="outline" 
                      size="sm" 
                      className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Toka
                    </Button>
                  ) : (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all"
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Jisajili
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-background border border-border w-full">
                          <DropdownMenuItem onClick={() => {setIsSignUpOpen(true); setIsMobileMenuOpen(false);}}>
                            Jisajili kwa Barua Pepe
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSocialSignUp('Google')}>
                            Endelea na Google
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSocialSignUp('Facebook')}>
                            Endelea na Facebook
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button size="sm" className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold">
                        📱 Pakua App
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <SignUpForm isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
      <AdminPanel isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
    </>
  );
};

export default Header;
