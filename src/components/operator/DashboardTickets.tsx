
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MessageSquare, Paperclip, MoreHorizontal, ChevronRight } from 'lucide-react';
import { TicketDetailModal } from './TicketDetailModal';
import { ViewToggle } from './ViewToggle';
import { TicketsListView } from './TicketsListView';
import { BulkActions } from './BulkActions';
import { QuickFilters } from './QuickFilters';
import { SmartSearch } from './SmartSearch';
import { CriticalTimeAlert } from './CriticalTimeAlert';
import { useCriticalTimeAlerts, getCriticalAlertStyles } from '@/hooks/useCriticalTimeAlerts';
import { useToast } from '@/hooks/use-toast';

interface DashboardTicketsProps {
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
  hasCustomerReply: boolean;
  updatedAt: string;
}

export const DashboardTickets = ({ userRole }: DashboardTicketsProps) => {
  const navigate = useNavigate();
  
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>(() => {
    return localStorage.getItem('dashboard-view-mode') as 'cards' | 'list' || 'cards';
  });
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const [activePriorityFilters, setActivePriorityFilters] = useState<string[]>([]);
  const { toast } = useToast();

  const [tickets, setTickets] = useState<Ticket[]>([
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
      status: 'Novo',
      hasCustomerReply: false,
      updatedAt: '2024-01-15 14:30'
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
      status: 'Novo',
      hasCustomerReply: false,
      updatedAt: '2024-01-15 15:45'
    },
    {
      id: '#2024-006',
      title: 'Erro na impressora da sala 203',
      description: 'A impressora está apresentando erro de papel emperrado',
      priority: 'medium',
      category: 'Hardware',
      assignee: 'operador',
      requester: 'Roberto Lima',
      createdAt: '30min',
      responses: 2,
      attachments: 0,
      status: 'Em Andamento',
      hasCustomerReply: true,
      updatedAt: '2024-01-15 16:30'
    },
    {
      id: '#2024-007',
      title: 'Solicitação de acesso ao sistema financeiro',
      description: 'Preciso de acesso para gerar relatórios mensais',
      priority: 'high',
      category: 'Acesso',
      assignee: '',
      requester: 'Sandra Costa',
      createdAt: '15min',
      responses: 0,
      attachments: 1,
      status: 'Novo',
      hasCustomerReply: false,
      updatedAt: '2024-01-15 17:00'
    }
  ]);

  useEffect(() => {
    localStorage.setItem('dashboard-view-mode', viewMode);
  }, [viewMode]);

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchTerm === '' || 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = activeStatusFilters.length === 0 || 
      activeStatusFilters.includes(ticket.status);
    
    const matchesPriority = activePriorityFilters.length === 0 || 
      activePriorityFilters.includes(ticket.priority);
    
    // Keep the original filter for new tickets or customer replies
    const isRecentOrReply = ticket.status === 'Novo' || ticket.hasCustomerReply;
    
    return matchesSearch && matchesStatus && matchesPriority && isRecentOrReply;
  });

  // Calculate critical alerts for all filtered tickets at the component level
  const ticketsWithCriticalData = useMemo(() => {
    return filteredTickets.map(ticket => {
      const criticalData = useCriticalTimeAlerts(ticket);
      return {
        ...ticket,
        criticalData
      };
    });
  }, [filteredTickets]);

  const handleTicketClick = (ticket: Ticket) => {
    // Remove o # do ID antes de navegar para evitar problemas de URL
    const ticketId = ticket.id.startsWith('#') ? ticket.id.substring(1) : ticket.id;
    console.log('Navigating to ticket:', ticketId);
    navigate(`/chamados/${ticketId}`);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      )
    );
  };

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(ticket => ticket.id));
    }
  };

  const handleBulkClose = () => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, status: 'Resolvido', updatedAt: new Date().toLocaleString('pt-BR') }
          : ticket
      )
    );
    setSelectedTickets([]);
    toast({
      title: "Chamados fechados",
      description: `${selectedTickets.length} chamado(s) foram fechados com sucesso.`,
    });
  };

  const handleBulkReassign = (assignee: string) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, assignee, updatedAt: new Date().toLocaleString('pt-BR') }
          : ticket
      )
    );
    setSelectedTickets([]);
    toast({
      title: "Chamados reatribuídos",
      description: `${selectedTickets.length} chamado(s) foram reatribuídos com sucesso.`,
    });
  };

  const handleBulkMove = (target: string) => {
    let newStatus = '';
    switch (target) {
      case 'suporte-n1':
      case 'suporte-n2':
      case 'suporte-n3':
      case 'desenvolvimento':
        newStatus = 'Em Andamento';
        break;
      case 'aguardando':
        newStatus = 'Aguardando';
        break;
      case 'concluido':
        newStatus = 'Resolvido';
        break;
      default:
        newStatus = 'Em Andamento';
    }

    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, status: newStatus, updatedAt: new Date().toLocaleString('pt-BR') }
          : ticket
      )
    );
    setSelectedTickets([]);
    toast({
      title: "Chamados movidos",
      description: `${selectedTickets.length} chamado(s) foram movidos com sucesso.`,
    });
  };

  const handleStatusFilterToggle = (status: string) => {
    setActiveStatusFilters(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handlePriorityFilterToggle = (priority: string) => {
    setActivePriorityFilters(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const handleClearFilters = () => {
    setActiveStatusFilters([]);
    setActivePriorityFilters([]);
    setSearchTerm('');
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
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
        </div>

        <div className="space-y-4">
          <SmartSearch 
            value={searchTerm} 
            onChange={setSearchTerm}
          />
          
          {/* Filtros rápidos posicionados abaixo do campo de pesquisa */}
          <QuickFilters
            activeStatusFilters={activeStatusFilters}
            activePriorityFilters={activePriorityFilters}
            onStatusFilterToggle={handleStatusFilterToggle}
            onPriorityFilterToggle={handlePriorityFilterToggle}
            onClearFilters={handleClearFilters}
          />

          {viewMode === 'list' ? (
            <TicketsListView
              tickets={filteredTickets}
              selectedTickets={selectedTickets}
              onTicketSelect={handleTicketSelect}
              onTicketClick={handleTicketClick}
              onSelectAll={handleSelectAll}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map((ticket) => {
                const criticalStyles = getCriticalAlertStyles('warning');
                
                return (
                  <Card 
                    key={ticket.id} 
                    className={`p-4 hover:shadow-md transition-all cursor-pointer group dark:bg-slate-800 dark:border-slate-700 hover:scale-102`}
                    onClick={() => handleTicketClick(ticket)}
                  >
                    {/* Ticket Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <div onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedTickets.includes(ticket.id)}
                              onChange={() => handleTicketSelect(ticket.id)}
                              className="rounded border-gray-300"
                            />
                          </div>
                          <p className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6]">{ticket.id}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                            {getPriorityLabel(ticket.priority)}
                          </Badge>
                          {ticket.hasCustomerReply && (
                            <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                              Retorno Cliente
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <div className="group-hover:bg-blue-100 p-1 rounded transition-colors" title="Ver detalhes">
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                        </div>
                      </div>
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
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
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
              })}
            </div>
          )}
        </div>
      </div>

      <BulkActions
        selectedCount={selectedTickets.length}
        onClose={() => setSelectedTickets([])}
        onBulkClose={handleBulkClose}
        onBulkReassign={handleBulkReassign}
        onBulkMove={handleBulkMove}
      />

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
