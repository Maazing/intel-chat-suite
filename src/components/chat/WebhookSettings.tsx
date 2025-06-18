
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Globe } from 'lucide-react';
import { WebhookConfig } from './WebhookConfig';

export const WebhookSettings = () => {
  const { currentChat, setWebhookUrl, webhookConfig } = useChat();
  const [webhookInput, setWebhookInput] = useState(currentChat?.webhookUrl || '');
  const [showGlobalConfig, setShowGlobalConfig] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setWebhookUrl(webhookInput);
    toast({
      title: "Individual Chat Webhook Saved",
      description: "This chat's webhook URL has been updated successfully.",
    });
  };

  const currentTypeWebhook = currentChat ? webhookConfig[currentChat.type] : '';

  return (
    <div className="space-y-6">
      {/* Individual Chat Webhook */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="font-medium text-white">Individual Chat Webhook</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGlobalConfig(!showGlobalConfig)}
            className="text-slate-400 hover:text-white"
          >
            <Globe className="w-4 h-4 mr-2" />
            {showGlobalConfig ? 'Hide Global Config' : 'Global Config'}
          </Button>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="webhook-url" className="text-sm text-slate-300">
            Webhook URL for this chat
          </Label>
          <div className="flex space-x-2">
            <Input
              id="webhook-url"
              value={webhookInput}
              onChange={(e) => setWebhookInput(e.target.value)}
              placeholder="https://your-automation-endpoint.com/webhook/..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
            />
            <Button 
              onClick={handleSave} 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
          
          {currentTypeWebhook && !webhookInput && (
            <p className="text-xs text-green-400">
              ✓ Using global webhook for {currentChat?.type}: {currentTypeWebhook.substring(0, 50)}...
            </p>
          )}
          
          {webhookInput && (
            <p className="text-xs text-yellow-400">
              ⚠ Individual webhook will override the global webhook for this chat
            </p>
          )}
        </div>
      </div>

      {/* Global Webhook Configuration */}
      {showGlobalConfig && (
        <div className="border-t border-slate-700 pt-6">
          <WebhookConfig />
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-slate-400 space-y-1 bg-slate-800/30 p-3 rounded-lg">
        <p>• <strong>Individual Chat Webhook:</strong> Specific to this chat only</p>
        <p>• <strong>Global Webhooks:</strong> Default webhooks for each chat type</p>
        <p>• Individual webhooks take priority over global webhooks</p>
        <p>• Use global webhooks for consistent automation across chat types</p>
      </div>
    </div>
  );
};
