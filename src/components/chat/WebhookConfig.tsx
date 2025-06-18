
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Globe, TrendingUp, ShoppingBag, PenTool, Calendar } from 'lucide-react';
import { ChatType } from '@/contexts/ChatContext';

const chatTypeConfig = [
  {
    id: 'noa-hq' as ChatType,
    name: 'Noa HQ',
    icon: Globe,
    description: 'General purpose chat automation'
  },
  {
    id: 'performance-marketing' as ChatType,
    name: 'Performance Marketing',
    icon: TrendingUp,
    description: 'Marketing optimization & analytics automation'
  },
  {
    id: 'shopify-management' as ChatType,
    name: 'Shopify Management',
    icon: ShoppingBag,
    description: 'E-commerce store management automation'
  },
  {
    id: 'content-creation' as ChatType,
    name: 'Content Creation',
    icon: PenTool,
    description: 'Creative writing & content automation'
  },
  {
    id: 'calendar-support' as ChatType,
    name: 'Calendar Support',
    icon: Calendar,
    description: 'Scheduling & time management automation'
  }
];

export const WebhookConfig = () => {
  const { webhookConfig, setWebhookForType } = useChat();
  const [webhookInputs, setWebhookInputs] = useState(webhookConfig);
  const { toast } = useToast();

  const handleInputChange = (type: ChatType, value: string) => {
    setWebhookInputs(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSave = (type: ChatType) => {
    setWebhookForType(type, webhookInputs[type]);
    toast({
      title: "Webhook Saved",
      description: `${chatTypeConfig.find(c => c.id === type)?.name} webhook has been updated successfully.`,
    });
  };

  const handleSaveAll = () => {
    Object.keys(webhookInputs).forEach(type => {
      setWebhookForType(type as ChatType, webhookInputs[type as ChatType]);
    });
    toast({
      title: "All Webhooks Saved",
      description: "All webhook configurations have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="font-medium text-white">Webhook Configuration</h3>
        </div>
        <Button 
          onClick={handleSaveAll}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          Save All
        </Button>
      </div>

      <div className="space-y-4">
        {chatTypeConfig.map((config) => {
          const Icon = config.icon;
          return (
            <div key={config.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
              <div className="flex items-center space-x-3 mb-3">
                <Icon className="w-5 h-5 text-blue-400" />
                <div>
                  <h4 className="font-medium text-white">{config.name}</h4>
                  <p className="text-xs text-slate-400">{config.description}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={webhookInputs[config.id]}
                  onChange={(e) => handleInputChange(config.id, e.target.value)}
                  placeholder={`https://your-automation-endpoint.com/${config.id}/webhook/...`}
                  className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                />
                <Button 
                  onClick={() => handleSave(config.id)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-slate-400 space-y-1 bg-slate-800/30 p-3 rounded-lg">
        <p>• Each chat type can have its own automation endpoint</p>
        <p>• Webhooks receive specialized data based on the chat type</p>
        <p>• Individual chat webhooks (legacy) will override type-based webhooks</p>
        <p>• Configure your automation workflows to receive chat data</p>
      </div>
    </div>
  );
};
