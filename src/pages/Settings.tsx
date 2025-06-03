
import React, { useState } from 'react';
import { Tabs } from '@/components/ui/tabs';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { SettingsTabsList } from '@/components/settings/SettingsTabsList';
import { SettingsTabsContent } from '@/components/settings/SettingsTabsContent';
import { SettingsAccessDenied } from '@/components/settings/SettingsAccessDenied';

const Settings = () => {
  const [user] = useState({ role: 'gestor' }); // Mock user data

  const canAccessSettings = user.role === 'gestor' || user.role === 'admin';

  if (!canAccessSettings) {
    return <SettingsAccessDenied />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-6xl mx-auto p-6">
        <SettingsHeader userRole={user.role} />

        <Tabs defaultValue="sectors" className="space-y-6">
          <SettingsTabsList />
          <SettingsTabsContent userRole={user.role} />
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
