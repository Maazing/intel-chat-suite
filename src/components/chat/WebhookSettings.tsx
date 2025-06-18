
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Webhook, Save } from 'lucide-react';

export const WebhookSettings = () => {
  const { currentChat, setWebhookUrl } = useChat();
  const [webhookInput, setWebhookInput] = useState(currentChat?.webhookUrl || '');
  const { toast } = useToast();

  const handleSave = () => {
    setWebhookUrl(webhookInput);
    toast({
      title: "Settings Saved",
      description: "n8n webhook URL has been updated successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Webhook className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">n8n Integration Settings</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="webhook-url" className="text-sm text-gray-300">
          n8n Webhook URL
        </Label>
        <div className="flex space-x-2">
          <Input
            id="webhook-url"
            value={webhookInput}
            onChange={(e) => setWebhookInput(e.target.value)}
            placeholder="https://your-n8n-instance.com/webhook/..."
            className="flex-1 bg-gray-800 border-gray-700 focus:border-blue-500"
          />
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="text-xs text-gray-400 space-y-1">
        <p>• Messages will be sent to your n8n webhook with chat context</p>
        <p>• Configure your n8n workflow to handle incoming messages</p>
        <p>• Each chat type sends different metadata for specialized processing</p>
      </div>
    </div>
  );
};
