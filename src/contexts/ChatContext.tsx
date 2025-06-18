
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ChatType = 'noa-hq' | 'performance-marketing' | 'shopify-management' | 'content-creation' | 'calendar-support';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  type: ChatType;
  messages: Message[];
  webhookUrl?: string; // Keep individual chat webhook for backward compatibility
}

export interface WebhookConfig {
  'noa-hq': string;
  'performance-marketing': string;
  'shopify-management': string;
  'content-creation': string;
  'calendar-support': string;
}

interface ChatContextType {
  currentChat: ChatSession | null;
  chatSessions: ChatSession[];
  activeChatType: ChatType;
  webhookConfig: WebhookConfig;
  setCurrentChat: (chat: ChatSession | null) => void;
  createNewChat: (type: ChatType) => void;
  sendMessage: (text: string) => Promise<void>;
  setWebhookUrl: (url: string) => void;
  setWebhookForType: (type: ChatType, url: string) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
  goToHomepage: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatType, setActiveChatType] = useState<ChatType>('noa-hq');
  const [webhookConfig, setWebhookConfig] = useState<WebhookConfig>({
    'noa-hq': '',
    'performance-marketing': '',
    'shopify-management': '',
    'content-creation': '',
    'calendar-support': ''
  });

  const createNewChat = (type: ChatType) => {
    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `New ${getTypeDisplayName(type)} Chat`,
      type,
      messages: [],
    };
    
    setChatSessions(prev => [newChat, ...prev]);
    setCurrentChat(newChat);
    setActiveChatType(type);
  };

  const goToHomepage = () => {
    setCurrentChat(null);
  };

  const getTypeDisplayName = (type: ChatType): string => {
    const typeMap: { [key: string]: string } = {
      'noa-hq': 'Noa HQ',
      'performance-marketing': 'Performance Marketing',
      'shopify-management': 'Shopify Management',
      'content-creation': 'Content Creation',
      'calendar-support': 'Calendar Support'
    };
    return typeMap[type] || type;
  };

  const sendMessage = async (text: string) => {
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    // Update current chat with user message
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
    };
    setCurrentChat(updatedChat);
    setChatSessions(prev => 
      prev.map(session => 
        session.id === currentChat.id ? updatedChat : session
      )
    );

    // Determine which webhook to use: individual chat webhook or type-based webhook
    const webhookUrl = currentChat.webhookUrl || webhookConfig[currentChat.type];
    
    // Send to webhook if configured
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: text,
            chatType: currentChat.type,
            chatId: currentChat.id,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error('Failed to send message to webhook:', error);
      }
    }

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your message. As your ${getTypeDisplayName(currentChat.type)} assistant, I'm here to help you with your e-commerce business needs. How can I assist you today?`,
        sender: 'assistant',
        timestamp: new Date(),
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, assistantMessage],
      };
      setCurrentChat(finalChat);
      setChatSessions(prev => 
        prev.map(session => 
          session.id === currentChat.id ? finalChat : session
        )
      );
    }, 1000);
  };

  const setWebhookUrl = (url: string) => {
    if (!currentChat) return;
    
    const updatedChat = { ...currentChat, webhookUrl: url };
    setCurrentChat(updatedChat);
    setChatSessions(prev => 
      prev.map(session => 
        session.id === currentChat.id ? updatedChat : session
      )
    );
  };

  const setWebhookForType = (type: ChatType, url: string) => {
    setWebhookConfig(prev => ({
      ...prev,
      [type]: url
    }));
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(session => session.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
  };

  const renameChat = (chatId: string, newTitle: string) => {
    setChatSessions(prev => 
      prev.map(session => 
        session.id === chatId ? { ...session, title: newTitle } : session
      )
    );
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, title: newTitle } : null);
    }
  };

  return (
    <ChatContext.Provider value={{
      currentChat,
      chatSessions,
      activeChatType,
      webhookConfig,
      setCurrentChat,
      createNewChat,
      sendMessage,
      setWebhookUrl,
      setWebhookForType,
      deleteChat,
      renameChat,
      goToHomepage,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
