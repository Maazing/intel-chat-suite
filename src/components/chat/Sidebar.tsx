
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, TrendingUp, ShoppingBag, PenTool, Calendar } from 'lucide-react';

const chatTypes = [
  {
    id: 'basic-conversation' as const,
    name: 'Basic Conversation',
    icon: MessageSquare,
    description: 'General purpose chat'
  },
  {
    id: 'performance-marketing' as const,
    name: 'Performance Marketing',
    icon: TrendingUp,
    description: 'Marketing optimization & analytics'
  },
  {
    id: 'shopify-management' as const,
    name: 'Shopify Management',
    icon: ShoppingBag,
    description: 'E-commerce store management'
  },
  {
    id: 'content-creation' as const,
    name: 'Content Creation',
    icon: PenTool,
    description: 'Creative writing & content'
  },
  {
    id: 'calendar-support' as const,
    name: 'Calendar Support',
    icon: Calendar,
    description: 'Scheduling & time management'
  }
];

export const Sidebar = () => {
  const { activeChatType, createNewChat, chatSessions, setCurrentChat, currentChat } = useChat();

  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-center">ChatGPT Pro</h1>
      </div>

      {/* Chat Types */}
      <div className="p-4 space-y-2">
        <h2 className="text-sm font-medium text-gray-400 mb-3">Chat Types</h2>
        {chatTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Button
              key={type.id}
              variant={activeChatType === type.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto p-3 group"
              onClick={() => createNewChat(type.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-300">
                    {type.description}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>

      {/* Chat History */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-sm font-medium text-gray-400 mb-3">Recent Chats</h2>
        <div className="space-y-1">
          {chatSessions.map((session) => (
            <Button
              key={session.id}
              variant={currentChat?.id === session.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto p-2"
              onClick={() => setCurrentChat(session)}
            >
              <div className="truncate text-sm">{session.title}</div>
            </Button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => createNewChat(activeChatType)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
};
