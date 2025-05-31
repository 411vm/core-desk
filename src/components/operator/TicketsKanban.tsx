import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, User, MessageSquare, Paperclip, AlertTriangle } from 'lucide-react';
import { TicketDetailModal } from './TicketDetailModal';

interface TicketsKanbanProps {
  userRole: string;
  prefilterStatus?: string;
}

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: string;
  requester: string;
  createdAt: string;
  updatedAt: string;
  responses: number;
  attachments: number;
  description: string;
}

interface SortableTicketCardProps {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

const SortableTicketCard = ({ ticket, onClick }: SortableTicketCardProps) => {
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

  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent' || priority === 'high') {
      return <AlertTriangle className="h-3 w-3 mr-1" />;
    }
    return null;
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      onClick={() => onClick(ticket)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{ticket.id}</span>
          <Badge className={`text-xs ${getPriorityColor(ticket.priority)} flex items-center`}>
            {getPriorityIcon(ticket.priority)}
            {getPriorityLabel(ticket.priority)}
          </Badge>
        </div>

        {/* Title */}
        <h4 className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6] line-clamp-2 leading-tight">
          {ticket.title}
        </h4>

        {/* Category */}
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs">
            {ticket.category}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-3">
            {ticket.responses > 0 && (
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                {ticket.responses}
              </div>
            )}
            {ticket.attachments > 0 && (
              <div className="flex items-center">
                <Paperclip className="h-3 w-3 mr-1" />
                {ticket.attachments}
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            {ticket.assignee ? (
              <div className="flex items-center">
                <div className="w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-1">
                  <span className="text-blue-600 dark:text-blue-300 text-xs font-medium">
                    {ticket.assignee.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs">{ticket.assignee}</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400">Não atribuído</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export const TicketsKanban = ({ userRole, prefilterStatus }: TicketsKanbanProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: '#2024-001',
      title: 'Problema com acesso ao email',
      status: 'Novo',
      priority: 'high',
      category: 'Email',
      assignee: '',
      requester: 'Maria Silva',
      createdAt: '2024-01-15 14:30',
      updatedAt: '2024-01-15 14:30',
      responses: 0,
      attachments: 1,
      description: 'Não consigo acessar minha conta de email desde ontem'
    },
    {
      id: '#2024-002',
      title: 'Instalação do Adobe Reader',
      status: 'Novo',
      priority: 'medium',
      category: 'Software',
      assignee: '',
      requester: 'João Santos',
      createdAt: '2024-01-15 15:45',
      updatedAt: '2024-01-15 15:45',
      responses: 0,
      attachments: 0,
      description: 'Preciso instalar o Adobe Reader para abrir documentos PDF'
    },
    {
      id: '#2024-003',
      title: 'Computador travando constantemente',
      status: 'Em Andamento',
      priority: 'urgent',
      category: 'Hardware',
      assignee: 'operador',
      requester: 'Ana Costa',
      createdAt: '2024-01-15 13:20',
      updatedAt: '2024-01-15 16:10',
      responses: 2,
      attachments: 2,
      description: 'Meu computador está travando várias vezes ao dia'
    },
    {
      id: '#2024-004',
      title: 'Reset de senha do sistema',
      status: 'Aguardando',
      priority: 'medium',
      category: 'Acesso',
      assignee: 'operador',
      requester: 'Carlos Oliveira',
      createdAt: '2024-01-14 09:15',
      updatedAt: '2024-01-15 11:30',
      responses: 1,
      attachments: 0,
      description: 'Esqueci a senha do sistema ERP'
    },
    {
      id: '#2024-005',
      title: 'Configuração de impressora',
      status: 'Resolvido',
      priority: 'low',
      category: 'Hardware',
      assignee: 'operador',
      requester: 'Paula Mendes',
      createdAt: '2024-01-13 16:00',
      updatedAt: '2024-01-15 10:45',
      responses: 3,
      attachments: 1,
      description: 'Nova impressora não está sendo reconhecida'
    }
  ]);

  // Filter tickets if prefilter is provided
  const filteredTickets = prefilterStatus 
    ? tickets.filter(ticket => ticket.status === prefilterStatus)
    : tickets;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'Novo', title: 'Novos', color: 'border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800' },
    { id: 'Em Andamento', title: 'Em Andamento', color: 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800' },
    { id: 'Aguardando', title: 'Aguardando', color: 'border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800' },
    { id: 'Resolvido', title: 'Resolvidos', color: 'border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800' }
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeTicket = filteredTickets.find(ticket => ticket.id === active.id);
    if (!activeTicket) return;

    const newStatus = over.id as string;
    
    if (activeTicket.status !== newStatus) {
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === activeTicket.id 
            ? { ...ticket, status: newStatus, updatedAt: new Date().toLocaleString('pt-BR') }
            : ticket
        )
      );
    }
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      )
    );
  };

  const getTicketsByStatus = (status: string) => {
    return filteredTickets.filter(ticket => ticket.status === status);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTickets = getTicketsByStatus(column.id);
            
            return (
              <div key={column.id} className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${column.color}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text-[#F6F6F6]">{column.title}</h3>
                    <span className="text-xs font-medium bg-white dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
                      {columnTickets.length}
                    </span>
                  </div>

                  <SortableContext
                    items={columnTickets.map(ticket => ticket.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3 min-h-[200px]">
                      {columnTickets.map((ticket) => (
                        <SortableTicketCard
                          key={ticket.id}
                          ticket={ticket}
                          onClick={handleTicketClick}
                        />
                      ))}
                      {columnTickets.length === 0 && (
                        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                          <p className="text-sm">Nenhum chamado</p>
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </div>
              </div>
            );
          })}
        </div>
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
