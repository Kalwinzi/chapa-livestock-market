
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: 'Home',
    livestock: 'Livestock',
    stories: 'Stories',
    premium: 'Premium',
    login: 'Login',
    logout: 'Logout',
    admin: 'Admin',
    search: 'Search...',
    welcome: 'Welcome to ChapaMarket',
    description: 'Your trusted livestock marketplace',
    featured: 'Featured Livestock',
    community: 'Community Stories',
    price: 'Price',
    location: 'Location',
    breed: 'Breed',
    available: 'Available',
    contact: 'Contact Seller',
    readMore: 'Read More',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    english: 'English',
    kiswahili: 'Kiswahili'
  },
  sw: {
    home: 'Nyumbani',
    livestock: 'Mifugo',
    stories: 'Hadithi',
    premium: 'Kiwango cha Juu',
    login: 'Ingia',
    logout: 'Toka',
    admin: 'Msimamizi',
    search: 'Tafuta...',
    welcome: 'Karibu ChapaMarket',
    description: 'Soko lako la kuaminika la mifugo',
    featured: 'Mifugo Iliyoangaziwa',
    community: 'Hadithi za Jamii',
    price: 'Bei',
    location: 'Mahali',
    breed: 'Aina',
    available: 'Inapatikana',
    contact: 'Wasiliana na Muuzaji',
    readMore: 'Soma Zaidi',
    lightMode: 'Hali ya Mwanga',
    darkMode: 'Hali ya Giza',
    english: 'Kiingereza',
    kiswahili: 'Kiswahili'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('chapamarket-language') as 'en' | 'sw';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'sw') => {
    setLanguage(lang);
    localStorage.setItem('chapamarket-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
