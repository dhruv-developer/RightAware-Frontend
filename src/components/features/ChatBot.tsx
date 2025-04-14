
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, User, Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { franc } from 'franc-min';


type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Rights Navigator. How can I help you with legal information today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
  
    // Language detection
    const langCode = franc(inputMessage);
    const detectedLang = langCode === 'hin' ? 'Hindi' : langCode === 'eng' ? 'English' : 'English'; // Fallback to English
  
    try {
      const res = await fetch('http://localhost:8000/api/ask-rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          situation: inputMessage,
          state: 'Delhi', // You can auto-fill from dropdown/user profile
          language: detectedLang,
        }),
      });
  
      const data = await res.json();
  
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.data || "I'm sorry, I couldn't find legal info for that.",
        sender: 'bot',
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "⚠️ Sorry, I couldn't process your request right now. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-lg bg-legal-blue hover:bg-legal-blue-dark"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] shadow-lg flex flex-col">
      <CardHeader className="bg-legal-blue text-white rounded-t-lg py-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center space-x-2">
          <Bot className="h-5 w-5" />
          <span>Rights Navigator Bot</span>
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={toggleChat} className="text-white hover:bg-legal-blue-dark">
          <X className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start max-w-[80%] space-x-2">
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 bg-legal-blue text-white">
                    <AvatarImage src="/placeholder.svg" alt="AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 bg-trust-purple text-white">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-legal-blue text-white">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your legal rights..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatBot;
