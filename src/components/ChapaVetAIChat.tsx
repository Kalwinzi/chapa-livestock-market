import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, X, Sparkles, Bot, User, Loader2,
  Stethoscope, Crown, DollarSign, Shield, Activity
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type AIMode = 'chat' | 'pricing' | 'health' | 'fraud';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  structured?: any;
}

const MODE_CONFIG: Record<AIMode, { label: string; icon: React.ReactNode; color: string }> = {
  chat: { label: 'Chat', icon: <Bot className="h-3 w-3" />, color: 'bg-accent' },
  pricing: { label: 'Pricing', icon: <DollarSign className="h-3 w-3" />, color: 'bg-green-500' },
  health: { label: 'Health', icon: <Activity className="h-3 w-3" />, color: 'bg-red-500' },
  fraud: { label: 'Fraud Check', icon: <Shield className="h-3 w-3" />, color: 'bg-orange-500' },
};

const SUPABASE_URL = 'https://ngyyteewquucikoptsiz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5neXl0ZWV3cXV1Y2lrb3B0c2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MTA0MTgsImV4cCI6MjA2NDI4NjQxOH0.9koXfs689WX9O0UHIa2RTSfvwFrjoVLH3ChjwPbECJo';

const StructuredPricing: React.FC<{ data: any }> = ({ data }) => (
  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 space-y-2 text-sm">
    <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
      <DollarSign className="h-4 w-4" /> Price Prediction
    </div>
    {data.animal_type && <p><strong>Animal:</strong> {data.animal_type} {data.breed && `(${data.breed})`}</p>}
    <div className="flex gap-4">
      <span className="font-bold text-green-600 dark:text-green-400">
        TSH {data.recommended_price_min_tsh?.toLocaleString()} — {data.recommended_price_max_tsh?.toLocaleString()}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <Badge variant="outline">Confidence: {data.confidence_score}%</Badge>
      {data.market_trend && <Badge variant="outline">Trend: {data.market_trend}</Badge>}
    </div>
    <p className="text-muted-foreground">{data.price_reasoning}</p>
  </div>
);

const StructuredHealth: React.FC<{ data: any }> = ({ data }) => (
  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 space-y-2 text-sm">
    <div className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
      <Activity className="h-4 w-4" /> Health Diagnosis
    </div>
    <Badge className={data.risk_level === 'Critical' || data.risk_level === 'High' ? 'bg-red-500' : data.risk_level === 'Medium' ? 'bg-orange-500' : 'bg-green-500'}>
      Risk: {data.risk_level}
    </Badge>
    {data.possible_diseases?.map((d: any, i: number) => (
      <div key={i} className="border-l-2 border-red-300 pl-2">
        <strong>{d.disease_name}</strong> — <Badge variant="outline">{d.probability}</Badge>
        <p className="text-muted-foreground">{d.description}</p>
      </div>
    ))}
    {data.immediate_actions?.length > 0 && (
      <div><strong>Immediate Actions:</strong>
        <ul className="list-disc ml-4">{data.immediate_actions.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul>
      </div>
    )}
    <p className="text-xs text-muted-foreground italic">⚠️ {data.disclaimer || "Consult a certified veterinarian for confirmation."}</p>
  </div>
);

const StructuredFraud: React.FC<{ data: any }> = ({ data }) => (
  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 space-y-2 text-sm">
    <div className="flex items-center gap-2 font-semibold text-orange-700 dark:text-orange-400">
      <Shield className="h-4 w-4" /> Seller Risk Assessment
    </div>
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold">{data.risk_score}/100</span>
      <Badge className={data.risk_level === 'Critical' || data.risk_level === 'High' ? 'bg-red-500' : data.risk_level === 'Medium' ? 'bg-orange-500' : 'bg-green-500'}>
        {data.risk_level}
      </Badge>
    </div>
    {data.flags?.map((f: any, i: number) => (
      <div key={i} className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">{f.flag_type.replace(/_/g, ' ')}</Badge>
        <span className="text-muted-foreground">{f.description}</span>
      </div>
    ))}
    {data.recommendations?.length > 0 && (
      <div><strong>Safety Tips:</strong>
        <ul className="list-disc ml-4">{data.recommendations.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
      </div>
    )}
  </div>
);

const ChapaVetAIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AIMode>('chat');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language, t } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleError = (status: number) => {
    if (status === 429) {
      toast({ title: "Rate Limited", description: "Too many requests. Please wait and try again.", variant: "destructive" });
      return true;
    }
    if (status === 402) {
      toast({ title: "Service Unavailable", description: "AI service temporarily unavailable.", variant: "destructive" });
      return true;
    }
    return false;
  };

  const streamChat = async (userMessages: Message[]) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/chapavet-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ messages: userMessages.map(m => ({ role: m.role, content: m.content })), language, mode, debug: false }),
      });

      if (!response.ok) {
        if (handleError(response.status)) return;
        throw new Error('Failed to get response');
      }

      // Structured (non-streaming) modes
      if (mode !== 'chat') {
        const result = await response.json();
        const toolData = result.tool_calls?.[0]?.data;
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: result.content || '', 
          structured: toolData ? { type: result.tool_calls[0].name, data: toolData } : undefined 
        }]);
        return;
      }

      // Streaming chat mode
      if (!response.body) throw new Error('No response body');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantContent = '';
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
                const msgs = [...prev];
                msgs[msgs.length - 1] = { role: 'assistant', content: assistantContent };
                return msgs;
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
      toast({ title: "Error", description: "Failed to get response. Please try again.", variant: "destructive" });
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const quickQuestions: Record<AIMode, string[]> = {
    chat: [
      language === 'sw' ? 'Dalili za ugonjwa wa mifugo' : 'Common cattle disease symptoms',
      language === 'sw' ? 'Lishe ya mbuzi' : 'Goat feeding tips',
    ],
    pricing: [
      'How much is a 3-year-old Holstein cow worth in Arusha?',
      'Fair price for 10 broiler chickens in Dar es Salaam?',
    ],
    health: [
      'My cow has fever, loss of appetite and is limping',
      'Chickens have watery droppings and swollen eyes',
    ],
    fraud: [
      'Seller offers 5 cows at 50% below market price',
      'Is this listing with stock photos trustworthy?',
    ],
  };

  const renderStructured = (msg: Message) => {
    if (!msg.structured) return null;
    const { type, data } = msg.structured;
    if (type === 'predict_livestock_price') return <StructuredPricing data={data} />;
    if (type === 'diagnose_livestock_health') return <StructuredHealth data={data} />;
    if (type === 'assess_seller_risk') return <StructuredFraud data={data} />;
    return null;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group ${isOpen ? 'hidden' : 'flex'} bg-gradient-to-br from-primary to-accent animate-pulse-glow`}
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

      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-6rem)] shadow-2xl animate-scale-in-bounce border-2 border-accent/30 flex flex-col">
          <CardHeader className="pb-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-foreground/20 rounded-full animate-float">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {t('chapavet.title')} <Crown className="h-4 w-4 text-accent animate-bounce-soft" />
                  </CardTitle>
                  <p className="text-xs text-primary-foreground/80">{t('chapavet.subtitle')}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Mode selector */}
            <div className="flex gap-1 mt-2">
              {(Object.entries(MODE_CONFIG) as [AIMode, typeof MODE_CONFIG['chat']][]).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all ${
                    mode === key ? 'bg-primary-foreground text-primary' : 'bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30'
                  }`}
                >
                  {cfg.icon} {cfg.label}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="flex flex-col flex-1 min-h-0 p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="text-center py-6 animate-fade-in">
                  <div className="p-4 bg-accent/10 rounded-full inline-flex mb-3 animate-float-slow">
                    <Bot className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="font-semibold text-base mb-1">{t('chapavet.title')}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {mode === 'pricing' ? 'Get AI-powered livestock price predictions' 
                      : mode === 'health' ? 'Describe symptoms for AI health diagnosis'
                      : mode === 'fraud' ? 'Check seller or listing trustworthiness'
                      : language === 'sw' ? 'Karibu! Ninaweza kukusaidia kuhusu afya ya mifugo.' : 'Welcome! Ask me about livestock health, pricing, or safety.'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {quickQuestions[mode].map((q, i) => (
                      <Button key={i} variant="outline" size="sm" className="text-xs hover:bg-accent/20" onClick={() => setInput(q)}>
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex items-start gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-2 rounded-full flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                        {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`rounded-2xl px-4 py-3 max-w-[80%] space-y-2 ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm'}`}>
                        {msg.content && (msg.role === 'assistant' ? (
                          <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{msg.content}</p>
                        ))}
                        {renderStructured(msg)}
                      </div>
                    </div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === 'user' && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-accent text-accent-foreground"><Bot className="h-4 w-4" /></div>
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3"><Loader2 className="h-4 w-4 animate-spin" /></div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            <div className="p-3 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={mode === 'pricing' ? 'Describe animal for pricing...' : mode === 'health' ? 'Describe symptoms...' : mode === 'fraud' ? 'Describe listing/seller...' : language === 'sw' ? 'Andika swali lako...' : 'Ask about your livestock...'}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
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
