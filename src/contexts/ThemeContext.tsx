
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'ha'; // English and Hausa

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'hero.title': 'Buy & Sell Premium Livestock Across Africa',
    'hero.subtitle': 'Connect with verified farmers and traders. Find quality cattle, goats, sheep, and poultry with secure payments, location tracking, and expert verification.',
    'hero.browse': 'Browse Livestock',
    'hero.demo': 'Watch Demo',
    'hero.farmers': 'Farmers Connected',
    'hero.livestock': 'Livestock Listed',
    'hero.countries': 'Countries',
    'hero.trusted': "Africa's Most Trusted Livestock Platform",
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.how': 'How It Works',
    'nav.contact': 'Contact',
    'nav.signup': 'Sign Up',
    'nav.list': 'List Your Livestock'
  },
  ha: {
    'hero.title': 'Saya da Sayar da Kyawawan Dabbobi A Duk Afirka',
    'hero.subtitle': 'Haɗu da manoman da \'yan kasuwa da aka tabbata. Nemo dabbobi masu inganci da tsaro, biyan kuɗi, da tabbatar da ƙwararru.',
    'hero.browse': 'Bincika Dabbobi',
    'hero.demo': 'Kalli Demo',
    'hero.farmers': 'Manoma Da Aka Haɗa',
    'hero.livestock': 'Dabbobi Da Aka Jera',
    'hero.countries': 'Ƙasashe',
    'hero.trusted': 'Mafi Aminci Dabbobi Platform A Afirka',
    'nav.home': 'Gida',
    'nav.about': 'Game Da Mu',
    'nav.features': 'Abubuwan Da Muke',
    'nav.how': 'Yadda Ake Yi',
    'nav.contact': 'Tuntuɓe Mu',
    'nav.signup': 'Shiga',
    'nav.list': 'Jera Dabbobin Ka'
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const savedLanguage = localStorage.getItem('language') as Language;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <ThemeContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
