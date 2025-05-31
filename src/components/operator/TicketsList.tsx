import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Search, MoreHorizontal, Clock, User, MessageSquare, Paperclip } from 'lucide-react';
import { TicketDetailModal } from './TicketDetailModal';

interface TicketsListProps {
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

export const TicketsList = ({ userRole, prefilterStatus }: TicketsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(prefilterStatus || 'all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Apply prefilter when prop changes
  useEffect(() => {
    if (prefilterStatus) {
      setStatusFilter(prefilterStatus);
    }
  }, [prefilterStatus]);

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

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.requester.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <>
      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar por ID, título ou solicitante..."
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

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Criado</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow 
                  key={ticket.id} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  onClick={() => handleTicketClick(ticket)}
                >
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-[#F6F6F6] line-clamp-1">{ticket.title}</p>
                      <div className="flex items-center space-x-3 mt-1">
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
                  </TableCell>
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
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-slate-600 dark:text-slate-300 text-xs font-medium">
                          {ticket.requester.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {ticket.requester}
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.assignee ? (
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-2">
                          <span className="text-blue-600 dark:text-blue-300 text-xs font-medium">
                            {ticket.assignee.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {ticket.assignee}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">Não atribuído</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-300">{ticket.createdAt}</TableCell>
                  <TableCell className="text-sm text-slate-600 dark:text-slate-300">{ticket.updatedAt}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            Nenhum chamado encontrado com os filtros aplicados.
          </div>
        )}
      </Card>

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
