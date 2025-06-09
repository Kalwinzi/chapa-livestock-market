
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Send, MessageSquare, User } from 'lucide-react';

const AdminChatSystem: React.FC = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const fetchConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(first_name, last_name, email),
          receiver:receiver_id(first_name, last_name, email),
          livestock:livestock_id(name, image_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group messages by conversation (sender + receiver + livestock)
      const conversationMap = new Map();
      data?.forEach(message => {
        const key = `${message.sender_id}-${message.receiver_id}-${message.livestock_id}`;
        if (!conversationMap.has(key)) {
          conversationMap.set(key, {
            id: key,
            lastMessage: message,
            participants: [message.sender, message.receiver],
            livestock: message.livestock,
            unreadCount: 0
          });
        }
      });

      setConversations(Array.from(conversationMap.values()));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch conversations",
        variant: "destructive"
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const [senderId, receiverId, livestockId] = conversationId.split('-');
      
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(first_name, last_name, email),
          receiver:receiver_id(first_name, last_name, email)
        `)
        .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`)
        .eq('livestock_id', livestockId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive"
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user) return;

    try {
      setLoading(true);
      const [senderId, receiverId, livestockId] = selectedConversation.id.split('-');

      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id: user.id === senderId ? receiverId : senderId,
          livestock_id: livestockId,
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage('');
      await fetchMessages(selectedConversation.id);
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Admin Chat System</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[500px] overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  {conversation.livestock?.image_url ? (
                    <img 
                      src={conversation.livestock.image_url} 
                      alt={conversation.livestock.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {conversation.livestock?.name || 'General Chat'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.participants[0]?.first_name} & {conversation.participants[1]?.first_name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage?.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedConversation 
                ? `Chat: ${selectedConversation.livestock?.name || 'General'}`
                : 'Select a conversation'
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {selectedConversation ? (
              <div className="flex flex-col h-[500px]">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender_id === user?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender_id === user?.id 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.sender?.first_name} • {new Date(message.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
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
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminChatSystem;
