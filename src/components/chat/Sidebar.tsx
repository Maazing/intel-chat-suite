
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, TrendingUp, ShoppingBag, PenTool, Calendar, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const chatTypes = [
  {
    id: 'noa-hq' as const,
    name: 'Noa HQ',
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
  const { activeChatType, createNewChat, chatSessions, setCurrentChat, currentChat, deleteChat, renameChat } = useChat();

  const handleRenameChat = (chatId: string) => {
    const newTitle = prompt('Enter new chat name:');
    if (newTitle && newTitle.trim()) {
      renameChat(chatId, newTitle.trim());
    }
  };

  const handleDeleteChat = (chatId: string) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId);
    }
  };

  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-center">Noa</h1>
      </div>

      {/* Chat Types */}
      <div className="p-4 space-y-2">
        <h2 className="text-sm font-medium text-gray-400 mb-3">Chat Types</h2>
        {chatTypes.map((type) => {
          const Icon = type.icon;
          const isActive = activeChatType === type.id;
          return (
            <Button
              key={type.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start text-left h-auto p-3 group ${
                isActive ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'hover:bg-gray-800'
              }`}
              onClick={() => createNewChat(type.id)}
            >
              <div className="flex items-start space-x-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{type.name}</div>
                  <div className={`text-xs ${
                    isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-300'
                  }`}>
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
            <div key={session.id} className="flex items-center group">
              <Button
                variant={currentChat?.id === session.id ? "default" : "ghost"}
                className={`flex-1 justify-start text-left h-auto p-2 mr-1 ${
                  currentChat?.id === session.id ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'hover:bg-gray-800'
                }`}
                onClick={() => setCurrentChat(session)}
              >
                <div className="truncate text-sm">{session.title}</div>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-8 w-8"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem 
                    onClick={() => handleRenameChat(session.id)}
                    className="hover:bg-gray-700 cursor-pointer"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteChat(session.id)}
                    className="hover:bg-gray-700 cursor-pointer text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-gray-700 hover:bg-gray-800"
          onClick={() => createNewChat(activeChatType)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
};
