
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { HelpCenter } from '@/components/customer/HelpCenter';
import { QuickStats } from '@/components/customer/QuickStats';
import { CompactTicketActions } from '@/components/customer/CompactTicketActions';
import { CompactMyTickets } from '@/components/customer/CompactMyTickets';
import { CompactActivityFeed } from '@/components/customer/CompactActivityFeed';

const CustomerDashboard = () => {
  // Verificar se o usuário está logado como cliente
  const customerData = localStorage.getItem('coredesk_customer');
  
  if (!customerData) {
    window.location.href = '/customer-login';
    return null;
  }

  const customer = JSON.parse(customerData);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-16">
        {/* Header mais limpo */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Olá, {customer.username}! 👋
                </h1>
                <p className="text-blue-100">
                  Como podemos ajudar você hoje?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <p className="text-sm text-blue-200">Status do Sistema</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium">Operacional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Estatísticas rápidas */}
          <QuickStats />

          {/* Central de Ajuda - Seção principal */}
          <HelpCenter />

          {/* Layout em grid para widgets */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Abrir Chamado */}
            <div>
              <CompactTicketActions />
            </div>

            {/* Meus Chamados */}
            <div>
              <CompactMyTickets />
            </div>

            {/* Feed de Atividades */}
            <div>
              <CompactActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
