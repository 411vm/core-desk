
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bot, Plus, Edit, Trash2, Phone, Save, Zap } from 'lucide-react';

interface AIRule {
  id: string;
  question: string;
  response: string;
  isActive: boolean;
  createdAt: string;
}

interface ChatbotConfigurationProps {
  userRole: string;
}

const defaultRules: AIRule[] = [
  {
    id: '1',
    question: 'Como faço para redefinir minha senha?',
    response: 'Para redefinir sua senha, acesse a página de login e clique em "Esqueci minha senha". Você receberá um e-mail com instruções.',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    question: 'Qual o horário de funcionamento do suporte?',
    response: 'Nosso suporte funciona de segunda a sexta-feira, das 8h às 18h. Fora desse horário, você pode deixar uma mensagem que responderemos no próximo dia útil.',
    isActive: true,
    createdAt: '2024-01-01'
  }
];

export const ChatbotConfiguration = ({ userRole }: ChatbotConfigurationProps) => {
  const [chatbotSettings, setChatbotSettings] = useState({
    isEnabled: true,
    phoneNumbers: ['+5511999999999'],
    welcomeMessage: 'Olá! Sou o assistente virtual do CoreDesk. Como posso ajudá-lo hoje?',
    fallbackMessage: 'Desculpe, não entendi sua pergunta. Vou transferir você para um atendente humano.',
    businessHours: {
      enabled: true,
      start: '08:00',
      end: '18:00',
      timezone: 'America/Sao_Paulo'
    }
  });

  const [aiRules, setAiRules] = useState<AIRule[]>(defaultRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRule, setNewRule] = useState({ question: '', response: '' });
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const handleAddRule = () => {
    if (!newRule.question.trim() || !newRule.response.trim()) return;
    
    const rule: AIRule = {
      id: Date.now().toString(),
      question: newRule.question.trim(),
      response: newRule.response.trim(),
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setAiRules(prev => [...prev, rule]);
    setNewRule({ question: '', response: '' });
    setIsDialogOpen(false);
  };

  const handleAddPhoneNumber = () => {
    if (!newPhoneNumber.trim()) return;
    
    setChatbotSettings(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, newPhoneNumber.trim()]
    }));
    setNewPhoneNumber('');
  };

  const handleRemovePhoneNumber = (index: number) => {
    setChatbotSettings(prev => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index)
    }));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setAiRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    setAiRules(prev => prev.filter(rule => rule.id !== ruleId));
  };

  const handleSave = () => {
    console.log('Salvando configurações do chatbot:', { chatbotSettings, aiRules });
    // Aqui você salvaria as configurações
  };

  return (
    <div className="space-y-6">
      {/* Status e Configurações Básicas */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bot className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                Chat-bot com IA
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Configure o assistente virtual inteligente
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Badge variant={chatbotSettings.isEnabled ? 'default' : 'secondary'}>
              {chatbotSettings.isEnabled ? 'Ativo' : 'Inativo'}
            </Badge>
            <Switch
              checked={chatbotSettings.isEnabled}
              onCheckedChange={(checked) => 
                setChatbotSettings(prev => ({ ...prev, isEnabled: checked }))
              }
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
            <Textarea
              id="welcomeMessage"
              value={chatbotSettings.welcomeMessage}
              onChange={(e) => setChatbotSettings(prev => ({ ...prev, welcomeMessage: e.target.value }))}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="fallbackMessage">Mensagem de Fallback</Label>
            <Textarea
              id="fallbackMessage"
              value={chatbotSettings.fallbackMessage}
              onChange={(e) => setChatbotSettings(prev => ({ ...prev, fallbackMessage: e.target.value }))}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessStart">Horário de Início</Label>
              <Input
                id="businessStart"
                type="time"
                value={chatbotSettings.businessHours.start}
                onChange={(e) => setChatbotSettings(prev => ({
                  ...prev,
                  businessHours: { ...prev.businessHours, start: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="businessEnd">Horário de Término</Label>
              <Input
                id="businessEnd"
                type="time"
                value={chatbotSettings.businessHours.end}
                onChange={(e) => setChatbotSettings(prev => ({
                  ...prev,
                  businessHours: { ...prev.businessHours, end: e.target.value }
                }))}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Números de Telefone */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <h4 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Números de Telefone
            </h4>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="+5511999999999"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddPhoneNumber} disabled={!newPhoneNumber.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {chatbotSettings.phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                <span className="font-mono">{phone}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleRemovePhoneNumber(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Regras de IA */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            <h4 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Regras de Treinamento da IA
            </h4>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Regra
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Regra de IA</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="question">Pergunta/Palavra-chave</Label>
                  <Input
                    id="question"
                    value={newRule.question}
                    onChange={(e) => setNewRule(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Como faço para..."
                  />
                </div>
                <div>
                  <Label htmlFor="response">Resposta da IA</Label>
                  <Textarea
                    id="response"
                    value={newRule.response}
                    onChange={(e) => setNewRule(prev => ({ ...prev, response: e.target.value }))}
                    rows={4}
                    placeholder="Para fazer isso, você deve..."
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddRule}>
                    Adicionar Regra
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pergunta/Palavra-chave</TableHead>
              <TableHead>Resposta</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {aiRules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="truncate">{rule.question}</div>
                </TableCell>
                <TableCell className="max-w-md">
                  <div className="truncate text-sm text-slate-600">{rule.response}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={rule.isActive ? 'default' : 'secondary'}>
                    {rule.isActive ? 'Ativa' : 'Inativa'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleRuleStatus(rule.id)}
                    >
                      {rule.isActive ? 'Desativar' : 'Ativar'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Ações */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
