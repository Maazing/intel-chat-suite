import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  type: ChatType;
  messages: Message[];
  webhookUrl?: string;
}

export type ChatType = 
  | 'noa-hq'
  | 'performance-marketing'
  | 'shopify-management'
  | 'content-creation'
  | 'calendar-support';

interface ChatContextType {
  currentChat: ChatSession | null;
  chatSessions: ChatSession[];
  activeChatType: ChatType;
  setActiveChatType: (type: ChatType) => void;
  createNewChat: (type: ChatType) => void;
  setCurrentChat: (chat: ChatSession) => void;
  sendMessage: (content: string) => void;
  setWebhookUrl: (url: string) => void;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, newTitle: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [activeChatType, setActiveChatType] = useState<ChatType>('noa-hq');

  const createNewChat = (type: ChatType) => {
    const chatTypeNames = {
      'noa-hq': 'Noa HQ',
      'performance-marketing': 'Performance Marketing',
      'shopify-management': 'Shopify Management',
      'content-creation': 'Content Creation',
      'calendar-support': 'Calendar Support'
    };

    const newChat: ChatSession = {
      id: Date.now().toString(),
      title: `New ${chatTypeNames[type]} Chat`,
      type,
      messages: [],
      webhookUrl: ''
    };

    setChatSessions(prev => [...prev, newChat]);
    setCurrentChat(newChat);
    setActiveChatType(type);
  };

  const deleteChat = (chatId: string) => {
    setChatSessions(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChat?.id === chatId) {
      setCurrentChat(null);
    }
  };

  const renameChat = (chatId: string, newTitle: string) => {
    setChatSessions(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? { ...chat, title: newTitle }
          : chat
      )
    );
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, title: newTitle } : null);
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage]
    };

    setCurrentChat(updatedChat);
    setChatSessions(prev => 
      prev.map(chat => chat.id === currentChat.id ? updatedChat : chat)
    );

    // Send to n8n webhook if configured
    if (currentChat.webhookUrl) {
      try {
        await fetch(currentChat.webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify({
            message: content,
            chatType: currentChat.type,
            timestamp: new Date().toISOString(),
            chatId: currentChat.id
          }),
        });
        console.log('Message sent to n8n webhook');
      } catch (error) {
        console.error('Error sending to n8n:', error);
      }
    }

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `This is a simulated response for ${currentChat.type} chat. Connect your n8n webhook to get real AI responses!`,
        sender: 'assistant',
        timestamp: new Date()
      };

      const finalChat = {
        ...updatedChat,
        messages: [...updatedChat.messages, aiMessage]
      };

      setCurrentChat(finalChat);
      setChatSessions(prev => 
        prev.map(chat => chat.id === currentChat.id ? finalChat : chat)
      );
    }, 1000);
  };

  const setWebhookUrl = (url: string) => {
    if (!currentChat) return;

    const updatedChat = {
      ...currentChat,
      webhookUrl: url
    };

    setCurrentChat(updatedChat);
    setChatSessions(prev => 
      prev.map(chat => chat.id === currentChat.id ? updatedChat : chat)
    );
  };

  return (
    <ChatContext.Provider value={{
      currentChat,
      chatSessions,
      activeChatType,
      setActiveChatType,
      createNewChat,
      setCurrentChat,
      sendMessage,
      setWebhookUrl,
      deleteChat,
      renameChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};
