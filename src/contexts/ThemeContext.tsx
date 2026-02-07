
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'sw' | 'fr' | 'ar' | 'zh' | 'rw'; // English, Swahili, French, Arabic, Chinese, Kinyarwanda

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'hero.title': 'Buy & Sell Premium Livestock Across East Africa',
    'hero.subtitle': 'Connect with verified farmers and traders in Tanzania, Kenya, Uganda, Rwanda & Burundi. Pay with Pi Coin (1 Pi = 314,159 TZS).',
    'hero.browse': 'Browse Livestock',
    'hero.demo': 'Watch Demo',
    'hero.farmers': 'Farmers Connected',
    'hero.livestock': 'Livestock Listed',
    'hero.countries': 'Countries',
    'hero.trusted': "East Africa's Most Trusted Livestock Platform",
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Pay with Pi Coin',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.sell': 'Sell',
    'nav.market': 'Market',
    'nav.learn': 'Learn',
    'nav.profile': 'Profile',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.how': 'How It Works',
    'nav.contact': 'Contact',
    'nav.signup': 'Sign Up',
    'nav.list': 'List Your Livestock',
    'premium.unlock': 'Unlock Premium Features',
    'learn.title': 'Livestock Care & Education',
    'learn.guides': 'Care Guides',
    'learn.disease': 'Disease Prevention',
    'learn.ai': 'AI Vet Assistant',
    'learn.videos': 'Video Tutorials',
    'chapavet.title': 'ChapaVet AI Assistant',
    'chapavet.subtitle': 'Ask me about livestock health, feeding, and valuation',
    'admin.title': 'Admin Dashboard',
    'balance': 'Pi Balance',
    'coming.soon': 'Coming Soon',
    'country.supported': 'Available',
    'country.unsupported': 'Coming Soon'
  },
  sw: {
    'hero.title': 'Nunua na Uza Mifugo Bora Afrika Mashariki',
    'hero.subtitle': 'Unganisha na wakulima na wafanyabiashara walioidhinishwa nchini Tanzania, Kenya, Uganda, Rwanda na Burundi. Lipa kwa Pi Coin (1 Pi = 314,159 TZS).',
    'hero.browse': 'Tazama Mifugo',
    'hero.demo': 'Ona Onyesho',
    'hero.farmers': 'Wakulima Wameunganishwa',
    'hero.livestock': 'Mifugo Iliyoorodheshwa',
    'hero.countries': 'Nchi',
    'hero.trusted': 'Jukwaa la Mifugo Linalotegemewa Zaidi Afrika Mashariki',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Lipa kwa Pi Coin',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'Nyumbani',
    'nav.search': 'Tafuta',
    'nav.sell': 'Uza',
    'nav.market': 'Soko',
    'nav.learn': 'Jifunze',
    'nav.profile': 'Wasifu',
    'nav.about': 'Kuhusu',
    'nav.features': 'Vipengele',
    'nav.how': 'Jinsi Inavyofanya Kazi',
    'nav.contact': 'Wasiliana',
    'nav.signup': 'Jisajili',
    'nav.list': 'Orodhesha Mifugo Yako',
    'premium.unlock': 'Fungua Vipengele vya Premium',
    'learn.title': 'Utunzaji wa Mifugo na Elimu',
    'learn.guides': 'Miongozo ya Utunzaji',
    'learn.disease': 'Kuzuia Magonjwa',
    'learn.ai': 'Msaidizi wa AI wa Daktari wa Mifugo',
    'learn.videos': 'Mafunzo ya Video',
    'chapavet.title': 'Msaidizi wa ChapaVet AI',
    'chapavet.subtitle': 'Niulize kuhusu afya ya mifugo, ulishaji, na tathmini',
    'admin.title': 'Dashibodi ya Msimamizi',
    'balance': 'Salio la Pi',
    'coming.soon': 'Inakuja Hivi Karibuni',
    'country.supported': 'Inapatikana',
    'country.unsupported': 'Inakuja Hivi Karibuni'
  },
  fr: {
    'hero.title': 'Acheter et Vendre du Bétail Premium en Afrique de l\'Est',
    'hero.subtitle': 'Connectez-vous avec des agriculteurs et commerçants vérifiés en Tanzanie, Kenya, Ouganda, Rwanda et Burundi. Payez avec Pi Coin (1 Pi = 314,159 TZS).',
    'hero.browse': 'Parcourir le Bétail',
    'hero.demo': 'Voir la Démo',
    'hero.farmers': 'Agriculteurs Connectés',
    'hero.livestock': 'Bétail Répertorié',
    'hero.countries': 'Pays',
    'hero.trusted': 'Plateforme de Bétail la Plus Fiable d\'Afrique de l\'Est',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Payer avec Pi Coin',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'Accueil',
    'nav.search': 'Rechercher',
    'nav.sell': 'Vendre',
    'nav.market': 'Marché',
    'nav.learn': 'Apprendre',
    'nav.profile': 'Profil',
    'nav.about': 'À Propos',
    'nav.features': 'Fonctionnalités',
    'nav.how': 'Comment Ça Marche',
    'nav.contact': 'Contact',
    'nav.signup': 'S\'inscrire',
    'nav.list': 'Lister Votre Bétail',
    'premium.unlock': 'Débloquer les Fonctionnalités Premium',
    'learn.title': 'Soins du Bétail et Éducation',
    'learn.guides': 'Guides de Soins',
    'learn.disease': 'Prévention des Maladies',
    'learn.ai': 'Assistant IA Vétérinaire',
    'learn.videos': 'Tutoriels Vidéo',
    'chapavet.title': 'Assistant ChapaVet AI',
    'chapavet.subtitle': 'Demandez-moi à propos de la santé du bétail, de l\'alimentation et de l\'évaluation',
    'admin.title': 'Tableau de Bord Admin',
    'balance': 'Solde Pi',
    'coming.soon': 'Bientôt Disponible',
    'country.supported': 'Disponible',
    'country.unsupported': 'Bientôt Disponible'
  },
  ar: {
    'hero.title': 'شراء وبيع الماشية المتميزة في شرق أفريقيا',
    'hero.subtitle': 'تواصل مع المزارعين والتجار المعتمدين في تنزانيا وكينيا وأوغندا ورواندا وبوروندي. ادفع بعملة Pi (1 Pi = 314,159 TZS).',
    'hero.browse': 'تصفح الماشية',
    'hero.demo': 'مشاهدة العرض التوضيحي',
    'hero.farmers': 'المزارعون المتصلون',
    'hero.livestock': 'الماشية المدرجة',
    'hero.countries': 'البلدان',
    'hero.trusted': 'منصة الماشية الأكثر موثوقية في شرق أفريقيا',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'واتساب',
    'payment.picoin': 'ادفع بعملة Pi',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'الرئيسية',
    'nav.search': 'بحث',
    'nav.sell': 'بيع',
    'nav.market': 'السوق',
    'nav.learn': 'تعلم',
    'nav.profile': 'الملف الشخصي',
    'nav.about': 'حولنا',
    'nav.features': 'الميزات',
    'nav.how': 'كيف يعمل',
    'nav.contact': 'اتصل بنا',
    'nav.signup': 'التسجيل',
    'nav.list': 'أدرج ماشيتك',
    'premium.unlock': 'فتح الميزات المتميزة',
    'learn.title': 'رعاية الماشية والتعليم',
    'learn.guides': 'أدلة الرعاية',
    'learn.disease': 'الوقاية من الأمراض',
    'learn.ai': 'مساعد الذكاء الاصطناعي البيطري',
    'learn.videos': 'دروس الفيديو',
    'chapavet.title': 'مساعد ChapaVet AI',
    'chapavet.subtitle': 'اسألني عن صحة الماشية والتغذية والتقييم',
    'admin.title': 'لوحة تحكم المدير',
    'balance': 'رصيد Pi',
    'coming.soon': 'قريباً',
    'country.supported': 'متاح',
    'country.unsupported': 'قريباً'
  },
  zh: {
    'hero.title': '在东非买卖优质牲畜',
    'hero.subtitle': '与坦桑尼亚、肯尼亚、乌干达、卢旺达和布隆迪的认证农民和贸易商联系。使用Pi币支付（1 Pi = 314,159 TZS）。',
    'hero.browse': '浏览牲畜',
    'hero.demo': '观看演示',
    'hero.farmers': '已连接农民',
    'hero.livestock': '已列出牲畜',
    'hero.countries': '国家',
    'hero.trusted': '东非最值得信赖的牲畜平台',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': '使用Pi币支付',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': '首页',
    'nav.search': '搜索',
    'nav.sell': '出售',
    'nav.market': '市场',
    'nav.learn': '学习',
    'nav.profile': '个人资料',
    'nav.about': '关于',
    'nav.features': '功能',
    'nav.how': '如何使用',
    'nav.contact': '联系',
    'nav.signup': '注册',
    'nav.list': '列出您的牲畜',
    'premium.unlock': '解锁高级功能',
    'learn.title': '牲畜护理与教育',
    'learn.guides': '护理指南',
    'learn.disease': '疾病预防',
    'learn.ai': 'AI兽医助手',
    'learn.videos': '视频教程',
    'chapavet.title': 'ChapaVet AI助手',
    'chapavet.subtitle': '询问我关于牲畜健康、喂养和估值的问题',
    'admin.title': '管理员仪表板',
    'balance': 'Pi余额',
    'coming.soon': '即将推出',
    'country.supported': '可用',
    'country.unsupported': '即将推出'
  },
  rw: {
    'hero.title': 'Gura no Kugurisha Amatungo Meza muri Afurika y\'Iburasirazuba',
    'hero.subtitle': 'Huza n\'abahinzi n\'abacuruzi bemejwe mu Rwanda, Tanzania, Kenya, Uganda na Burundi. Wishyura na Pi Coin (1 Pi = 314,159 TZS).',
    'hero.browse': 'Reba Amatungo',
    'hero.demo': 'Reba Demo',
    'hero.farmers': 'Abahinzi Bahujwe',
    'hero.livestock': 'Amatungo Yanditswe',
    'hero.countries': 'Ibihugu',
    'hero.trusted': 'Urubuga rw\'Amatungo Rwizewe muri Afurika y\'Iburasirazuba',
    'contact.phone': '+255 763 953 480',
    'contact.whatsapp': 'WhatsApp',
    'payment.picoin': 'Ishyura na Pi Coin',
    'payment.rate': '1 Pi = 314,159 TZS',
    'nav.home': 'Ahabanza',
    'nav.search': 'Shakisha',
    'nav.sell': 'Gurisha',
    'nav.market': 'Isoko',
    'nav.learn': 'Iga',
    'nav.profile': 'Umwirondoro',
    'nav.about': 'Ibyacu',
    'nav.features': 'Ibintu Bikora',
    'nav.how': 'Uko Bikora',
    'nav.contact': 'Twandikire',
    'nav.signup': 'Iyandikishe',
    'nav.list': 'Andika Amatungo Yawe',
    'premium.unlock': 'Fungura Premium',
    'learn.title': 'Kwita ku Matungo n\'Uburezi',
    'learn.guides': 'Amabwiriza y\'Ubuvuzi',
    'learn.disease': 'Kurinda Indwara',
    'learn.ai': 'Umufasha wa AI w\'Ubuvuzi',
    'learn.videos': 'Amasomo ya Video',
    'chapavet.title': 'Umufasha ChapaVet AI',
    'chapavet.subtitle': 'Mbaze ku buzima bw\'amatungo, ifunguro, n\'agaciro',
    'admin.title': 'Ikibanza cy\'Umuyobozi',
    'balance': 'Amafaranga ya Pi',
    'coming.soon': 'Biraza Vuba',
    'country.supported': 'Birahari',
    'country.unsupported': 'Biraza Vuba'
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
    return translations[language][key] || key;
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
