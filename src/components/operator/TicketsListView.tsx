
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
  hasCustomerReply: boolean;
  updatedAt: string;
}

interface TicketsListViewProps {
  tickets: Ticket[];
  selectedTickets: string[];
  onTicketSelect: (ticketId: string) => void;
  onTicketClick: (ticket: Ticket) => void;
  onSelectAll: () => void;
}

export const TicketsListView = ({ 
  tickets, 
  selectedTickets, 
  onTicketSelect, 
  onTicketClick,
  onSelectAll 
}: TicketsListViewProps) => {
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedTickets.length === tickets.length && tickets.length > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Solicitante</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prioridade</TableHead>
            <TableHead>Atualizado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow 
              key={ticket.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              onClick={() => onTicketClick(ticket)}
            >
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={selectedTickets.includes(ticket.id)}
                  onCheckedChange={() => onTicketSelect(ticket.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell className="max-w-xs">
                <div className="truncate">{ticket.title}</div>
              </TableCell>
              <TableCell>{ticket.requester}</TableCell>
              <TableCell>
                <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                  {getPriorityLabel(ticket.priority)}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                {formatDate(ticket.updatedAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
