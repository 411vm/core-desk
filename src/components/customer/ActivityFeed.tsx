
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  UserCheck, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

// Mock data para o feed de atividades
const mockActivities = [
  {
    id: 1,
    type: 'reply',
    ticketId: 'CHM-001',
    ticketTitle: 'Problema de login no sistema',
    operatorName: 'Carlos Silva',
    operatorInitials: 'CS',
    action: 'respondeu ao chamado',
    summary: 'Enviamos as instruções para reset de senha. Por favor, verifique seu email.',
    timestamp: '2024-01-16T14:30:00Z',
    priority: 'medium'
  },
  {
    id: 2,
    type: 'status_change',
    ticketId: 'CHM-003',
    ticketTitle: 'Lentidão no carregamento das páginas',
    operatorName: 'Ana Costa',
    operatorInitials: 'AC',
    action: 'marcou como resolvido',
    summary: 'Problema de performance foi solucionado após otimização do servidor.',
    timestamp: '2024-01-16T10:15:00Z',
    priority: 'high'
  },
  {
    id: 3,
    type: 'assignment',
    ticketId: 'CHM-002',
    ticketTitle: 'Solicitação de nova funcionalidade',
    operatorName: 'João Santos',
    operatorInitials: 'JS',
    action: 'foi atribuído ao chamado',
    summary: 'Iniciando análise técnica da solicitação de desenvolvimento.',
    timestamp: '2024-01-15T16:45:00Z',
    priority: 'low'
  },
  {
    id: 4,
    type: 'reply',
    ticketId: 'CHM-001',
    ticketTitle: 'Problema de login no sistema',
    operatorName: 'Sistema',
    operatorInitials: 'SI',
    action: 'atualizou automaticamente',
    summary: 'Chamado foi movido para Em Andamento após resposta do cliente.',
    timestamp: '2024-01-15T09:20:00Z',
    priority: 'medium'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'reply':
      return <MessageSquare className="h-4 w-4 text-blue-600" />;
    case 'status_change':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'assignment':
      return <UserCheck className="h-4 w-4 text-purple-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-red-500';
    case 'medium':
      return 'border-l-orange-500';
    case 'low':
      return 'border-l-green-500';
    default:
      return 'border-l-gray-500';
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Há poucos minutos';
  if (diffInHours === 1) return 'Há 1 hora';
  if (diffInHours < 24) return `Há ${diffInHours} horas`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Há 1 dia';
  return `Há ${diffInDays} dias`;
};

export const ActivityFeed = () => {
  const handleViewTicket = (ticketId: string) => {
    window.location.href = `/chamados/${ticketId}`;
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Atualizações Recentes
          </h2>
          <p className="text-slate-600">
            Últimas atividades nos seus chamados
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <Card 
            key={activity.id} 
            className={`border-l-4 ${getPriorityColor(activity.priority)} hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => handleViewTicket(activity.ticketId)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {activity.operatorInitials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {getActivityIcon(activity.type)}
                    <span className="font-semibold text-slate-900">
                      {activity.operatorName}
                    </span>
                    <span className="text-slate-600">
                      {activity.action}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      #{activity.ticketId}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-slate-900 mb-1 hover:text-blue-600 transition-colors">
                    {activity.ticketTitle}
                  </h4>
                  
                  <p className="text-sm text-slate-600 mb-3">
                    {activity.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                    
                    <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Ver chamado
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <AlertTriangle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Nenhuma atividade recente
            </h3>
            <p className="text-slate-500">
              Quando houver atualizações nos seus chamados, elas aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
