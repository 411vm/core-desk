
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OperatorNavbar } from '@/components/operator/OperatorNavbar';
import { DashboardStats } from '@/components/operator/DashboardStats';
import { TicketsKanban } from '@/components/operator/TicketsKanban';
import { TicketsList } from '@/components/operator/TicketsList';
import { DashboardTickets } from '@/components/operator/DashboardTickets';
import { PeriodFilter } from '@/components/operator/PeriodFilter';
import { PersonalMetrics } from '@/components/operator/PersonalMetrics';
import { ActivityFeed } from '@/components/operator/ActivityFeed';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState<'dashboard' | 'tickets'>('dashboard');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [prefilterStatus, setPrefilterStatus] = useState<string | undefined>(undefined);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [ticketToOpen, setTicketToOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('coredesk_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNavigateToTickets = (status: string) => {
    setCurrentSection('tickets');
    setViewMode('list');
    setPrefilterStatus(status);
  };

  const handleOpenTicket = (ticketId: string) => {
    // Navegar para a aba de chamados e abrir o chamado específico
    setCurrentSection('tickets');
    setViewMode('list');
    setTicketToOpen(ticketId);
    // Filtrar pelo ID do chamado
    setPrefilterStatus(undefined);
  };

  if (!user) {
    return <div className="dark:bg-[#2b2d31] dark:text-[#F6F6F6]">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <OperatorNavbar 
        user={user} 
        currentSection={currentSection}
        onSectionChange={(section) => {
          setCurrentSection(section);
          if (section === 'tickets') {
            setPrefilterStatus(undefined);
            setTicketToOpen(null);
          }
        }}
      />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {currentSection === 'dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                {/* Period Filter */}
                <div className="flex justify-end">
                  <PeriodFilter period={selectedPeriod} onPeriodChange={setSelectedPeriod} />
                </div>

                {/* Dashboard Stats */}
                <DashboardStats userRole={user.role} onNavigateToTickets={handleNavigateToTickets} />
                
                {/* Personal Metrics */}
                <PersonalMetrics 
                  userRole={user.role}
                  selectedOperator={selectedOperator}
                  onOperatorChange={setSelectedOperator}
                />

                {/* Dashboard Tickets */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                    Chamados Recentes
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    Novos chamados e chamados com retorno do cliente
                  </p>
                  <DashboardTickets userRole={user.role} />
                </div>
              </div>

              {/* Activity Feed Sidebar */}
              <div className="lg:col-span-1">
                <ActivityFeed onOpenTicket={handleOpenTicket} />
              </div>
            </div>
          )}

          {currentSection === 'tickets' && (
            <div className="space-y-6">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">Todos os Chamados</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'kanban'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-[#F6F6F6] dark:hover:bg-slate-600'
                    }`}
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-[#F6F6F6] dark:hover:bg-slate-600'
                    }`}
                  >
                    Lista
                  </button>
                </div>
              </div>

              {/* Tickets View */}
              {viewMode === 'kanban' ? (
                <TicketsKanban userRole={user.role} prefilterStatus={prefilterStatus} />
              ) : (
                <TicketsList 
                  userRole={user.role} 
                  prefilterStatus={prefilterStatus}
                  ticketToOpen={ticketToOpen}
                  onTicketOpened={() => setTicketToOpen(null)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
