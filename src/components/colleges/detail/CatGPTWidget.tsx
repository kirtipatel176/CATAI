"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, AlertCircle } from 'lucide-react';

interface CatGPTWidgetProps {
  collegeId: string;
  collegeName: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function CatGPTWidget({ collegeId, collegeName }: CatGPTWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Hi! I'm CatGPT. Ask me anything about ${collegeName}.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          collegeId,
          context: collegeName
        })
      });

      if (!response.ok) {
        throw new Error('Failed to connect to CatGPT');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Add a placeholder message for the assistant
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.content += chunkValue;
          return newMessages;
        });
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-apple-soft overflow-hidden flex flex-col h-[400px]">
      <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
        <div className="h-10 w-10 rounded-[14px] bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-600">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">CatGPT Assistant</h3>
          <p className="text-xs text-slate-500">AI trained on {collegeName} data</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-[20px] px-4 py-2.5 text-[15px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-[6px]' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-[6px]'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-[20px] px-4 py-3.5 bg-white border border-slate-200 shadow-sm rounded-bl-[6px] flex gap-1.5 items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center my-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100 shadow-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${collegeName}...`}
            className="w-full pl-4 pr-12 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 text-sm text-slate-800 placeholder:text-slate-400 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2.5 rounded-[10px] btn-primary-gradient shadow-sm disabled:opacity-50 disabled:grayscale transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
