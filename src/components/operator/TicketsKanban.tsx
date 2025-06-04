import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDroppable,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, User, MessageSquare, Paperclip, AlertTriangle, Search, Filter } from 'lucide-react';
import { TicketDetailModal } from './TicketDetailModal';
import { SectorFilter } from './SectorFilter';
import { CriticalTimeAlert } from './CriticalTimeAlert';
import { useCriticalTimeAlerts, getCriticalAlertStyles } from '@/hooks/useCriticalTimeAlerts';

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
  sectorId?: string;
  hasCustomerReply: boolean;
}

interface Sector {
  id: string;
  name: string;
  color: string;
}

interface SortableTicketCardProps {
  ticket: Ticket;
  onClick: (ticket: Ticket, event?: React.MouseEvent) => void;
  isDragOverlay?: boolean;
}

const SortableTicketCard = ({ ticket, onClick, isDragOverlay = false }: SortableTicketCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const { isCritical, alertLevel } = useCriticalTimeAlerts(ticket);
  const criticalStyles = getCriticalAlertStyles(alertLevel);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragOverlay ? 1 : (isDragging ? 0.5 : 1),
    zIndex: isDragOverlay ? 1000 : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
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

  const handleClick = (event: React.MouseEvent) => {
    if (!isDragging && !isDragOverlay) {
      event.stopPropagation();
      window.location.href = `/chamados/${ticket.id}`;
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 ${
        isDragging ? 'shadow-lg ring-2 ring-blue-500 rotate-2' : ''
      } ${isDragOverlay ? 'shadow-xl rotate-3 scale-105' : ''} ${
        isCritical ? criticalStyles.cardClass : ''
      }`}
      onClick={handleClick}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{ticket.id}</span>
            {isCritical && (
              <CriticalTimeAlert ticket={ticket} showBadge={false} showIcon={true} />
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Badge className={`text-xs ${getPriorityColor(ticket.priority)} flex items-center`}>
              {getPriorityIcon(ticket.priority)}
              {getPriorityLabel(ticket.priority)}
            </Badge>
          </div>
        </div>

        {/* Critical Alert Badge */}
        {isCritical && (
          <div className="flex justify-start">
            <CriticalTimeAlert ticket={ticket} showBadge={true} showIcon={false} />
          </div>
        )}

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

// DroppableColumn component
const DroppableColumn = ({ 
  column, 
  tickets, 
  onTicketClick,
  isOver 
}: { 
  column: any;
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket, event?: React.MouseEvent) => void;
  isOver?: boolean;
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="space-y-4">
      <div 
        ref={setNodeRef} 
        className={`p-4 rounded-lg border-2 transition-all duration-200 min-h-[400px] ${column.color} ${
          isOver ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50 dark:bg-blue-950/30' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-[#F6F6F6]">{column.title}</h3>
          <span className="text-xs font-medium bg-white dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">
            {tickets.length}
          </span>
        </div>

        <SortableContext
          items={tickets.map(ticket => ticket.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 min-h-[200px]">
            {tickets.map((ticket) => (
              <SortableTicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={onTicketClick}
              />
            ))}
            {tickets.length === 0 && (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                <p className="text-sm">Nenhum chamado</p>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export const TicketsKanban = ({ userRole, prefilterStatus }: TicketsKanbanProps) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(prefilterStatus || 'all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  
  const [sectors] = useState<Sector[]>([
    { id: '1', name: 'Suporte N1', color: '#3b82f6' },
    { id: '2', name: 'Suporte N2', color: '#f59e0b' },
    { id: '3', name: 'Suporte N3', color: '#ef4444' },
    { id: '4', name: 'Desenvolvimento', color: '#10b981' },
    { id: '5', name: 'Infraestrutura', color: '#8b5cf6' },
  ]);

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
      description: 'Não consigo acessar minha conta de email desde ontem',
      sectorId: '1',
      hasCustomerReply: false
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
      description: 'Preciso instalar o Adobe Reader para abrir documentos PDF',
      sectorId: '1',
      hasCustomerReply: false
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
      description: 'Meu computador está travando várias vezes ao dia',
      sectorId: '2',
      hasCustomerReply: true
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
      description: 'Esqueci a senha do sistema ERP',
      sectorId: '4',
      hasCustomerReply: false
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
      description: 'Nova impressora não está sendo reconhecida',
      sectorId: '5',
      hasCustomerReply: false
    }
  ]);

  // Apply prefilter when prop changes
  useEffect(() => {
    if (prefilterStatus) {
      setStatusFilter(prefilterStatus);
    }
  }, [prefilterStatus]);

  // Filter tickets based on search, filters, and sector
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesSector = selectedSector === 'all' || ticket.sectorId === selectedSector;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesSector;
  });

  // Calculate ticket counts per sector
  const ticketCounts = {
    all: tickets.length,
    ...sectors.reduce((acc, sector) => {
      acc[sector.id] = tickets.filter(ticket => ticket.sectorId === sector.id).length;
      return acc;
    }, {} as Record<string, number>)
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
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

  const getSectorBadge = (sectorId?: string) => {
    if (!sectorId) return null;
    const sector = sectors.find(s => s.id === sectorId);
    if (!sector) return null;
    
    return (
      <Badge 
        className="text-xs text-white"
        style={{ backgroundColor: sector.color }}
      >
        {sector.name}
      </Badge>
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    setOverId(event.over?.id as string || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);
    setOverId(null);

    if (!over) return;

    const activeTicket = tickets.find(ticket => ticket.id === active.id);
    if (!activeTicket) return;

    const newStatus = over.id as string;
    
    console.log('Dragging ticket:', activeTicket.id, 'to status:', newStatus);
    
    if (activeTicket.status !== newStatus) {
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === activeTicket.id 
            ? { ...ticket, status: newStatus, updatedAt: new Date().toLocaleString('pt-BR') }
            : ticket
        )
      );
      console.log('Ticket status updated successfully');
    }
  };

  const handleTicketClick = (ticket: Ticket, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    window.location.href = `/chamados/${ticket.id}`;
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

  const activeTicket = activeId ? tickets.find(ticket => ticket.id === activeId) : null;

  return (
    <>
      {/* Sector Filter */}
      <SectorFilter
        sectors={sectors}
        selectedSector={selectedSector}
        onSectorChange={setSelectedSector}
        ticketCounts={ticketCounts}
      />

      {/* Filters and Search Bar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar por ID, título, descrição ou solicitante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
            >
              <option value="all">Todos os Status</option>
              <option value="Novo">Novo</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Resolvido">Resolvido</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </Card>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => {
            const columnTickets = getTicketsByStatus(column.id);
            
            return (
              <DroppableColumn
                key={column.id}
                column={column}
                tickets={columnTickets}
                onTicketClick={handleTicketClick}
                isOver={overId === column.id}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeTicket ? (
            <SortableTicketCard
              ticket={activeTicket}
              onClick={() => {}}
              isDragOverlay={true}
            />
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
