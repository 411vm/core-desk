
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, TrendingUp, TrendingDown, BarChart3, PieChart, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const Reports = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const ticketsByStatus = [
    { name: 'Novos', value: 23, color: '#3b82f6' },
    { name: 'Em Andamento', value: 45, color: '#f59e0b' },
    { name: 'Aguardando', value: 12, color: '#f97316' },
    { name: 'Resolvidos', value: 78, color: '#10b981' }
  ];

  const ticketsByDay = [
    { day: 'Seg', tickets: 12 },
    { day: 'Ter', tickets: 19 },
    { day: 'Qua', tickets: 15 },
    { day: 'Qui', tickets: 22 },
    { day: 'Sex', tickets: 18 },
    { day: 'Sáb', tickets: 8 },
    { day: 'Dom', tickets: 4 }
  ];

  const kpis = [
    {
      title: 'Total de Chamados',
      value: '158',
      change: '+12%',
      trend: 'up',
      icon: BarChart3
    },
    {
      title: 'Tempo Médio de Resolução',
      value: '2.3h',
      change: '-15%',
      trend: 'down',
      icon: TrendingUp
    },
    {
      title: 'Taxa de Satisfação',
      value: '94%',
      change: '+3%',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'SLA Cumprido',
      value: '89%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp
    }
  ];

  const exportData = (format: 'csv' | 'pdf') => {
    console.log(`Exportando relatório em ${format.toUpperCase()}`);
    // Aqui você implementaria a lógica de exportação
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Relatórios
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Análise detalhada de desempenho e métricas
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
            >
              <option value="week">Últimos 7 dias</option>
              <option value="month">Mês atual</option>
              <option value="quarter">Trimestre</option>
              <option value="year">Ano</option>
              <option value="custom">Personalizado</option>
            </select>
            
            <Button variant="outline" onClick={() => exportData('csv')}>
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            
            <Button variant="outline" onClick={() => exportData('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <kpi.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <Badge 
                  variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                  className={`text-xs ${
                    kpi.trend === 'up' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6] mb-1">
                {kpi.value}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {kpi.title}
              </p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tickets por Dia */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Chamados por Dia
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Tickets por Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Distribuição por Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={ticketsByStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {ticketsByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance por Operador */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Performance por Operador
            </h3>
            <div className="space-y-3">
              {[
                { name: 'João Silva', resolved: 23, avg_time: '2.1h', satisfaction: '96%' },
                { name: 'Maria Santos', resolved: 19, avg_time: '1.8h', satisfaction: '94%' },
                { name: 'Pedro Costa', resolved: 17, avg_time: '2.4h', satisfaction: '92%' },
                { name: 'Ana Oliveira', resolved: 14, avg_time: '2.0h', satisfaction: '95%' }
              ].map((operator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-[#F6F6F6]">
                      {operator.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {operator.resolved} resolvidos • {operator.avg_time} tempo médio
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {operator.satisfaction}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Satisfação</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* SLA Summary */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6] mb-4">
              Resumo SLA
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Prioridade Baixa (8h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <span className="text-sm font-medium">95%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Prioridade Média (4h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <span className="text-sm font-medium">87%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Prioridade Alta (2h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <span className="text-sm font-medium">82%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Prioridade Urgente (1h)</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
