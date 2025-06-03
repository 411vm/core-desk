
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building2, MessageSquare, Mail, Bot } from 'lucide-react';

export const SettingsTabsList = () => {
  return (
    <TabsList className="grid w-full grid-cols-6">
      <TabsTrigger value="sectors" className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Setores
      </TabsTrigger>
      <TabsTrigger value="team" className="flex items-center gap-2">
        <Users className="h-4 w-4" />
        Equipe
      </TabsTrigger>
      <TabsTrigger value="clients" className="flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        Clientes
      </TabsTrigger>
      <TabsTrigger value="macros" className="flex items-center gap-2">
        <MessageSquare className="h-4 w-4" />
        Macros
      </TabsTrigger>
      <TabsTrigger value="email" className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        E-mail
      </TabsTrigger>
      <TabsTrigger value="chatbot" className="flex items-center gap-2">
        <Bot className="h-4 w-4" />
        Chat-bot
      </TabsTrigger>
    </TabsList>
  );
};
