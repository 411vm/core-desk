
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Clock, MessageSquare, Paperclip, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: string;
  requester: string;
  createdAt: string;
  responses: number;
  attachments: number;
  status: string;
}

interface TicketDetailModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
}

export const TicketDetailModal = ({ ticket, isOpen, onClose, onUpdateTicket }: TicketDetailModalProps) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(ticket?.status || '');
  const { toast } = useToast();

  React.useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
    }
  }, [ticket]);

  if (!ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Aguardando': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolvido': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSave = () => {
    if (response.trim()) {
      toast({
        title: "Resposta enviada",
        description: "Sua resposta foi enviada ao cliente com sucesso.",
      });
    }

    if (status !== ticket.status) {
      onUpdateTicket(ticket.id, { status });
      toast({
        title: "Status atualizado",
        description: `Status do chamado alterado para: ${status}`,
      });
    }

    setResponse('');
    onClose();
  };

  const statusOptions = [
    { value: 'Novo', label: 'Novo' },
    { value: 'Em Andamento', label: 'Em Andamento' },
    { value: 'Aguardando', label: 'Aguardando' },
    { value: 'Resolvido', label: 'Resolvido' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Chamado {ticket.id}</span>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                {getPriorityLabel(ticket.priority)}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(status)}`}>
                {status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{ticket.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{ticket.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">Solicitante: </span>
                <span className="font-medium ml-1">{ticket.requester}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-slate-400" />
                <span className="text-slate-600 dark:text-slate-300">Criado: </span>
                <span className="font-medium ml-1">{ticket.createdAt}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-600 dark:text-slate-300">Categoria: </span>
                <span className="font-medium ml-1">{ticket.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-600 dark:text-slate-300">Responsável: </span>
                <span className="font-medium ml-1">{ticket.assignee || 'Não atribuído'}</span>
              </div>
            </div>

            {(ticket.responses > 0 || ticket.attachments > 0) && (
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                {ticket.responses > 0 && (
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {ticket.responses} respostas
                  </div>
                )}
                {ticket.attachments > 0 && (
                  <div className="flex items-center">
                    <Paperclip className="h-4 w-4 mr-1" />
                    {ticket.attachments} anexos
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Status Update */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status do Chamado</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Response */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Responder ao Cliente</label>
            <Textarea
              placeholder="Digite sua resposta para o cliente..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={handleSave} className="flex items-center">
            <Send className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
