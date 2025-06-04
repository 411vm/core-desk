
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  ArrowRight, 
  Clock,
  Eye,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Mock data - mesmo do componente original
const mockUserTickets = [
  {
    id: 'CHM-001',
    title: 'Problema de login no sistema',
    status: 'Em Andamento',
    priority: 'Média',
    lastUpdate: '2024-01-16',
    hasNewReply: true
  },
  {
    id: 'CHM-002',
    title: 'Solicitação de nova funcionalidade',
    status: 'Aguardando',
    priority: 'Baixa',
    lastUpdate: '2024-01-12',
    hasNewReply: false
  },
  {
    id: 'CHM-003',
    title: 'Lentidão no carregamento das páginas',
    status: 'Resolvido',
    priority: 'Alta',
    lastUpdate: '2024-01-08',
    hasNewReply: false
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
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const CompactMyTickets = () => {
  const [expanded, setExpanded] = useState(false);
  
  const handleViewTicket = (ticketId: string) => {
    window.location.href = `/chamados/${ticketId}`;
  };

  const handleViewAll = () => {
    window.location.href = '/meus-chamados';
  };

  const displayTickets = expanded ? mockUserTickets : mockUserTickets.slice(0, 2);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Meus Chamados</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleViewAll}>
            Ver Todos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {displayTickets.map((ticket) => (
            <div 
              key={ticket.id}
              className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${
                ticket.hasNewReply ? 'border-blue-300 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleViewTicket(ticket.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs text-slate-500">#{ticket.id}</span>
                  {ticket.hasNewReply && (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      Nova resposta
                    </Badge>
                  )}
                </div>
                <Badge className={`text-xs ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </Badge>
              </div>
              
              <h4 className="font-medium text-sm text-slate-900 mb-2 line-clamp-1">
                {ticket.title}
              </h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-slate-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(ticket.lastUpdate).toLocaleDateString('pt-BR')}
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  <Eye className="mr-1 h-3 w-3" />
                  Ver
                </Button>
              </div>
            </div>
          ))}
        </div>

        {mockUserTickets.length > 2 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-3 text-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp className="mr-1 h-3 w-3" />
                Mostrar Menos
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-3 w-3" />
                Mostrar Mais ({mockUserTickets.length - 2})
              </>
            )}
          </Button>
        )}

        {mockUserTickets.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500 mb-3">
              Nenhum chamado encontrado
            </p>
            <Button size="sm" onClick={() => window.location.href = '/create-ticket'}>
              Abrir Primeiro Chamado
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
