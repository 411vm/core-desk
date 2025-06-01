
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, RefreshCw, Eye, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'comment' | 'status' | 'response';
  author: string;
  content: string;
  ticketId: string;
  timestamp: string;
}

interface ActivityFeedProps {
  onOpenTicket: (ticketId: string) => void;
}

export const ActivityFeed = ({ onOpenTicket }: ActivityFeedProps) => {
  const [filter, setFilter] = useState<string>('all');
  
  const activities: Activity[] = [
    {
      id: '1',
      type: 'comment',
      author: 'João Silva',
      content: 'Problema resolvido após reinstalação do driver',
      ticketId: '#2024-001',
      timestamp: '2024-01-15 16:30'
    },
    {
      id: '2',
      type: 'status',
      author: 'Maria Santos',
      content: 'Status alterado para "Em Andamento"',
      ticketId: '#2024-002',
      timestamp: '2024-01-15 15:45'
    },
    {
      id: '3',
      type: 'response',
      author: 'Cliente',
      content: 'Nova resposta: "Obrigado, funcionou perfeitamente!"',
      ticketId: '#2024-003',
      timestamp: '2024-01-15 14:20'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'comment': return <MessageSquare className="h-4 w-4" />;
      case 'status': return <RefreshCw className="h-4 w-4" />;
      case 'response': return <Eye className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'comment': return 'bg-blue-100 text-blue-800';
      case 'status': return 'bg-yellow-100 text-yellow-800';
      case 'response': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case 'comment': return 'Comentário';
      case 'status': return 'Status';
      case 'response': return 'Resposta';
      default: return 'Atualização';
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-[#F6F6F6]">
          Feed de Atualizações
        </h3>
        <Button variant="ghost" size="sm">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todos
        </Button>
        <Button
          variant={filter === 'comment' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('comment')}
        >
          Comentários
        </Button>
        <Button
          variant={filter === 'status' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('status')}
        >
          Status
        </Button>
        <Button
          variant={filter === 'response' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('response')}
        >
          Respostas
        </Button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                    <span className="ml-1">{getActivityLabel(activity.type)}</span>
                  </Badge>
                  <span className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6] truncate">
                    {activity.author}
                  </span>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 break-words">
                  {activity.content}
                </p>
                
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDistanceToNow(new Date(activity.timestamp), { 
                      addSuffix: true, 
                      locale: ptBR 
                    })}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenTicket(activity.ticketId)}
                    className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 h-6"
                  >
                    {activity.ticketId}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
