
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MessageSquare, Paperclip, MoreHorizontal } from 'lucide-react';
import { TicketDetailModal } from './TicketDetailModal';
import { useToast } from '@/hooks/use-toast';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TicketsKanbanProps {
  userRole: string;
}

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

const SortableTicketCard = ({ ticket, onClick }: { ticket: Ticket; onClick: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      {/* Ticket Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.id}</p>
          <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
            {getPriorityLabel(ticket.priority)}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Ticket Content */}
      <h4 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-2 line-clamp-2">
        {ticket.title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
        {ticket.description}
      </p>

      {/* Ticket Meta */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{ticket.category}</span>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {ticket.createdAt}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
            <User className="h-3 w-3 mr-1" />
            {ticket.requester}
          </div>
          <div className="flex items-center space-x-2">
            {ticket.responses > 0 && (
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <MessageSquare className="h-3 w-3 mr-1" />
                {ticket.responses}
              </div>
            )}
            {ticket.attachments > 0 && (
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Paperclip className="h-3 w-3 mr-1" />
                {ticket.attachments}
              </div>
            )}
          </div>
        </div>

        {ticket.assignee && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-600">
            <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                <span className="text-blue-600 font-medium">
                  {ticket.assignee.charAt(0).toUpperCase()}
                </span>
              </div>
              {ticket.assignee}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const TicketsKanban = ({ userRole }: TicketsKanbanProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { toast } = useToast();

  const [tickets, setTickets] = useState<Record<string, Ticket[]>>({
    new: [
      {
        id: '#2024-001',
        title: 'Problema com acesso ao email',
        description: 'Não consigo acessar minha conta de email desde ontem',
        priority: 'high',
        category: 'Email',
        assignee: '',
        requester: 'Maria Silva',
        createdAt: '2h',
        responses: 0,
        attachments: 1,
        status: 'Novo'
      },
      {
        id: '#2024-002', 
        title: 'Instalação do Adobe Reader',
        description: 'Preciso instalar o Adobe Reader para abrir documentos PDF',
        priority: 'medium',
        category: 'Software',
        assignee: '',
        requester: 'João Santos',
        createdAt: '1h',
        responses: 0,
        attachments: 0,
        status: 'Novo'
      }
    ],
    inProgress: [
      {
        id: '#2024-003',
        title: 'Computador travando constantemente',
        description: 'Meu computador está travando várias vezes ao dia',
        priority: 'urgent',
        category: 'Hardware',
        assignee: 'operador',
        requester: 'Ana Costa',
        createdAt: '3h',
        responses: 2,
        attachments: 2,
        status: 'Em Andamento'
      }
    ],
    waiting: [
      {
        id: '#2024-004',
        title: 'Reset de senha do sistema',
        description: 'Esqueci a senha do sistema ERP',
        priority: 'medium',
        category: 'Acesso',
        assignee: 'operador',
        requester: 'Carlos Oliveira',
        createdAt: '1d',
        responses: 1,
        attachments: 0,
        status: 'Aguardando'
      }
    ],
    resolved: [
      {
        id: '#2024-005',
        title: 'Configuração de impressora',
        description: 'Nova impressora não está sendo reconhecida',
        priority: 'low',
        category: 'Hardware',
        assignee: 'operador',
        requester: 'Paula Mendes',
        createdAt: '2d',
        responses: 3,
        attachments: 1,
        status: 'Resolvido'
      }
    ]
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { key: 'new', title: 'Novos', color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800', count: tickets.new.length },
    { key: 'inProgress', title: 'Em Andamento', color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800', count: tickets.inProgress.length },
    { key: 'waiting', title: 'Aguardando', color: 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800', count: tickets.waiting.length },
    { key: 'resolved', title: 'Resolvidos', color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800', count: tickets.resolved.length }
  ];

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets => {
      const newTickets = { ...prevTickets };
      
      // Find the ticket and update it
      for (const [columnKey, columnTickets] of Object.entries(newTickets)) {
        const ticketIndex = columnTickets.findIndex(t => t.id === ticketId);
        if (ticketIndex !== -1) {
          const updatedTicket = { ...columnTickets[ticketIndex], ...updates };
          
          // If status changed, move to appropriate column
          if (updates.status && updates.status !== columnTickets[ticketIndex].status) {
            // Remove from current column
            newTickets[columnKey] = columnTickets.filter(t => t.id !== ticketId);
            
            // Add to new column based on status
            const targetColumn = getColumnKeyFromStatus(updates.status);
            if (targetColumn && newTickets[targetColumn]) {
              newTickets[targetColumn] = [...newTickets[targetColumn], updatedTicket];
            }
          } else {
            // Just update in place
            newTickets[columnKey][ticketIndex] = updatedTicket;
          }
          break;
        }
      }
      
      return newTickets;
    });
  };

  const getColumnKeyFromStatus = (status: string): string | null => {
    switch (status) {
      case 'Novo': return 'new';
      case 'Em Andamento': return 'inProgress';
      case 'Aguardando': return 'waiting';
      case 'Resolvido': return 'resolved';
      default: return null;
    }
  };

  const getStatusFromColumnKey = (columnKey: string): string => {
    switch (columnKey) {
      case 'new': return 'Novo';
      case 'inProgress': return 'Em Andamento';
      case 'waiting': return 'Aguardando';
      case 'resolved': return 'Resolvido';
      default: return 'Novo';
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeTicketId = active.id as string;
    const overColumnId = over.id as string;

    // Find the current column of the dragged ticket
    let sourceColumn: string | null = null;
    let draggedTicket: Ticket | null = null;

    for (const [columnKey, columnTickets] of Object.entries(tickets)) {
      const ticket = columnTickets.find(t => t.id === activeTicketId);
      if (ticket) {
        sourceColumn = columnKey;
        draggedTicket = ticket;
        break;
      }
    }

    if (!sourceColumn || !draggedTicket || sourceColumn === overColumnId) return;

    // Update ticket status and move between columns
    const newStatus = getStatusFromColumnKey(overColumnId);
    
    setTickets(prevTickets => {
      const newTickets = { ...prevTickets };
      
      // Remove from source column
      newTickets[sourceColumn] = newTickets[sourceColumn].filter(t => t.id !== activeTicketId);
      
      // Add to target column with updated status
      const updatedTicket = { ...draggedTicket, status: newStatus };
      newTickets[overColumnId] = [...newTickets[overColumnId], updatedTicket];
      
      return newTickets;
    });

    toast({
      title: "Chamado movido",
      description: `Chamado ${activeTicketId} movido para: ${newStatus}`,
    });
  };

  const findTicketById = (id: string): Ticket | null => {
    for (const columnTickets of Object.values(tickets)) {
      const ticket = columnTickets.find(t => t.id === id);
      if (ticket) return ticket;
    }
    return null;
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.key} className="space-y-4">
              {/* Column Header */}
              <div className={`p-4 rounded-lg ${column.color}`}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{column.title}</h3>
                  <Badge variant="secondary" className="bg-white/80 dark:bg-slate-800/80">
                    {column.count}
                  </Badge>
                </div>
              </div>

              {/* Tickets */}
              <SortableContext items={tickets[column.key]?.map(t => t.id) || []} strategy={verticalListSortingStrategy}>
                <div className="space-y-3 min-h-[200px] p-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-600" id={column.key}>
                  {tickets[column.key]?.map((ticket) => (
                    <SortableTicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onClick={() => handleTicketClick(ticket)}
                    />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <Card className="p-4 shadow-lg transform rotate-3 opacity-90">
              <p className="font-medium">{findTicketById(activeId)?.title}</p>
            </Card>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTicket(null);
        }}
        onUpdateTicket={handleUpdateTicket}
      />
    </>
  );
};
