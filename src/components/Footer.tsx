
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowUp, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AdminPanel from './AdminPanel';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to ChapaMarket updates.",
    });
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-sage-800 text-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-3xl font-serif font-bold gradient-text mb-6">ChapaMarket</h3>
              <p className="text-cream-200 mb-6 leading-relaxed">
                Tanzania's premier livestock marketplace empowering farmers and traders across East Africa with secure, innovative trading solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-cream-200 hover:text-gold-400 transition-colors transform hover:scale-110">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-cream-200 hover:text-gold-400 transition-colors transform hover:scale-110">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-cream-200 hover:text-gold-400 transition-colors transform hover:scale-110">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-cream-200 hover:text-gold-400 transition-colors transform hover:scale-110">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-serif">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-cream-200 hover:text-gold-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-cream-200 hover:text-gold-400 transition-colors">About ChapaMarket</a></li>
                <li><a href="#features" className="text-cream-200 hover:text-gold-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-cream-200 hover:text-gold-400 transition-colors">How It Works</a></li>
                <li><a href="#contact" className="text-cream-200 hover:text-gold-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Support & Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-serif">Support & Legal</h4>
              <ul className="space-y-3">
                <li><a href="#contact" className="text-cream-200 hover:text-gold-400 transition-colors">Help Center</a></li>
                <li><a href="#privacy-terms" className="text-cream-200 hover:text-gold-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#privacy-terms" className="text-cream-200 hover:text-gold-400 transition-colors">Terms of Service</a></li>
                <li><a href="#privacy-terms" className="text-cream-200 hover:text-gold-400 transition-colors">About Our Purpose</a></li>
                <li>
                  <button 
                    onClick={() => setIsAdminOpen(true)}
                    className="text-cream-200 hover:text-gold-400 transition-colors flex items-center space-x-1"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Newsletter & Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6 font-serif">Stay Connected</h4>
              <p className="text-cream-200 mb-4">Get updates from Tanzania's livestock market</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-4 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-sage-700 border-sage-600 text-cream-50 placeholder-cream-300 focus:border-gold-400"
                />
                <Button type="submit" className="w-full bg-gold-500 hover:bg-gold-600 text-sage-800 font-semibold">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <p className="text-cream-300">📞 +255 763 953 480</p>
                <p className="text-cream-300">📞 +255 787 224 333</p>
                <p className="text-cream-300">✉️ kalwinzic@gmail.com</p>
                <p className="text-cream-300">📍 Tanzania, East Africa</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-sage-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-cream-300 text-sm text-center md:text-left">
              © 2024 ChapaMarket Tanzania. All rights reserved. Empowering Africa's farmers.
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-cream-300 text-sm">Proudly Tanzanian 🇹🇿</span>
              <button
                onClick={scrollToTop}
                className="bg-gold-500 hover:bg-gold-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
              >
                <ArrowUp className="h-5 w-5 text-sage-800" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </>
  );
};

export default Footer;
