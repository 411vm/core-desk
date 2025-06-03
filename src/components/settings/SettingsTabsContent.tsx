
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { SectorManagement } from '@/components/settings/SectorManagement';
import { TeamManagement } from '@/components/settings/TeamManagement';
import { ClientManagement } from '@/components/settings/ClientManagement';
import { MacroManagement } from '@/components/settings/MacroManagement';
import { EmailConfiguration } from '@/components/settings/EmailConfiguration';
import { ChatbotConfiguration } from '@/components/settings/ChatbotConfiguration';

interface SettingsTabsContentProps {
  userRole: string;
}

export const SettingsTabsContent = ({ userRole }: SettingsTabsContentProps) => {
  return (
    <>
      <TabsContent value="sectors" className="space-y-6">
        <SectorManagement userRole={userRole} />
      </TabsContent>

      <TabsContent value="team" className="space-y-6">
        <TeamManagement userRole={userRole} />
      </TabsContent>

      <TabsContent value="clients" className="space-y-6">
        <ClientManagement userRole={userRole} />
      </TabsContent>

      <TabsContent value="macros" className="space-y-6">
        <MacroManagement userRole={userRole} />
      </TabsContent>

      <TabsContent value="email" className="space-y-6">
        <EmailConfiguration userRole={userRole} />
      </TabsContent>

      <TabsContent value="chatbot" className="space-y-6">
        <ChatbotConfiguration userRole={userRole} />
      </TabsContent>
    </>
  );
};
