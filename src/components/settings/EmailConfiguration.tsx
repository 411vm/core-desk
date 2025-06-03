
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Mail, Save, TestTube } from 'lucide-react';

interface EmailConfigurationProps {
  userRole: string;
}

export const EmailConfiguration = ({ userRole }: EmailConfigurationProps) => {
  const [emailSettings, setEmailSettings] = useState({
    senderEmail: 'suporte@empresa.com',
    senderName: 'Suporte CoreDesk',
    signature: 'Atenciosamente,\nEquipe de Suporte\nCoreDesk\n\n--\nEste é um e-mail automático, não responda.',
    notifications: {
      ticketCreated: true,
      statusUpdated: true,
      responseAdded: true,
      ticketClosed: true
    },
    smtpSettings: {
      server: 'smtp.empresa.com',
      port: '587',
      username: 'suporte@empresa.com',
      password: '',
      useTLS: true
    }
  });

  const handleSave = () => {
    console.log('Salvando configurações de e-mail:', emailSettings);
    // Aqui você salvaria as configurações
  };

  const handleTestEmail = () => {
    console.log('Enviando e-mail de teste...');
    // Aqui você enviaria um e-mail de teste
  };

  return (
    <div className="space-y-6">
      {/* Configurações Básicas */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Configurações de E-mail
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure o envio automático de e-mails para clientes
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="senderEmail">E-mail do Remetente</Label>
              <Input
                id="senderEmail"
                value={emailSettings.senderEmail}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                placeholder="suporte@empresa.com"
              />
            </div>
            <div>
              <Label htmlFor="senderName">Nome do Remetente</Label>
              <Input
                id="senderName"
                value={emailSettings.senderName}
                onChange={(e) => setEmailSettings(prev => ({ ...prev, senderName: e.target.value }))}
                placeholder="Suporte CoreDesk"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="signature">Assinatura de E-mail</Label>
            <Textarea
              id="signature"
              value={emailSettings.signature}
              onChange={(e) => setEmailSettings(prev => ({ ...prev, signature: e.target.value }))}
              rows={4}
              placeholder="Digite a assinatura padrão para os e-mails..."
            />
          </div>
        </div>
      </Card>

      {/* Notificações Automáticas */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
          Notificações Automáticas
        </h4>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Configure quando enviar e-mails automáticos para os clientes
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Criação de chamado</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enviar confirmação quando um novo chamado for criado
              </p>
            </div>
            <Switch
              checked={emailSettings.notifications.ticketCreated}
              onCheckedChange={(checked) => 
                setEmailSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, ticketCreated: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Atualização de status</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Notificar quando o status do chamado for alterado
              </p>
            </div>
            <Switch
              checked={emailSettings.notifications.statusUpdated}
              onCheckedChange={(checked) => 
                setEmailSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, statusUpdated: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Resposta de atendimento</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Enviar quando uma nova resposta for adicionada
              </p>
            </div>
            <Switch
              checked={emailSettings.notifications.responseAdded}
              onCheckedChange={(checked) => 
                setEmailSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, responseAdded: checked }
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Encerramento de chamado</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Notificar quando o chamado for resolvido/fechado
              </p>
            </div>
            <Switch
              checked={emailSettings.notifications.ticketClosed}
              onCheckedChange={(checked) => 
                setEmailSettings(prev => ({
                  ...prev,
                  notifications: { ...prev.notifications, ticketClosed: checked }
                }))
              }
            />
          </div>
        </div>
      </Card>

      {/* Configurações SMTP */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
          Configurações SMTP
        </h4>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Configure o servidor de e-mail para envio das mensagens
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpServer">Servidor SMTP</Label>
              <Input
                id="smtpServer"
                value={emailSettings.smtpSettings.server}
                onChange={(e) => setEmailSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, server: e.target.value }
                }))}
                placeholder="smtp.empresa.com"
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">Porta</Label>
              <Input
                id="smtpPort"
                value={emailSettings.smtpSettings.port}
                onChange={(e) => setEmailSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, port: e.target.value }
                }))}
                placeholder="587"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtpUsername">Usuário</Label>
              <Input
                id="smtpUsername"
                value={emailSettings.smtpSettings.username}
                onChange={(e) => setEmailSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, username: e.target.value }
                }))}
                placeholder="usuario@empresa.com"
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">Senha</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={emailSettings.smtpSettings.password}
                onChange={(e) => setEmailSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, password: e.target.value }
                }))}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={emailSettings.smtpSettings.useTLS}
              onCheckedChange={(checked) => 
                setEmailSettings(prev => ({
                  ...prev,
                  smtpSettings: { ...prev.smtpSettings, useTLS: checked }
                }))
              }
            />
            <Label>Usar TLS/SSL</Label>
          </div>
        </div>
      </Card>

      {/* Ações */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleTestEmail}>
          <TestTube className="h-4 w-4 mr-2" />
          Enviar E-mail de Teste
        </Button>
        
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
