
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageBubble } from './MessageBubble';
import { WebhookSettings } from './WebhookSettings';
import { Send, Settings } from 'lucide-react';

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
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome to ChatGPT Pro</h2>
          <p className="text-gray-400 mb-6">
            Select a chat type from the sidebar to get started with your AI assistant.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm">5 specialized chat modes</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">n8n webhook integration</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm">Real-time conversation</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">{currentChat.title}</h2>
          <p className="text-sm text-gray-400 capitalize">
            {currentChat.type.replace('-', ' ')} Mode
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-gray-800 p-4 bg-gray-950">
          <WebhookSettings />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentChat.messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-8">
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
      <div className="border-t border-gray-800 p-4">
        <div className="flex space-x-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${currentChat.type.replace('-', ' ')} assistant...`}
            className="flex-1 bg-gray-800 border-gray-700 focus:border-blue-500"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
