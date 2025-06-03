
import React, { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { useTicketFilters } from '@/hooks/useTicketFilters';
import { useTicketSelection } from '@/hooks/useTicketSelection';
import { BaseTicket } from '@/types/ticket';
import { getPriorityColor, getPriorityLabel, formatTicketId } from '@/utils/ticketHelpers';

interface DashboardTicketsProps {
  userRole: string;
}

export const DashboardTickets = ({ userRole }: DashboardTicketsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedTicket, setSelectedTicket] = useState<BaseTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>(() => {
    return localStorage.getItem('dashboard-view-mode') as 'cards' | 'list' || 'cards';
  });

  const [tickets, setTickets] = useState<BaseTicket[]>([
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

  const {
    searchTerm,
    setSearchTerm,
    activeStatusFilters,
    activePriorityFilters,
    filteredTickets,
    handleStatusFilterToggle,
    handlePriorityFilterToggle,
    handleClearFilters
  } = useTicketFilters(tickets);

  const {
    selectedTickets,
    handleTicketSelect,
    handleSelectAll,
    clearSelection
  } = useTicketSelection();

  useEffect(() => {
    localStorage.setItem('dashboard-view-mode', viewMode);
  }, [viewMode]);

  const handleTicketClick = (ticket: BaseTicket) => {
    const ticketId = formatTicketId(ticket.id);
    console.log('Navigating to ticket:', ticketId);
    navigate(`/chamados/${ticketId}`);
  };

  const handleUpdateTicket = (ticketId: string, updates: Partial<BaseTicket>) => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === ticketId ? { ...ticket, ...updates } : ticket
      )
    );
  };

  const handleBulkClose = () => {
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, status: 'Resolvido', updatedAt: new Date().toLocaleString('pt-BR') }
          : ticket
      )
    );
    clearSelection();
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
    clearSelection();
    toast({
      title: "Chamados reatribuídos",
      description: `${selectedTickets.length} chamado(s) foram reatribuídos com sucesso.`,
    });
  };

  const handleBulkMove = (target: string) => {
    const statusMap: Record<string, string> = {
      'suporte-n1': 'Em Andamento',
      'suporte-n2': 'Em Andamento',
      'suporte-n3': 'Em Andamento',
      'desenvolvimento': 'Em Andamento',
      'aguardando': 'Aguardando',
      'concluido': 'Resolvido'
    };
    
    const newStatus = statusMap[target] || 'Em Andamento';

    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        selectedTickets.includes(ticket.id) 
          ? { ...ticket, status: newStatus, updatedAt: new Date().toLocaleString('pt-BR') }
          : ticket
      )
    );
    clearSelection();
    toast({
      title: "Chamados movidos",
      description: `${selectedTickets.length} chamado(s) foram movidos com sucesso.`,
    });
  };

  const renderTicketCard = (ticket: BaseTicket) => (
    <Card 
      key={ticket.id} 
      className="p-4 hover:shadow-md transition-all cursor-pointer group dark:bg-slate-800 dark:border-slate-700 hover:scale-102"
      onClick={() => handleTicketClick(ticket)}
    >
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

      <h4 className="font-medium text-slate-900 dark:text-[#F6F6F6] mb-2 line-clamp-2">
        {ticket.title}
      </h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
        {ticket.description}
      </p>

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
              onSelectAll={() => handleSelectAll(filteredTickets.map(t => t.id))}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTickets.map(renderTicketCard)}
            </div>
          )}
        </div>
      </div>

      <BulkActions
        selectedCount={selectedTickets.length}
        onClose={clearSelection}
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
