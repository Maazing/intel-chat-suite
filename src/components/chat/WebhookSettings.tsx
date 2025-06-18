
import React from 'react';
import { Settings } from 'lucide-react';
import { WebhookConfig } from './WebhookConfig';

export const WebhookSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-blue-400" />
        <h3 className="font-medium text-white">Webhook Configuration</h3>
      </div>
      
      <WebhookConfig />

      {/* Help Text */}
      <div className="text-xs text-slate-400 space-y-1 bg-slate-800/30 p-3 rounded-lg">
        <p>• Each chat type has its own dedicated webhook endpoint</p>
        <p>• Configure your automation workflows to receive chat data</p>
        <p>• Webhooks receive specialized data based on the chat type</p>
        <p>• Test your webhooks with your n8n or automation platform</p>
      </div>
    </div>
  );
};
