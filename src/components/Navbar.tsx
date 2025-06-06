
import React, { useState } from 'react';
import { Bell, Search, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationPanel } from '@/components/notifications/NotificationPanel';
import { UserMenu } from '@/components/user/UserMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Verificar se há usuário logado (cliente ou operador)
  const customerData = localStorage.getItem('coredesk_customer');
  const operatorData = localStorage.getItem('coredesk_user');
  
  let currentUser = null;
  if (customerData) {
    const customer = JSON.parse(customerData);
    currentUser = {
      username: customer.username,
      role: 'cliente'
    };
  } else if (operatorData) {
    const operator = JSON.parse(operatorData);
    currentUser = {
      username: operator.username,
      role: operator.role
    };
  }

  const handleLogout = () => {
    localStorage.removeItem('coredesk_customer');
    localStorage.removeItem('coredesk_user');
    window.location.href = '/';
  };

  const handleMeusTickets = () => {
    window.location.href = '/meus-chamados';
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">CoreDesk</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Busque por artigos, serviços ou problemas..." 
                  className="pl-10 bg-slate-50 border-slate-200 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleMeusTickets}>
                Meus Chamados
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setIsNotificationOpen(true)}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </Button>
              
              {currentUser && (
                <UserMenu user={currentUser} onLogout={handleLogout} />
              )}
              
              {!currentUser && (
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="space-y-2">
                <div className="px-2 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input 
                      placeholder="Buscar..." 
                      className="pl-10 bg-slate-50"
                    />
                  </div>
                </div>
                <Button variant="ghost" className="w-full justify-start" onClick={handleMeusTickets}>
                  Meus Chamados
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => setIsNotificationOpen(true)}
                >
                  Notificações
                </Button>
                {currentUser && (
                  <Button variant="ghost" className="w-full justify-start">
                    Perfil
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </>
  );
};
