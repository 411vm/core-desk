import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, FileText, Bold, Italic, List, Link, Paperclip, Eye, EyeOff } from 'lucide-react';
import { ClientSearchInput } from '@/components/ui/client-search-input';
import { Client } from '@/hooks/useClientSearch';

const CreateTicket = () => {
  const navigate = useNavigate();
  const [isDraft, setIsDraft] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [ticketData, setTicketData] = useState({
    subject: '',
    priority: 'medium',
    type: 'problem',
    status: 'Novo',
    description: '',
    sectorId: ''
  });

  const sectors = [
    { id: '1', name: 'Suporte N1', color: '#3b82f6' },
    { id: '2', name: 'Suporte N2', color: '#f59e0b' },
    { id: '3', name: 'Suporte N3', color: '#ef4444' },
    { id: '4', name: 'Desenvolvimento', color: '#10b981' },
    { id: '5', name: 'Infraestrutura', color: '#8b5cf6' },
  ];

  const handleSave = (saveAsDraft = false) => {
    if (!selectedClient && !saveAsDraft) {
      alert('Por favor, selecione um cliente válido antes de criar o chamado.');
      return;
    }

    console.log('Salvando chamado:', { 
      ...ticketData, 
      client: selectedClient,
      isDraft: saveAsDraft, 
      isPublic 
    });
    
    if (!saveAsDraft) {
      navigate('/dashboard?section=tickets');
    }
  };

  const addFormatting = (format: string) => {
    const textarea = document.getElementById('description') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = selectedText;
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
    }

    const newValue = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    setTicketData(prev => ({ ...prev, description: newValue }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard?section=tickets')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Criar Novo Chamado
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Preencha as informações para abrir um novo chamado
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSave(true)}>
              <FileText className="h-4 w-4 mr-2" />
              Salvar rascunho
            </Button>
            <Button onClick={() => handleSave(false)}>
              <Save className="h-4 w-4 mr-2" />
              Criar chamado
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Informações Básicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="client">Cliente *</Label>
                <ClientSearchInput
                  value={selectedClient}
                  onChange={setSelectedClient}
                  placeholder="Digite o nome do cliente ou CNPJ..."
                  required
                  className="mt-1"
                />
                {selectedClient && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md">
                    <p className="text-sm text-green-800 dark:text-green-300">
                      ✅ Cliente selecionado: <strong>{selectedClient.name}</strong>
                      <br />
                      <span className="text-xs">CNPJ: {selectedClient.cnpj}</span>
                    </p>
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="subject">Assunto *</Label>
                <Input
                  id="subject"
                  value={ticketData.subject}
                  onChange={(e) => setTicketData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Título do problema ou solicitação"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="sectorId">Setor Responsável *</Label>
                <select
                  id="sectorId"
                  value={ticketData.sectorId}
                  onChange={(e) => setTicketData(prev => ({ ...prev, sectorId: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                  required
                >
                  <option value="">Selecione um setor</option>
                  {sectors.map(sector => (
                    <option key={sector.id} value={sector.id}>
                      {sector.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <select
                  id="priority"
                  value={ticketData.priority}
                  onChange={(e) => setTicketData(prev => ({ ...prev, priority: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="type">Tipo</Label>
                <select
                  id="type"
                  value={ticketData.type}
                  onChange={(e) => setTicketData(prev => ({ ...prev, type: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                >
                  <option value="problem">Problema</option>
                  <option value="error">Erro</option>
                  <option value="question">Dúvida</option>
                  <option value="incident">Incidente</option>
                  <option value="task">Tarefa</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={ticketData.status}
                  onChange={(e) => setTicketData(prev => ({ ...prev, status: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                >
                  <option value="Novo">Novo</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Aguardando">Aguardando</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Resumo do Problema
            </h3>
            
            {/* Formatting Toolbar */}
            <div className="flex items-center space-x-2 mb-3 p-2 bg-slate-50 dark:bg-slate-700 rounded-md">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => addFormatting('bold')}
                className="h-8 w-8 p-0"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => addFormatting('italic')}
                className="h-8 w-8 p-0"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => addFormatting('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Link className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              id="description"
              value={ticketData.description}
              onChange={(e) => setTicketData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva detalhadamente o problema ou solicitação..."
              className="min-h-[200px]"
              required
            />
            
            {/* Message Options */}
            <div className="flex items-center justify-between mt-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-md">
              <div className="flex items-center space-x-2">
                {isPublic ? (
                  <Eye className="h-4 w-4 text-green-600" />
                ) : (
                  <EyeOff className="h-4 w-4 text-orange-600" />
                )}
                <Label className="text-sm">
                  {isPublic ? 'Mensagem pública (visível pelo cliente)' : 'Mensagem privada (apenas equipe interna)'}
                </Label>
              </div>
              <Switch
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>
          </Card>

          {/* Additional Options */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Opções Adicionais
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4 mr-2" />
                  Anexar arquivos
                </Button>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Formatos aceitos: PDF, DOC, PNG, JPG (máx. 10MB)
                </span>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 <strong>Dica:</strong> Forneça o máximo de detalhes possível para agilizar o atendimento. 
                  Inclua mensagens de erro, capturas de tela e passos para reproduzir o problema.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
