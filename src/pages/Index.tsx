
import React, { useState } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { ChatProvider } from '@/contexts/ChatContext';

const Index = () => {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar />
        <ChatInterface />
      </div>
    </ChatProvider>
  );
};

export default Index;
