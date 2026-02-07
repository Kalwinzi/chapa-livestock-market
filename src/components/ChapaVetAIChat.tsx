import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  User, 
  Loader2,
  Stethoscope,
  Crown
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChapaVetAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language, t } = useTheme();
  const { toast } = useToast();

  const SUPABASE_URL = 'https://ngyyteewquucikoptsiz.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neXl0ZWV3cXV1Y2lrb3B0c2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTA0MTgsImV4cCI6MjA2NDI4NjQxOH0.9koXfs689WX9O0UHIa2RTSfvwFrjoVLH3ChjwPbECJo';
  const CHAT_URL = `${SUPABASE_URL}/functions/v1/chapavet-ai`;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessages: Message[]) => {
    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ messages: userMessages, language }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limited",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive"
          });
          return;
        }
        if (response.status === 402) {
          toast({
            title: "Service Unavailable",
            description: "AI service is temporarily unavailable. Please try again later.",
            variant: "destructive"
          });
          return;
        }
        throw new Error('Failed to start stream');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';

      // Add empty assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantContent };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    await streamChat(newMessages);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    language === 'sw' ? 'Dalili za ugonjwa wa mifugo' : 'Common cattle disease symptoms',
    language === 'sw' ? 'Chanjo za kuku' : 'Poultry vaccination schedule',
    language === 'sw' ? 'Bei ya ng\'ombe' : 'Fair price for cattle',
    language === 'sw' ? 'Lishe ya mbuzi' : 'Goat feeding tips',
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${
          isOpen ? 'hidden' : 'flex'
        } bg-gradient-to-br from-primary to-accent animate-pulse-glow`}
      >
        <Stethoscope className="h-6 w-6 text-primary-foreground" />
        <span className="absolute -top-2 -right-2 flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-accent items-center justify-center">
            <Sparkles className="h-3 w-3 text-accent-foreground" />
          </span>
        </span>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-card text-card-foreground rounded-lg shadow-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <Crown className="h-3 w-3 inline mr-1 text-accent" />
          {t('chapavet.title')}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] shadow-2xl animate-scale-in-bounce border-2 border-accent/30">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-foreground/20 rounded-full animate-float">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {t('chapavet.title')}
                    <Crown className="h-4 w-4 text-accent animate-bounce-soft" />
                  </CardTitle>
                  <p className="text-xs text-primary-foreground/80">{t('chapavet.subtitle')}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-[calc(100%-80px)] p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="p-4 bg-accent/10 rounded-full inline-flex mb-4 animate-float-slow">
                    <Bot className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{t('chapavet.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {language === 'sw' 
                      ? 'Karibu! Ninaweza kukusaidia kuhusu afya ya mifugo, ulishaji, na tathmini.'
                      : 'Welcome! I can help with livestock health, feeding, and valuation.'}
                  </p>
                  
                  {/* Quick Questions */}
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">
                      {language === 'sw' ? 'Maswali ya Haraka:' : 'Quick Questions:'}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickQuestions.map((q, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="text-xs hover:bg-accent/20 hover:border-accent transition-all animate-fade-in"
                          style={{ animationDelay: `${i * 100}ms` }}
                          onClick={() => {
                            setInput(q);
                          }}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 animate-fade-in ${
                        msg.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        msg.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted rounded-tl-sm'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-accent text-accent-foreground">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'sw' ? 'Andika swali lako...' : 'Ask about your livestock...'}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChapaVetAIChat;
