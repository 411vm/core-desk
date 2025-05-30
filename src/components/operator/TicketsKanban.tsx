
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MessageSquare, Paperclip, MoreHorizontal } from 'lucide-react';

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
}

export const TicketsKanban = ({ userRole }: TicketsKanbanProps) => {
  const mockTickets: Record<string, Ticket[]> = {
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
        attachments: 1
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
        attachments: 0
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
        attachments: 2
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
        attachments: 0
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
        attachments: 1
      }
    ]
  };

  const columns = [
    { key: 'new', title: 'Novos', color: 'bg-blue-50 border-blue-200', count: mockTickets.new.length },
    { key: 'inProgress', title: 'Em Andamento', color: 'bg-yellow-50 border-yellow-200', count: mockTickets.inProgress.length },
    { key: 'waiting', title: 'Aguardando', color: 'bg-orange-50 border-orange-200', count: mockTickets.waiting.length },
    { key: 'resolved', title: 'Resolvidos', color: 'bg-green-50 border-green-200', count: mockTickets.resolved.length }
  ];

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {columns.map((column) => (
        <div key={column.key} className="space-y-4">
          {/* Column Header */}
          <div className={`p-4 rounded-lg ${column.color}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">{column.title}</h3>
              <Badge variant="secondary" className="bg-white/80">
                {column.count}
              </Badge>
            </div>
          </div>

          {/* Tickets */}
          <div className="space-y-3">
            {mockTickets[column.key]?.map((ticket) => (
              <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                {/* Ticket Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{ticket.id}</p>
                    <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                      {getPriorityLabel(ticket.priority)}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Ticket Content */}
                <h4 className="font-medium text-slate-900 mb-2 line-clamp-2">
                  {ticket.title}
                </h4>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  {ticket.description}
                </p>

                {/* Ticket Meta */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{ticket.category}</span>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {ticket.createdAt}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-600">
                      <User className="h-3 w-3 mr-1" />
                      {ticket.requester}
                    </div>
                    <div className="flex items-center space-x-2">
                      {ticket.responses > 0 && (
                        <div className="flex items-center text-xs text-slate-500">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {ticket.responses}
                        </div>
                      )}
                      {ticket.attachments > 0 && (
                        <div className="flex items-center text-xs text-slate-500">
                          <Paperclip className="h-3 w-3 mr-1" />
                          {ticket.attachments}
                        </div>
                      )}
                    </div>
                  </div>

                  {ticket.assignee && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center text-xs text-slate-600">
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
