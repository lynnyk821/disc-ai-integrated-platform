import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import axios from "axios";


interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className = "" }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your DISC analysis assistant. I can help you analyze employee data, compare team members, and answer questions about behavioral patterns. What would you like to know?',
      timestamp: new Date()
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const exampleQuestions = [
    "Which team members are highest in Dominance?",
    "Who would work well together on a team?",
    "Show me employees with high Conscientiousness",
    "Which employees have similar profiles?"
  ];

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await axios.post(
          `https://disc-platform-ai-backend.onrender.com/api/assistant/ask`,
          null,
          {
            params: { message: userMessage },
            headers: {
              'Content-Type': 'application/json'
            }
          }
      );

      // Обробляємо різні формати відповіді
      if (typeof response.data === 'string') {
        return response.data;
      } else if (response.data && typeof response.data === 'object') {
        // Якщо бекенд повертає JSON об'єкт
        return JSON.stringify(response.data);
      } else {
        return 'Received unexpected response format from server';
      }
    } catch (error: any) {
      console.error("Error calling assistant API:", error);

      if (error.response?.status === 0) {
        throw new Error("Cannot connect to server. Please check if the backend is running.");
      } else if (error.response?.status === 403) {
        throw new Error("CORS error: Server doesn't allow requests from this origin");
      } else {
        throw new Error("Failed to get response from assistant");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse(input.trim());

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Error: ${error.message || 'Unknown error occurred'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'assistant',
      content: 'Chat cleared! How can I help you analyze your DISC data?',
      timestamp: new Date()
    }]);
  };

  const useExampleQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const formatMessageContent = (content: string) => {
    if (typeof content !== 'string') {
      content = String(content);
    }

    return content
        .split('\n')
        .map((line, index) => {
          if (line.startsWith('**') && line.endsWith('**')) {
            return <div key={index} className="font-medium my-1">{line.slice(2, -2)}</div>;
          }
          if (line.startsWith('• ')) {
            return <div key={index} className="ml-4 my-1">{line}</div>;
          }
          if (line.trim() === '') {
            return <div key={index} className="h-2"></div>;
          }
          return <div key={index} className="my-1">{line}</div>;
        });
  };

  return (
      <Card className={`flex flex-col h-[600px] ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            DISC Analysis Assistant
          </CardTitle>
          <Button variant="outline" size="sm" onClick={clearChat}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Example Questions */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Try these example questions:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.slice(0, 3).map((question, index) => (
                  <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto py-1 px-2"
                      onClick={() => useExampleQuestion(question)}
                  >
                    {question}
                  </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="space-y-4 pr-4">
              {messages.map((message) => (
                  <div
                      key={message.id}
                      className={`flex gap-3 ${
                          message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>

                    <div className={`flex-1 max-w-[80%] ${
                        message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`inline-block p-3 rounded-lg text-sm ${
                          message.type === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                      }`}>
                        {message.type === 'user' ? (
                            message.content
                        ) : (
                            <div className="space-y-1">
                              {formatMessageContent(message.content)}
                            </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
              ))}

              {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block p-3 rounded-lg bg-muted">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about employee comparisons, DISC traits, team dynamics..."
                disabled={isLoading}
                className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              AI Powered
            </Badge>
            {" "}Powered by OpenAI with real-time employee data analysis.
          </div>
        </CardContent>
      </Card>
  );
}