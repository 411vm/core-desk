import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  Eye,
  ArrowRight,
  Plus
} from 'lucide-react';

// Mock data expandido
const allUserTickets = [
  {
    id: 'CHM-001',
    title: 'Problema de login no sistema',
    description: 'Não consigo acessar o sistema com minhas credenciais',
    status: 'Em Andamento',
    priority: 'Média',
    setor: 'TI',
    tipo: 'Suporte',
    lastUpdate: '2024-01-16',
    hasNewReply: true,
    operatorName: 'Carlos Silva'
  },
  {
    id: 'CHM-002',
    title: 'Solicitação de nova funcionalidade',
    description: 'Gostaria de solicitar implementação de relatórios avançados',
    status: 'Aguardando',
    priority: 'Baixa',
    setor: 'Desenvolvimento',
    tipo: 'Feature',
    lastUpdate: '2024-01-12',
    hasNewReply: false,
    operatorName: 'Ana Costa'
  },
  {
    id: 'CHM-003',
    title: 'Lentidão no carregamento das páginas',
    description: 'Sistema está muito lento para carregar',
    status: 'Resolvido',
    priority: 'Alta',
    setor: 'Infraestrutura',
    tipo: 'Bug',
    lastUpdate: '2024-01-08',
    hasNewReply: false,
    operatorName: 'João Santos'
  },
  {
    id: 'CHM-004',
    title: 'Problema com impressora',
    description: 'Impressora não está funcionando corretamente',
    status: 'Aberto',
    priority: 'Média',
    setor: 'TI',
    tipo: 'Suporte',
    lastUpdate: '2024-01-15',
    hasNewReply: false,
    operatorName: 'Maria Silva'
  },
  {
    id: 'CHM-005',
    title: 'Configuração de email corporativo',
    description: 'Preciso configurar o email no meu celular',
    status: 'Em Andamento',
    priority: 'Baixa',
    setor: 'TI',
    tipo: 'Configuração',
    lastUpdate: '2024-01-14',
    hasNewReply: true,
    operatorName: 'Pedro Oliveira'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Em Andamento':
      return 'bg-yellow-100 text-yellow-800';
    case 'Resolvido':
      return 'bg-green-100 text-green-800';
    case 'Aguardando':
      return 'bg-blue-100 text-blue-800';
    case 'Aberto':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-800';
    case 'Média':
      return 'bg-yellow-100 text-yellow-800';
    case 'Baixa':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const MeusTickets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [setorFilter, setSetorFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Verificar se o usuário está logado como cliente
  const customerData = localStorage.getItem('coredesk_customer');
  
  if (!customerData) {
    window.location.href = '/customer-login';
    return null;
  }

  // Verificar se há um chamado específico na URL
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const chamadoId = urlParams.get('chamado');
    if (chamadoId) {
      setSelectedTicket(chamadoId);
    }
  }, []);

  // Filtrar tickets
  const filteredTickets = allUserTickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
    const matchesSetor = setorFilter === '' || ticket.setor === setorFilter;
    const matchesTipo = tipoFilter === '' || ticket.tipo === tipoFilter;
    const matchesPriority = priorityFilter === '' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesSetor && matchesTipo && matchesPriority;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const handleViewTicket = (ticketId: string) => {
    window.location.href = `/chamados/${ticketId}`;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSetorFilter('');
    setTipoFilter('');
    setPriorityFilter('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, setorFilter, tipoFilter, priorityFilter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Meus Chamados
              </h1>
              <p className="text-slate-600">
                Acompanhe todos os seus chamados em um só lugar
              </p>
            </div>
            <Button onClick={() => window.location.href = '/abrir-chamado'}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Chamado
            </Button>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5" />
                Filtros e Busca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Buscar por ID, título ou descrição..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aberto">Aberto</SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Aguardando">Aguardando</SelectItem>
                    <SelectItem value="Resolvido">Resolvido</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={setorFilter} onValueChange={setSetorFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Setor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TI">TI</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                    <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Suporte">Suporte</SelectItem>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Configuração">Configuração</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(searchQuery || statusFilter || setorFilter || tipoFilter || priorityFilter) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    {filteredTickets.length} chamado(s) encontrado(s)
                  </p>
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Summary */}
          {filteredTickets.length > 0 && (
            <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
              <span>
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredTickets.length)} de {filteredTickets.length} chamado(s)
              </span>
              {totalPages > 1 && (
                <span>
                  Página {currentPage} de {totalPages}
                </span>
              )}
            </div>
          )}

          {/* Lista de Chamados - Cards Compactos */}
          <div className="space-y-3">
            {currentTickets.map((ticket) => (
              <Card 
                key={ticket.id}
                className={`cursor-pointer hover:shadow-md transition-all ${
                  ticket.hasNewReply ? 'border-blue-300 bg-blue-50/50' : 'hover:border-slate-300'
                } ${selectedTicket === ticket.id ? 'border-blue-500 shadow-lg' : ''}`}
                onClick={() => handleViewTicket(ticket.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-medium text-slate-600">
                        #{ticket.id}
                      </span>
                      {ticket.hasNewReply && (
                        <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                          Nova resposta
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </Badge>
                      <Badge className={`text-xs px-2 py-0.5 ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-1">
                    {ticket.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                    {ticket.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(ticket.lastUpdate).toLocaleDateString('pt-BR')}
                      </div>
                      <span>•</span>
                      <span>Operador: {ticket.operatorName}</span>
                      <span>•</span>
                      <span>{ticket.setor} - {ticket.tipo}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      Visualizar
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage = page === 1 || 
                                   page === totalPages || 
                                   Math.abs(page - currentPage) <= 1;
                    
                    if (!showPage) {
                      // Show ellipsis for gaps
                      if (page === 2 && currentPage > 4) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      if (page === totalPages - 1 && currentPage < totalPages - 3) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }

                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(page);
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {filteredTickets.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Nenhum chamado encontrado
                </h3>
                <p className="text-slate-600 mb-4">
                  {searchQuery || statusFilter || setorFilter || tipoFilter || priorityFilter
                    ? 'Tente ajustar os filtros para encontrar seus chamados'
                    : 'Você ainda não possui chamados abertos'
                  }
                </p>
                <Button onClick={() => window.location.href = '/abrir-chamado'}>
                  <Plus className="mr-2 h-4 w-4" />
                  Abrir Primeiro Chamado
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default MeusTickets;
