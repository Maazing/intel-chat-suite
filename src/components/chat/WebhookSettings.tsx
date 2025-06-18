
import React, { useState } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save } from 'lucide-react';

export const WebhookSettings = () => {
  const { currentChat, setWebhookUrl } = useChat();
  const [webhookInput, setWebhookInput] = useState(currentChat?.webhookUrl || '');
  const { toast } = useToast();

  const handleSave = () => {
    setWebhookUrl(webhookInput);
    toast({
      title: "Settings Saved",
      description: "Integration settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-blue-500" />
        <h3 className="font-medium">Integration Settings</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="webhook-url" className="text-sm text-gray-300">
          Automation Endpoint URL
        </Label>
        <div className="flex space-x-2">
          <Input
            id="webhook-url"
            value={webhookInput}
            onChange={(e) => setWebhookInput(e.target.value)}
            placeholder="https://your-automation-endpoint.com/webhook/..."
            className="flex-1 bg-gray-800 border-gray-700 focus:border-blue-500"
          />
          <Button onClick={handleSave} size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      <div className="text-xs text-gray-400 space-y-1">
        <p>• Configure your automation workflows to receive chat data</p>
        <p>• Each assistant sends specialized data for processing</p>
        <p>• Enable advanced business automation features</p>
      </div>
    </div>
  );
};
