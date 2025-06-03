
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Clock, MessageSquare, Paperclip, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PriorityHelper } from './PriorityHelper';
import { BaseTicket, PriorityLevel, TicketStatus } from '@/types/ticket';
import { getPriorityColor, getPriorityLabel, getStatusColor } from '@/utils/ticketHelpers';

interface TicketDetailModalProps {
  ticket: BaseTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTicket: (ticketId: string, updates: Partial<BaseTicket>) => void;
}

const STATUS_OPTIONS = [
  { value: 'Novo', label: 'Novo' },
  { value: 'Em Andamento', label: 'Em Andamento' },
  { value: 'Aguardando', label: 'Aguardando' },
  { value: 'Resolvido', label: 'Resolvido' }
] as const;

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baixa' },
  { value: 'medium', label: 'Média' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' }
] as const;

export const TicketDetailModal = ({ ticket, isOpen, onClose, onUpdateTicket }: TicketDetailModalProps) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const { toast } = useToast();

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPriority(ticket.priority);
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleSave = () => {
    if (response.trim()) {
      toast({
        title: "Resposta enviada",
        description: "Sua resposta foi enviada ao cliente com sucesso.",
      });
    }

    const updates: Partial<BaseTicket> = {};
    if (status !== ticket.status) {
      updates.status = status;
    }
    if (priority !== ticket.priority) {
      updates.priority = priority;
    }

    if (Object.keys(updates).length > 0) {
      onUpdateTicket(ticket.id, updates);
      toast({
        title: "Chamado atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
    }

    setResponse('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Chamado {ticket.id}</span>
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getPriorityColor(priority)}`}>
                {getPriorityLabel(priority)}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(status as TicketStatus)}`}>
                {status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{ticket.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{ticket.description}</p>
              
              <PriorityHelper 
                description={ticket.description}
                onPrioritySuggestion={setPriority}
              />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status do Chamado</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Prioridade</label>
              <Select value={priority} onValueChange={(value: PriorityLevel) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

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
