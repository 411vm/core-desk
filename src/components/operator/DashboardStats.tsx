
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Users, TrendingUp, Timer } from 'lucide-react';

interface DashboardStatsProps {
  userRole: string;
}

export const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  // Mock data - in a real app this would come from an API
  const stats = {
    newTickets: 12,
    inProgress: 8,
    pending: 5,
    resolved: 34,
    avgResolutionTime: '2.5h',
    slaCompliance: 94,
    myTickets: 6,
    teamPerformance: 87
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* New Tickets */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Novos</p>
            <p className="text-3xl font-bold text-blue-900">{stats.newTickets}</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="text-blue-700 text-sm mt-2">Aguardando atendimento</p>
      </Card>

      {/* In Progress */}
      <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-600 text-sm font-medium">Em Andamento</p>
            <p className="text-3xl font-bold text-yellow-900">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-full">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
        </div>
        <p className="text-yellow-700 text-sm mt-2">Sendo processados</p>
      </Card>

      {/* Resolved */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Resolvidos</p>
            <p className="text-3xl font-bold text-green-900">{stats.resolved}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="text-green-700 text-sm mt-2">Este mês</p>
      </Card>

      {/* Performance Metric */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">
              {userRole === 'manager' ? 'Performance da Equipe' : 'Meus Chamados'}
            </p>
            <p className="text-3xl font-bold text-purple-900">
              {userRole === 'manager' ? `${stats.teamPerformance}%` : stats.myTickets}
            </p>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-full">
            {userRole === 'manager' ? (
              <TrendingUp className="h-6 w-6 text-purple-600" />
            ) : (
              <Users className="h-6 w-6 text-purple-600" />
            )}
          </div>
        </div>
        <p className="text-purple-700 text-sm mt-2">
          {userRole === 'manager' ? 'Índice geral' : 'Atribuídos a mim'}
        </p>
      </Card>

      {/* Additional Stats Row */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Tempo Médio de Resolução</p>
            <p className="text-2xl font-bold text-slate-900">{stats.avgResolutionTime}</p>
          </div>
          <div className="p-3 bg-slate-100 rounded-full">
            <Timer className="h-6 w-6 text-slate-600" />
          </div>
        </div>
        <div className="mt-4 bg-slate-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-slate-600 text-sm mt-2">Meta: 3h | Atual: {stats.avgResolutionTime}</p>
      </Card>

      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Cumprimento de SLA</p>
            <p className="text-2xl font-bold text-slate-900">{stats.slaCompliance}%</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 bg-slate-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.slaCompliance}%` }}></div>
        </div>
        <p className="text-slate-600 text-sm mt-2">Meta: 95% | Atual: {stats.slaCompliance}%</p>
      </Card>
    </div>
  );
};
