
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { KnowledgeBase } from '@/components/KnowledgeBase';
import { QuickTicketActions } from '@/components/customer/QuickTicketActions';
import { MyTicketsOverview } from '@/components/customer/MyTicketsOverview';
import { ActivityFeed } from '@/components/customer/ActivityFeed';

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
        {/* Header de boas-vindas */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Bem-vindo, {customer.username}!
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Central de atendimento do CoreDesk. Aqui você pode abrir chamados, 
                consultar nossa base de conhecimento e acompanhar suas solicitações.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Ações rápidas para abertura de chamados */}
          <QuickTicketActions />

          {/* Base de Conhecimento */}
          <KnowledgeBase />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Meus Chamados */}
            <div>
              <MyTicketsOverview />
            </div>

            {/* Feed de Atividades */}
            <div>
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
