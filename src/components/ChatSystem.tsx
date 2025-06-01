
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, X, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender_name?: string;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  receiverId?: string;
  receiverName?: string;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, receiverId, receiverName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && user && receiverId) {
      fetchMessages();
      // Set up real-time subscription
      const channel = supabase
        .channel('messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `sender_id=eq.${user.id},receiver_id=eq.${receiverId}`
          },
          (payload) => {
            const newMessage = payload.new as Message;
            setMessages(prev => [...prev, newMessage]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen, user, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    if (!user || !receiverId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(first_name, last_name)
        `)
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        toast({
          title: "Hitilafu",
          description: "Imeshindikana kupata ujumbe",
          variant: "destructive"
        });
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user || !receiverId) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          content: newMessage,
          sender_id: user.id,
          receiver_id: receiverId
        });

      if (error) {
        toast({
          title: "Hitilafu",
          description: "Imeshindikana kutuma ujumbe",
          variant: "destructive"
        });
      } else {
        setNewMessage('');
        fetchMessages(); // Refresh messages
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Hitilafu",
        description: "Kuna tatizo limetokea",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Ingia kwanza</h3>
            <p className="text-muted-foreground mb-4">
              Unahitaji kuingia ili kuweza kuzungumza na wauuzaji
            </p>
            <Button onClick={onClose}>Sawa</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Mazungumzo na {receiverName || 'Muuzaji'}</span>
          </CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                <p>Hakuna ujumbe bado. Anza mazungumzo!</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender_id === user.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">
                      {new Date(message.created_at).toLocaleTimeString('sw-KE', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Andika ujumbe..."
                className="flex-1"
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !newMessage.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSystem;
