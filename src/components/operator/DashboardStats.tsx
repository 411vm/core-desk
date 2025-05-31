
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Users, TrendingUp, Timer } from 'lucide-react';

interface DashboardStatsProps {
  userRole: string;
  onNavigateToTickets?: (status: string) => void;
}

export const DashboardStats = ({ userRole, onNavigateToTickets }: DashboardStatsProps) => {
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

  const handleCardClick = (status: string) => {
    if (onNavigateToTickets) {
      onNavigateToTickets(status);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* New Tickets */}
      <Card 
        className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg dark:from-blue-950/20 dark:to-blue-900/20 dark:border-blue-800"
        onClick={() => handleCardClick('Novo')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Novos</p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.newTickets}</p>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p className="text-blue-700 dark:text-blue-300 text-sm mt-2">Aguardando atendimento</p>
      </Card>

      {/* In Progress */}
      <Card 
        className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg dark:from-yellow-950/20 dark:to-yellow-900/20 dark:border-yellow-800"
        onClick={() => handleCardClick('Em Andamento')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Em Andamento</p>
            <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{stats.inProgress}</p>
          </div>
          <div className="p-3 bg-yellow-500/20 rounded-full">
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm mt-2">Sendo processados</p>
      </Card>

      {/* Resolved */}
      <Card 
        className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg dark:from-green-950/20 dark:to-green-900/20 dark:border-green-800"
        onClick={() => handleCardClick('Resolvido')}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-medium">Resolvidos</p>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{stats.resolved}</p>
          </div>
          <div className="p-3 bg-green-500/20 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm mt-2">Este mês</p>
      </Card>

      {/* Performance Metric */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950/20 dark:to-purple-900/20 dark:border-purple-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
              {userRole === 'manager' ? 'Performance da Equipe' : 'Meus Chamados'}
            </p>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
              {userRole === 'manager' ? `${stats.teamPerformance}%` : stats.myTickets}
            </p>
          </div>
          <div className="p-3 bg-purple-500/20 rounded-full">
            {userRole === 'manager' ? (
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            ) : (
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            )}
          </div>
        </div>
        <p className="text-purple-700 dark:text-purple-300 text-sm mt-2">
          {userRole === 'manager' ? 'Índice geral' : 'Atribuídos a mim'}
        </p>
      </Card>

      {/* Additional Stats Row */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Tempo Médio de Resolução</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">{stats.avgResolutionTime}</p>
          </div>
          <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
            <Timer className="h-6 w-6 text-slate-600 dark:text-slate-300" />
          </div>
        </div>
        <div className="mt-4 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Meta: 3h | Atual: {stats.avgResolutionTime}</p>
      </Card>

      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Cumprimento de SLA</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">{stats.slaCompliance}%</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="mt-4 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.slaCompliance}%` }}></div>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Meta: 95% | Atual: {stats.slaCompliance}%</p>
      </Card>
    </div>
  );
};
