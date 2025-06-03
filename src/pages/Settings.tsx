
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Lock, Bell, Eye, Globe, Save, Building2 } from 'lucide-react';
import { SectorManagement } from '@/components/operator/SectorManagement';

const Settings = () => {
  const navigate = useNavigate();
  const [user] = useState({ role: 'gestor' }); // Mock user data
  const [settings, setSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    autoRefresh: true,
    soundNotifications: true
  });

  const handleSave = () => {
    console.log('Configurações salvas:', settings);
    // Aqui você salvaria as configurações
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Configurações
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Personalize sua experiência no CoreDesk
              </p>
            </div>
          </div>
          
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar alterações
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="display">Exibição</TabsTrigger>
            <TabsTrigger value="sectors">Setores</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* Language and Region */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                  Idioma e Região
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <select
                    id="language"
                    value={settings.language}
                    onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Fuso horário</Label>
                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                  >
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                    <option value="Europe/London">London (GMT+0)</option>
                  </select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {/* Security Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                  Segurança
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Senha atual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={settings.currentPassword}
                    onChange={(e) => setSettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="newPassword">Nova senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => setSettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            {/* Notification Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                  Notificações
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações por email</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receba atualizações de chamados por email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notificações push</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receba notificações no navegador
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sons de notificação</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Reproduzir som quando receber notificações
                    </p>
                  </div>
                  <Switch
                    checked={settings.soundNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundNotifications: checked }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            {/* Display Settings */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                  Exibição
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Modo escuro</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Usar tema escuro na interface
                    </p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Atualização automática</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Atualizar automaticamente a lista de chamados
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRefresh: checked }))}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-6">
            <SectorManagement userRole={user.role} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
