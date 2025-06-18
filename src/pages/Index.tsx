
import React from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Index = () => {
  return (
    <ChatProvider>
      <div className="h-screen flex bg-slate-900">
        <Sidebar />
        <ChatInterface />
      </div>
    </ChatProvider>
  );
};

export default Index;
