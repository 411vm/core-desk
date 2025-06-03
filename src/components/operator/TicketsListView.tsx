
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CriticalTimeAlert } from './CriticalTimeAlert';
import { useCriticalTimeAlerts, getCriticalAlertStyles } from '@/hooks/useCriticalTimeAlerts';
import { BaseTicket } from '@/types/ticket';
import { getPriorityColor, getPriorityLabel, getStatusColor, formatTicketId } from '@/utils/ticketHelpers';

interface TicketsListViewProps {
  tickets: BaseTicket[];
  selectedTickets: string[];
  onTicketSelect: (ticketId: string) => void;
  onTicketClick: (ticket: BaseTicket) => void;
  onSelectAll: () => void;
}

export const TicketsListView = ({ 
  tickets, 
  selectedTickets, 
  onTicketSelect, 
  onTicketClick,
  onSelectAll 
}: TicketsListViewProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const handleRowClick = (ticket: BaseTicket) => {
    const ticketId = formatTicketId(ticket.id);
    navigate(`/chamados/${ticketId}`);
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
          {tickets.map((ticket) => {
            const { isCritical, alertLevel } = useCriticalTimeAlerts(ticket);
            const criticalStyles = getCriticalAlertStyles(alertLevel);
            
            return (
              <TableRow 
                key={ticket.id}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                  isCritical ? criticalStyles.cardClass : ''
                }`}
                onClick={() => handleRowClick(ticket)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedTickets.includes(ticket.id)}
                    onCheckedChange={() => onTicketSelect(ticket.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <span>{ticket.id}</span>
                    {isCritical && (
                      <CriticalTimeAlert ticket={ticket} showBadge={false} showIcon={true} />
                    )}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="space-y-1">
                    <div className="truncate">{ticket.title}</div>
                    {isCritical && (
                      <CriticalTimeAlert ticket={ticket} showBadge={true} showIcon={false} />
                    )}
                  </div>
                </TableCell>
                <TableCell>{ticket.requester}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${getStatusColor(ticket.status as any)}`}>
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
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
};
