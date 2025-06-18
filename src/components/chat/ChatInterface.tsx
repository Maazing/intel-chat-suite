
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { WebhookSettings } from './WebhookSettings';
import { Send, Settings, Zap, Target, ShoppingCart, PenTool, Calendar, Sparkles } from 'lucide-react';

export const ChatInterface = () => {
  const { currentChat, sendMessage } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSend = () => {
    if (inputValue.trim() && currentChat) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background elements with matching color scheme */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center max-w-6xl px-8 relative z-10 w-full">
          {/* Main heading with gradient */}
          <div className="mb-12">
            <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Welcome to Noa
            </h1>
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
              <p className="text-2xl text-slate-300 font-medium">
                Your AI-Powered E-commerce Growth Partner
              </p>
              <Sparkles className="w-8 h-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <p className="text-xl text-slate-400 mb-16 max-w-3xl mx-auto leading-relaxed">
            Supercharge your e-commerce business with specialized AI assistants designed for modern brand owners. 
            Get expert guidance across every aspect of your online business.
          </p>

          {/* Feature cards - Updated layout for better visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="w-16 h-16 bg-blue-600/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Strategic Guidance</h3>
              <p className="text-slate-400 leading-relaxed">Get personalized business insights and strategic direction for your brand</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="w-16 h-16 bg-green-600/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Performance Marketing</h3>
              <p className="text-slate-400 leading-relaxed">Optimize campaigns and maximize your advertising ROI across all channels</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="w-16 h-16 bg-purple-600/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <ShoppingCart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Store Management</h3>
              <p className="text-slate-400 leading-relaxed">Streamline your Shopify operations and enhance customer experience</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
              <div className="w-16 h-16 bg-cyan-600/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <PenTool className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Content Creation</h3>
              <p className="text-slate-400 leading-relaxed">Craft compelling content that converts visitors into loyal customers</p>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-slate-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
              <div className="w-16 h-16 bg-yellow-600/30 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Calendar className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Calendar Support</h3>
              <p className="text-slate-400 leading-relaxed">Organize your schedule and never miss important business opportunities</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 hover:border-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Intelligence</h3>
              <p className="text-slate-300 leading-relaxed">Advanced automation and insights to scale your business efficiently</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 text-slate-400 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-lg">Ready to transform your e-commerce business</span>
            </div>
            <p className="text-slate-500 text-lg">
              Select a specialized assistant from the sidebar to begin your journey
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getDisplayName = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'noa-hq': 'Noa HQ',
      'performance-marketing': 'Performance Marketing',
      'shopify-management': 'Shopify Management',
      'content-creation': 'Content Creation',
      'calendar-support': 'Calendar Support'
    };
    return typeMap[type] || type;
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 p-4 flex items-center justify-between bg-slate-800/50">
        <div>
          <h2 className="font-semibold text-white">{currentChat.title}</h2>
          <p className="text-sm text-slate-400">
            {getDisplayName(currentChat.type)} Mode
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-slate-700 p-4 bg-slate-800/70">
          <WebhookSettings />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.length === 0 ? (
          <div className="text-center text-slate-400 mt-8">
            <p>Start a conversation with your AI assistant!</p>
          </div>
        ) : (
          currentChat.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4 bg-slate-800/50">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${getDisplayName(currentChat.type)} assistant...`}
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-3 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
