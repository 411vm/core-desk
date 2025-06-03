
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Building2, MessageSquare, Mail, Bot, Settings as SettingsIcon, Save } from 'lucide-react';
import { SectorManagement } from '@/components/settings/SectorManagement';
import { TeamManagement } from '@/components/settings/TeamManagement';
import { ClientManagement } from '@/components/settings/ClientManagement';
import { MacroManagement } from '@/components/settings/MacroManagement';
import { EmailConfiguration } from '@/components/settings/EmailConfiguration';
import { ChatbotConfiguration } from '@/components/settings/ChatbotConfiguration';

const Settings = () => {
  const navigate = useNavigate();
  const [user] = useState({ role: 'gestor' }); // Mock user data

  const canAccessSettings = user.role === 'gestor' || user.role === 'admin';

  if (!canAccessSettings) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31] flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <p className="text-slate-500 dark:text-slate-400 text-center">
            Você não tem permissão para acessar as configurações do sistema. 
            Apenas gestores e administradores podem acessar esta área.
          </p>
          <Button 
            className="w-full mt-4" 
            onClick={() => navigate('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Configurações do Sistema
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Administração e configurações avançadas da plataforma
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {user.role === 'admin' ? 'Administrador' : 'Gestor'}
            </span>
          </div>
        </div>

        <Tabs defaultValue="sectors" className="space-y-6">
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

          <TabsContent value="sectors" className="space-y-6">
            <SectorManagement userRole={user.role} />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamManagement userRole={user.role} />
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <ClientManagement userRole={user.role} />
          </TabsContent>

          <TabsContent value="macros" className="space-y-6">
            <MacroManagement userRole={user.role} />
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <EmailConfiguration userRole={user.role} />
          </TabsContent>

          <TabsContent value="chatbot" className="space-y-6">
            <ChatbotConfiguration userRole={user.role} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
