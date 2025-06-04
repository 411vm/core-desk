
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  CheckCircle,
  UserCheck,
  ArrowRight,
  Clock
} from 'lucide-react';

// Mock data reduzido
const recentActivities = [
  {
    id: 1,
    type: 'reply',
    ticketId: 'CHM-001',
    operatorName: 'Carlos Silva',
    operatorInitials: 'CS',
    action: 'respondeu',
    timestamp: '2024-01-16T14:30:00Z'
  },
  {
    id: 2,
    type: 'status_change',
    ticketId: 'CHM-003',
    operatorName: 'Ana Costa',
    operatorInitials: 'AC',
    action: 'resolveu',
    timestamp: '2024-01-16T10:15:00Z'
  },
  {
    id: 3,
    type: 'assignment',
    ticketId: 'CHM-002',
    operatorName: 'João Santos',
    operatorInitials: 'JS',
    action: 'assumiu',
    timestamp: '2024-01-15T16:45:00Z'
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'reply':
      return <MessageSquare className="h-3 w-3 text-blue-600" />;
    case 'status_change':
      return <CheckCircle className="h-3 w-3 text-green-600" />;
    case 'assignment':
      return <UserCheck className="h-3 w-3 text-purple-600" />;
    default:
      return <Clock className="h-3 w-3 text-gray-600" />;
  }
};

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Agora';
  if (diffInHours === 1) return '1h';
  if (diffInHours < 24) return `${diffInHours}h`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return '1d';
  return `${diffInDays}d`;
};

export const CompactActivityFeed = () => {
  const handleViewTicket = (ticketId: string) => {
    window.location.href = `/chamados/${ticketId}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Atividades Recentes</CardTitle>
          <Button variant="ghost" size="sm">
            Ver Todas
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              onClick={() => handleViewTicket(activity.ticketId)}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-slate-100 text-slate-600 text-xs">
                  {activity.operatorInitials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  {getActivityIcon(activity.type)}
                  <span className="text-sm font-medium text-slate-900">
                    {activity.operatorName}
                  </span>
                  <span className="text-xs text-slate-600">
                    {activity.action}
                  </span>
                  <Badge variant="outline" className="text-xs px-1">
                    #{activity.ticketId}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-slate-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentActivities.length === 0 && (
          <div className="text-center py-6">
            <Clock className="h-6 w-6 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">
              Nenhuma atividade recente
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
