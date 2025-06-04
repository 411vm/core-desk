
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
        {/* Header mais limpo e simples */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Olá, {customer.username}! 👋
              </h1>
              <p className="text-blue-100">
                Como podemos ajudar você hoje?
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Estatísticas rápidas */}
          <QuickStats />

          {/* Grid principal: Abrir Chamado e Meus Chamados lado a lado */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Abrir Chamado - Seção compacta */}
            <div>
              <CompactTicketActions />
            </div>

            {/* Meus Chamados */}
            <div>
              <CompactMyTickets />
            </div>
          </div>

          {/* Feed de Atividades - Largura total */}
          <div className="mb-8">
            <CompactActivityFeed />
          </div>

          {/* Central de Ajuda - Com artigos recentes */}
          <HelpCenter />
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
