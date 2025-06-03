
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, User, Building, Tag, MessageSquare, Send, Edit, FileText, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getTicketById, getTicketResponses, TicketResponse, TicketDetail } from '@/data/mockTickets';

const TicketView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [newResponse, setNewResponse] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (id) {
      const ticketData = getTicketById(id);
      const ticketResponses = getTicketResponses(id);
      
      if (ticketData) {
        setTicket(ticketData);
        setResponses(ticketResponses);
      } else {
        // Se não encontrar o ticket, redireciona para 404
        navigate('/404');
      }
    }
  }, [id, navigate]);

  const handleSendResponse = () => {
    if (!newResponse.trim()) return;

    const response: TicketResponse = {
      id: Date.now().toString(),
      author: 'Operador Atual',
      content: newResponse,
      timestamp: new Date().toLocaleString('pt-BR'),
      type: 'staff',
      isPrivate
    };

    setResponses(prev => [...prev, response]);
    setNewResponse('');
    setIsPrivate(false);

    toast({
      title: "Resposta enviada",
      description: "Sua resposta foi adicionada ao chamado.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Aguardando': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolvido': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const getResponseTypeColor = (type: string, isPrivate: boolean) => {
    if (isPrivate) return 'border-l-orange-500 bg-orange-50';
    switch (type) {
      case 'customer': return 'border-l-blue-500 bg-blue-50';
      case 'staff': return 'border-l-green-500 bg-green-50';
      case 'system': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31] flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-300">Carregando chamado...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                    {ticket.title}
                  </h1>
                  <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </Badge>
                  <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityLabel(ticket.priority)}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Chamado {ticket.id} • Criado em {ticket.createdAt}
                </p>
                
                {/* Badges de categoria e setor */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <FileText className="h-4 w-4 mr-1" />
                    <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                      {ticket.category}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-xs text-blue-800 dark:text-blue-200">
                      {ticket.sector}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <h3 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-2">Descrição</h3>
                  <p className="text-slate-700 dark:text-slate-300">{ticket.description}</p>
                </div>
              </div>
              
              {/* Ações rápidas */}
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </div>
            </div>

            {/* Informações principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Solicitante</p>
                  <p className="font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.requester}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Setor Responsável</p>
                  <p className="font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.sector}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-slate-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Categoria</p>
                  <p className="font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.category}</p>
                </div>
              </div>

              {ticket.assignee && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Atribuído a</p>
                    <p className="font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.assignee}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Histórico de respostas */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Histórico de Interações
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {responses.map((response) => (
                  <div
                    key={response.id}
                    className={`p-4 rounded-lg border-l-4 ${getResponseTypeColor(response.type, response.isPrivate)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900 dark:text-[#F6F6F6]">
                          {response.author}
                        </span>
                        {response.isPrivate && (
                          <Badge variant="outline" className="text-xs">
                            Privado
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {response.timestamp}
                      </span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300">{response.content}</p>
                  </div>
                ))}
              </div>

              {/* Campo de resposta */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-3">
                  Adicionar resposta
                </h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Digite sua resposta..."
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                    rows={4}
                  />
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={(e) => setIsPrivate(e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Resposta privada (apenas equipe)
                      </span>
                    </label>
                    <Button onClick={handleSendResponse} disabled={!newResponse.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar com ações */}
          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-3">
                Ações rápidas
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Editar chamado
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Alterar status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reatribuir
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Adicionar anexo
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-3">
                Informações adicionais
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Respostas:</span>
                  <span className="text-slate-900 dark:text-[#F6F6F6]">{ticket.responses}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Anexos:</span>
                  <span className="text-slate-900 dark:text-[#F6F6F6]">{ticket.attachments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Última atualização:</span>
                  <span className="text-slate-900 dark:text-[#F6F6F6]">{ticket.updatedAt}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
