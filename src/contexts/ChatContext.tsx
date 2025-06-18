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
  isWaitingForResponse: boolean;
  setCurrentChat: (chat: ChatSession | null) => void;
  createNewChat: (type: ChatType) => void;
  sendMessage: (text: string) => Promise<void>;
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
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
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

    // Immediately update the UI with the user's message
    const updatedChatWithUserMessage = {
      ...currentChat,
      messages: [...currentChat.messages, userMessage],
    };
    setCurrentChat(updatedChatWithUserMessage);
    setChatSessions(prev =>
      prev.map(session =>
        session.id === currentChat.id ? updatedChatWithUserMessage : session
      )
    );

    // Set waiting state to show typing indicator
    setIsWaitingForResponse(true);

    // Use type-based webhook
    const webhookUrl = webhookConfig[currentChat.type];
    
    // Send to webhook if configured and process the response
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
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

        if (!response.ok) {
          throw new Error(`Webhook responded with status: ${response.status}`);
        }

        const responseData = await response.json();

        // Create the assistant's message from the REAL webhook response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseData.reply, // This looks for the "reply" field we set up in n8n
          sender: 'assistant',
          timestamp: new Date(),
        };

        // Update the UI with the assistant's real message
        const finalChat = {
          ...updatedChatWithUserMessage,
          messages: [...updatedChatWithUserMessage.messages, assistantMessage],
        };
        setCurrentChat(finalChat);
        setChatSessions(prev =>
          prev.map(session =>
            session.id === currentChat.id ? finalChat : session
          )
        );

      } catch (error) {
        console.error('Failed to send message to webhook or process response:', error);
        // Add an error message to the chat UI if the connection fails
        const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Sorry, I encountered an error connecting to the automation service.",
            sender: 'assistant',
            timestamp: new Date()
        };
        const chatWithError = {
            ...updatedChatWithUserMessage,
            messages: [...updatedChatWithUserMessage.messages, errorMessage]
        };
        setCurrentChat(chatWithError);
        setChatSessions(prev => prev.map(session => session.id === currentChat.id ? chatWithError : session));
      }
    } else {
        // Optional: Handle cases where no webhook is configured for the chat type
        const noWebhookMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "This chat type does not have an automation service configured.",
            sender: 'assistant',
            timestamp: new Date()
        };
        const chatWithNoWebhook = {
            ...updatedChatWithUserMessage,
            messages: [...updatedChatWithUserMessage.messages, noWebhookMessage]
        };
        setCurrentChat(chatWithNoWebhook);
        setChatSessions(prev => prev.map(session => session.id === currentChat.id ? chatWithNoWebhook : session));
    }

    // Clear waiting state after response is processed
    setIsWaitingForResponse(false);
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
      isWaitingForResponse,
      setCurrentChat,
      createNewChat,
      sendMessage,
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
