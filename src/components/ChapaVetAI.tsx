import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot, User, MessageCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface ChapaVetAIProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const ChapaVetAI: React.FC<ChapaVetAIProps> = ({ isOpen, onClose }) => {
  const { language } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: language === 'sw' 
        ? 'Hujambo! Mimi ni ChapaVet AI, msaidizi wako wa kiufundi wa mifugo. Nitakusaidia kuhusu masuala ya afya ya wanyamapori, chakula, thamani na usimamizi. Je, una swali gani?'
        : 'Hello! I am ChapaVet AI, your professional livestock assistant. I can help you with animal health, feeding, valuation, and management questions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = {
    en: {
      health: "For livestock health issues, I recommend: 1) Regular vaccinations, 2) Clean water access, 3) Proper nutrition, 4) Regular vet checkups. Can you describe specific symptoms?",
      feeding: "Proper feeding includes: 1) High-quality hay/grass, 2) Clean water, 3) Minerals and supplements, 4) Age-appropriate portions. What type of animal are you feeding?",
      price: "Livestock pricing depends on: 1) Breed quality, 2) Age and weight, 3) Health status, 4) Market demand. Current Tanzania market rates vary by region.",
      breeding: "Successful breeding requires: 1) Healthy breeding stock, 2) Proper timing, 3) Good nutrition, 4) Disease prevention. What species are you breeding?",
      default: "I can help with livestock health, nutrition, breeding, pricing, and management. Please ask me a specific question about your animals."
    },
    sw: {
      health: "Kwa masuala ya afya ya mifugo, ninapendekeza: 1) Chanjo za kawaida, 2) Upatikanaji wa maji safi, 3) Lishe bora, 4) Ukaguzi wa kawaida wa daktari wa mifugo. Unaweza kuelezea dalili maalum?",
      feeding: "Kulisha vizuri ni pamoja na: 1) Nyasi/majani ya ubora wa juu, 2) Maji safi, 3) Madini na viongezeo, 4) Vipimo vinavyofaa umri. Unamulisha aina gani ya mnyama?",
      price: "Bei ya mifugo inategemea: 1) Ubora wa aina, 2) Umri na uzito, 3) Hali ya afya, 4) Mahitaji ya soko. Bei za sasa za soko la Tanzania zinatofautiana kwa mkoa.",
      breeding: "Uzazi mzuri unahitaji: 1) Mifugo mizuri ya uzazi, 2) Muda mzuri, 3) Lishe nzuri, 4) Kuzuia magonjwa. Unalea aina gani?",
      default: "Ninaweza kusaidia na afya ya mifugo, lishe, uzazi, bei, na usimamizi. Tafadhali niulize swali maalum kuhusu wanyama wako."
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const responses = aiResponses[language as keyof typeof aiResponses];
    
    if (message.includes('health') || message.includes('sick') || message.includes('disease') || 
        message.includes('afya') || message.includes('mgonjwa') || message.includes('ugonjwa')) {
      return responses.health;
    }
    if (message.includes('feed') || message.includes('food') || message.includes('nutrition') ||
        message.includes('kulisha') || message.includes('chakula') || message.includes('lishe')) {
      return responses.feeding;
    }
    if (message.includes('price') || message.includes('cost') || message.includes('value') ||
        message.includes('bei') || message.includes('gharama') || message.includes('thamani')) {
      return responses.price;
    }
    if (message.includes('breed') || message.includes('reproduction') || message.includes('mating') ||
        message.includes('uzazi') || message.includes('aina') || message.includes('kuzaa')) {
      return responses.breeding;
    }
    
    return responses.default;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: getAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between bg-blue-50 dark:bg-blue-950/30 border-b">
          <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
            <MessageCircle className="h-5 w-5" />
            ChapaVet AI Assistant
            <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">Premium</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-blue-500 text-white'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-primary-100' 
                        : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="border-t p-4 bg-background">
            <div className="flex gap-2">
              <Input
                placeholder={language === 'sw' ? 'Andika ujumbe wako...' : 'Type your message...'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {language === 'sw' 
                ? 'ChapaVet AI ni msaidizi wa AI. Daima shauriana na daktari wa mifugo kwa matibabu makuu.'
                : 'ChapaVet AI is an AI assistant. Always consult a veterinarian for serious medical treatments.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChapaVetAI;