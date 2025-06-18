

import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, TrendingUp, ShoppingBag, PenTool, Calendar, MoreHorizontal, Edit, Trash2, Home, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
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
  const { activeChatType, createNewChat, chatSessions, setCurrentChat, currentChat, deleteChat, renameChat, goToHomepage } = useChat();
  const [isChatTypesCollapsed, setIsChatTypesCollapsed] = useState(false);
  const [isRecentChatsCollapsed, setIsRecentChatsCollapsed] = useState(false);

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
    <div className="w-80 bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Enhanced Header */}
      <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <Button
          variant="ghost"
          className="w-full justify-center hover:bg-slate-700/50 text-white group relative overflow-hidden transition-all duration-300 hover:scale-105"
          onClick={goToHomepage}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Home className="w-6 h-6 mr-3 text-blue-400 group-hover:text-blue-300 transition-colors" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Noa
          </h1>
          <Sparkles className="w-4 h-4 ml-2 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Button>
      </div>

      {/* Collapsible Chat Types */}
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          onClick={() => setIsChatTypesCollapsed(!isChatTypesCollapsed)}
          className="w-full justify-between text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group"
        >
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-blue-400" />
            <span>Chat Types</span>
          </div>
          {isChatTypesCollapsed ? (
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          )}
        </Button>
        
        {!isChatTypesCollapsed && (
          <div className="space-y-2 animate-fade-in">
            {chatTypes.map((type) => {
              const Icon = type.icon;
              const isActive = activeChatType === type.id;
              return (
                <Button
                  key={type.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-auto p-3 group transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg' 
                      : 'hover:bg-slate-800/50 text-slate-300 hover:scale-105'
                  }`}
                  onClick={() => createNewChat(type.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-blue-100' : 'text-blue-400 group-hover:text-blue-300'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{type.name}</div>
                      <div className={`text-xs transition-colors ${
                        isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-slate-300'
                      }`}>
                        {type.description}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {/* Collapsible Recent Chats */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Button
          variant="ghost"
          onClick={() => setIsRecentChatsCollapsed(!isRecentChatsCollapsed)}
          className="w-full justify-between text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group mb-3"
        >
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-green-400" />
            <span>Recent Chats</span>
            {chatSessions.length > 0 && (
              <span className="ml-2 bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                {chatSessions.length}
              </span>
            )}
          </div>
          {isRecentChatsCollapsed ? (
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          )}
        </Button>

        {!isRecentChatsCollapsed && (
          <div className="space-y-2 animate-fade-in">
            {chatSessions.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                <p className="text-slate-500 text-sm">No recent chats</p>
                <p className="text-slate-600 text-xs mt-1">Start a conversation to see your chats here</p>
              </div>
            ) : (
              chatSessions.map((session) => (
                <div key={session.id} className="flex items-center group">
                  <Button
                    variant={currentChat?.id === session.id ? "default" : "ghost"}
                    className={`flex-1 justify-start text-left h-auto p-3 mr-1 transition-all duration-200 ${
                      currentChat?.id === session.id 
                        ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg' 
                        : 'hover:bg-slate-800/50 text-slate-300 hover:scale-105'
                    }`}
                    onClick={() => setCurrentChat(session)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        currentChat?.id === session.id ? 'bg-green-200' : 'bg-slate-500'
                      }`} />
                      <div className="truncate text-sm font-medium">{session.title}</div>
                    </div>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem 
                        onClick={() => handleRenameChat(session.id)}
                        className="hover:bg-slate-700 cursor-pointer text-slate-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteChat(session.id)}
                        className="hover:bg-slate-700 cursor-pointer text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Clean New Chat Button */}
      <div className="p-4 border-t border-slate-700">
        <Button 
          size="lg" 
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] font-medium"
          onClick={() => createNewChat(activeChatType)}
        >
          <Plus className="w-5 h-5 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
};

