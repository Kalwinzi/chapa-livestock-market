
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'fr' | 'ar' | 'pt' | 'sw'; // English, French, Arabic, Portuguese, Swahili

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
    'hero.subtitle': 'Connect with verified farmers and traders. Find quality cattle, goats, sheep, and poultry with Pi Coin payments and expert verification.',
    'hero.browse': 'Browse Livestock',
    'hero.demo': 'Watch Demo',
    'hero.farmers': 'Farmers Connected',
    'hero.livestock': 'Livestock Listed',
    'hero.countries': 'Countries',
    'hero.trusted': "Africa's Most Trusted Livestock Platform",
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Pay with Pi Coin',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.how': 'How It Works',
    'nav.contact': 'Contact',
    'nav.signup': 'Sign Up',
    'nav.list': 'List Your Livestock'
  },
  fr: {
    'hero.title': 'Acheter et Vendre du Bétail Premium à Travers l\'Afrique',
    'hero.subtitle': 'Connectez-vous avec des agriculteurs et commerçants vérifiés. Trouvez du bétail de qualité avec des paiements sécurisés et une vérification experte.',
    'hero.browse': 'Parcourir le Bétail',
    'hero.demo': 'Voir la Démo',
    'hero.farmers': 'Agriculteurs Connectés',
    'hero.livestock': 'Bétail Répertorié',
    'hero.countries': 'Pays',
    'hero.trusted': 'Plateforme de Bétail la Plus Fiable d\'Afrique',
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.features': 'Fonctionnalités',
    'nav.how': 'Comment Ça Marche',
    'nav.contact': 'Contact',
    'nav.signup': 'S\'inscrire',
    'nav.list': 'Lister Votre Bétail'
  },
  ar: {
    'hero.title': 'شراء وبيع الماشية المتميزة عبر أفريقيا',
    'hero.subtitle': 'تواصل مع المزارعين والتجار المعتمدين. اعثر على الماشية عالية الجودة مع المدفوعات الآمنة والتحقق من الخبراء.',
    'hero.browse': 'تصفح الماشية',
    'hero.demo': 'مشاهدة العرض التوضيحي',
    'hero.farmers': 'المزارعون المتصلون',
    'hero.livestock': 'الماشية المدرجة',
    'hero.countries': 'البلدان',
    'hero.trusted': 'منصة الماشية الأكثر موثوقية في أفريقيا',
    'nav.home': 'الرئيسية',
    'nav.about': 'حولنا',
    'nav.features': 'الميزات',
    'nav.how': 'كيف يعمل',
    'nav.contact': 'اتصل بنا',
    'nav.signup': 'التسجيل',
    'nav.list': 'أدرج ماشيتك'
  },
  pt: {
    'hero.title': 'Comprar e Vender Gado Premium em Toda a África',
    'hero.subtitle': 'Conecte-se com agricultores e comerciantes verificados. Encontre gado de qualidade com pagamentos seguros e verificação especializada.',
    'hero.browse': 'Explorar Gado',
    'hero.demo': 'Ver Demo',
    'hero.farmers': 'Agricultores Conectados',
    'hero.livestock': 'Gado Listado',
    'hero.countries': 'Países',
    'hero.trusted': 'Plataforma de Gado Mais Confiável da África',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.features': 'Recursos',
    'nav.how': 'Como Funciona',
    'nav.contact': 'Contato',
    'nav.signup': 'Cadastrar',
    'nav.list': 'Listar Seu Gado'
  },
  sw: {
    'hero.title': 'Nunua na Uza Mifugo Bora Kote Afrika',
    'hero.subtitle': 'Unganisha na wakulima na wafanyabiashara walioidhinishwa. Pata mifugo ya ubora na malipo ya Pi Coin na uthibitisho wa wataalamu.',
    'hero.browse': 'Tazama Mifugo',
    'hero.demo': 'Ona Onyesho',
    'hero.farmers': 'Wakulima Wameunganishwa',
    'hero.livestock': 'Mifugo Iliyoorodheshwa',
    'hero.countries': 'Nchi',
    'hero.trusted': 'Jukwaa la Mifugo Linalotegemewa Zaidi Afrika',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Lipa kwa Pi Coin',
    'payment.rate': '1 Pi = TSH 314,159',
    'nav.home': 'Nyumbani',
    'nav.about': 'Kuhusu',
    'nav.features': 'Vipengele',
    'nav.how': 'Jinsi Inavyofanya Kazi',
    'nav.contact': 'Wasiliana',
    'nav.signup': 'Jisajili',
    'nav.list': 'Orodhesha Mifugo Yako'
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
    // Set RTL for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
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
