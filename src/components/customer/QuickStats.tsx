
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

// Mock data - em produção viria do backend
const mockStats = {
  openTickets: 3,
  pendingResponse: 1,
  resolvedThisMonth: 8,
  avgResponseTime: '2h'
};

const stats = [
  {
    title: 'Chamados Abertos',
    value: mockStats.openTickets,
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Aguardando Resposta',
    value: mockStats.pendingResponse,
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    title: 'Resolvidos (Mês)',
    value: mockStats.resolvedThisMonth,
    icon: CheckCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Tempo Médio',
    value: mockStats.avgResponseTime,
    icon: AlertCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  }
];

export const QuickStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-600">
                    {stat.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
