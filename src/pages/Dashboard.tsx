
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OperatorNavbar } from '@/components/operator/OperatorNavbar';
import { DashboardStats } from '@/components/operator/DashboardStats';
import { TicketsKanban } from '@/components/operator/TicketsKanban';
import { TicketsList } from '@/components/operator/TicketsList';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
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

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <OperatorNavbar user={user} />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Dashboard Stats */}
          <DashboardStats userRole={user.role} />
          
          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Chamados</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'kanban' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('kanban')}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Kanban
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                Lista
              </Button>
            </div>
          </div>

          {/* Tickets View */}
          {viewMode === 'kanban' ? (
            <TicketsKanban userRole={user.role} />
          ) : (
            <TicketsList userRole={user.role} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
