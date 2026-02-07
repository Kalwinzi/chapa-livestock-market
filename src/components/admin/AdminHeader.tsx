
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { X, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AdminHeaderProps {
  onClose: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onClose }) => {
  const { signOut, user } = useAuth();
  const { theme, toggleTheme, language, setLanguage } = useTheme();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
    { code: 'rw', name: 'Ikinyarwanda', flag: '🇷🇼' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  return (
    <div className="bg-background border-b border-border p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-foreground">ChapaMarket Admin</h1>
        <span className="text-sm text-muted-foreground">
          Welcome, {user?.email}
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Language Switcher */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="p-2"
          >
            <Globe className="h-4 w-4 mr-1" />
            <span className="text-xs">{languages.find(l => l.code === language)?.flag}</span>
          </Button>
          
          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsLanguageOpen(false);
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
          onClick={toggleTheme}
          className="p-2"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="p-2"
        >
          <LogOut className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;
