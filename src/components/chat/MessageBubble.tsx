
import React from 'react';
import { Message } from '@/contexts/ChatContext';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2 ${isUser ? 'space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600' : 'bg-gray-700'
        }`}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-800 text-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          <div className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-400'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
