
import React from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Award, Clock, ThumbsUp, TrendingUp, TrendingDown } from 'lucide-react';

interface PersonalMetricsProps {
  userRole: string;
  selectedOperator?: string;
  onOperatorChange?: (operator: string) => void;
}

export const PersonalMetrics = ({ userRole, selectedOperator, onOperatorChange }: PersonalMetricsProps) => {
  const operators = [
    { value: 'all', label: 'Todos os Operadores' },
    { value: 'joao', label: 'João Silva' },
    { value: 'maria', label: 'Maria Santos' },
    { value: 'pedro', label: 'Pedro Costa' }
  ];

  const metrics = {
    resolved: { value: 24, change: +12, trend: 'up' },
    avgTime: { value: '2.3h', change: -0.5, trend: 'down' },
    satisfaction: { value: '94%', change: +3, trend: 'up' }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
          {userRole === 'manager' ? 'Indicadores da Equipe' : 'Seus Indicadores'}
        </h3>
        
        {userRole === 'manager' && onOperatorChange && (
          <Select value={selectedOperator} onValueChange={onOperatorChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Selecionar operador" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((operator) => (
                <SelectItem key={operator.value} value={operator.value}>
                  {operator.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Chamados Resolvidos</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">{metrics.resolved.value}</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(metrics.resolved.trend)}
                <span className={`text-sm ml-1 ${getTrendColor(metrics.resolved.trend)}`}>
                  +{metrics.resolved.change} este mês
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tempo Médio</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">{metrics.avgTime.value}</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(metrics.avgTime.trend)}
                <span className={`text-sm ml-1 ${getTrendColor(metrics.avgTime.trend)}`}>
                  {metrics.avgTime.change}h este mês
                </span>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Satisfação</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">{metrics.satisfaction.value}</p>
              <div className="flex items-center mt-1">
                {getTrendIcon(metrics.satisfaction.trend)}
                <span className={`text-sm ml-1 ${getTrendColor(metrics.satisfaction.trend)}`}>
                  +{metrics.satisfaction.change}% este mês
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <ThumbsUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
