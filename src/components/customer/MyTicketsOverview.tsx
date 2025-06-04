
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

// Mock data - em produção viria do backend filtrado por usuário
const mockUserTickets = [
  {
    id: 'CHM-001',
    title: 'Problema de login no sistema',
    status: 'Em Andamento',
    priority: 'Média',
    createdAt: '2024-01-15',
    lastUpdate: '2024-01-16',
    category: 'Suporte',
    hasNewReply: true
  },
  {
    id: 'CHM-002',
    title: 'Solicitação de nova funcionalidade',
    status: 'Aguardando',
    priority: 'Baixa',
    createdAt: '2024-01-10',
    lastUpdate: '2024-01-12',
    category: 'Desenvolvimento',
    hasNewReply: false
  },
  {
    id: 'CHM-003',
    title: 'Lentidão no carregamento das páginas',
    status: 'Resolvido',
    priority: 'Alta',
    createdAt: '2024-01-05',
    lastUpdate: '2024-01-08',
    category: 'Infraestrutura',
    hasNewReply: false
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Em Andamento':
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'Resolvido':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'Aguardando':
      return <AlertCircle className="h-4 w-4 text-blue-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Em Andamento':
      return 'bg-yellow-100 text-yellow-800';
    case 'Resolvido':
      return 'bg-green-100 text-green-800';
    case 'Aguardando':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Alta':
      return 'bg-red-100 text-red-800';
    case 'Média':
      return 'bg-orange-100 text-orange-800';
    case 'Baixa':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const MyTicketsOverview = () => {
  const handleViewTicket = (ticketId: string) => {
    window.location.href = `/chamados/${ticketId}`;
  };

  const handleViewAllTickets = () => {
    window.location.href = '/meus-chamados';
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Meus Chamados
          </h2>
          <p className="text-slate-600">
            Acompanhe o status dos seus chamados abertos
          </p>
        </div>
        
        <Button onClick={handleViewAllTickets} variant="outline">
          Ver Todos
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        {mockUserTickets.slice(0, 3).map((ticket) => (
          <Card 
            key={ticket.id} 
            className={`group hover:shadow-md transition-all duration-200 cursor-pointer ${
              ticket.hasNewReply ? 'border-blue-300 bg-blue-50/30' : 'border-slate-200'
            }`}
            onClick={() => handleViewTicket(ticket.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-mono text-sm text-slate-500">#{ticket.id}</span>
                    {ticket.hasNewReply && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Nova resposta
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors mb-1">
                    {ticket.title}
                  </CardTitle>
                  <CardDescription>
                    Categoria: {ticket.category} • Criado em {new Date(ticket.createdAt).toLocaleDateString('pt-BR')}
                  </CardDescription>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(ticket.status)}
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Atualizado em {new Date(ticket.lastUpdate).toLocaleDateString('pt-BR')}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="group-hover:bg-blue-50">
                    <Eye className="mr-1 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                  {ticket.hasNewReply && (
                    <Button variant="ghost" size="sm" className="text-blue-600 group-hover:bg-blue-50">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Responder
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockUserTickets.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Nenhum chamado encontrado
            </h3>
            <p className="text-slate-500 mb-6">
              Você ainda não possui chamados abertos. Que tal criar o primeiro?
            </p>
            <Button onClick={() => window.location.href = '/create-ticket'}>
              <Plus className="mr-2 h-4 w-4" />
              Abrir Primeiro Chamado
            </Button>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
