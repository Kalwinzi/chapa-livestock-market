
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X, Send, MessageCircle, User } from 'lucide-react';

interface Message {
  id: number;
  sender: 'buyer' | 'seller';
  text: string;
  timestamp: Date;
}

interface ChatSystemProps {
  isOpen: boolean;
  onClose: () => void;
  sellerName: string;
  livestock?: any;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ isOpen, onClose, sellerName, livestock }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'seller',
      text: `Hello! I'm ${sellerName}. Thank you for your interest in my livestock. How can I help you?`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: 'buyer',
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate seller response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you shortly.",
        "Great question! Let me provide you with more details.",
        "I'm available to discuss this further. What specific information do you need?",
        "That sounds good! When would you like to arrange a visit?"
      ];
      
      const sellerResponse: Message = {
        id: messages.length + 2,
        sender: 'seller',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, sellerResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg h-[600px] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary-500" />
            <div>
              <CardTitle className="text-lg">Chat with {sellerName}</CardTitle>
              {livestock && <p className="text-sm text-muted-foreground">{livestock.name}</p>}
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'buyer'
                      ? 'bg-primary-500 text-white'
                      : 'bg-accent-100 dark:bg-accent-800 text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs font-medium">
                      {message.sender === 'buyer' ? 'You' : sellerName}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-primary-500 hover:bg-primary-600 text-white"
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
