
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DarkModeToggle } from '@/components/DarkModeToggle';

interface OperatorNavbarProps {
  user: {
    username: string;
    role: string;
  };
  currentSection: 'dashboard' | 'tickets';
  onSectionChange: (section: 'dashboard' | 'tickets') => void;
}

export const OperatorNavbar = ({ user, currentSection, onSectionChange }: OperatorNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('coredesk_user');
    navigate('/login');
  };

  const getRoleLabel = (role: string) => {
    return role === 'manager' ? 'Gestor' : 'Operador';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-[#2b2d31]/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-[#F6F6F6]">CoreDesk</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Painel do {getRoleLabel(user.role)}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input 
                placeholder="Buscar chamados..." 
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:text-[#F6F6F6]"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`dark:text-[#F6F6F6] dark:hover:bg-slate-700 ${
                currentSection === 'dashboard' ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
              onClick={() => onSectionChange('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`dark:text-[#F6F6F6] dark:hover:bg-slate-700 ${
                currentSection === 'tickets' ? 'bg-slate-100 dark:bg-slate-700' : ''
              }`}
              onClick={() => onSectionChange('tickets')}
            >
              Chamados
            </Button>
            {user.role === 'manager' && (
              <Button variant="ghost" size="sm" className="dark:text-[#F6F6F6] dark:hover:bg-slate-700">Relatórios</Button>
            )}
            <Button variant="ghost" size="sm" className="relative dark:text-[#F6F6F6] dark:hover:bg-slate-700">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="sm" className="dark:text-[#F6F6F6] dark:hover:bg-slate-700">
              <Settings className="h-4 w-4" />
            </Button>
            <DarkModeToggle />
            <div className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              <span className="text-sm font-medium text-slate-700 dark:text-[#F6F6F6]">{user.username}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="dark:text-[#F6F6F6] dark:hover:bg-slate-700">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden dark:text-[#F6F6F6]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="space-y-2">
              <div className="px-2 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input 
                    placeholder="Buscar..." 
                    className="pl-10 bg-slate-50 dark:bg-slate-800 dark:text-[#F6F6F6]"
                  />
                </div>
              </div>
              <Button 
                variant="ghost" 
                className={`w-full justify-start dark:text-[#F6F6F6] dark:hover:bg-slate-700 ${
                  currentSection === 'dashboard' ? 'bg-slate-100 dark:bg-slate-700' : ''
                }`}
                onClick={() => {
                  onSectionChange('dashboard');
                  setIsMenuOpen(false);
                }}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={`w-full justify-start dark:text-[#F6F6F6] dark:hover:bg-slate-700 ${
                  currentSection === 'tickets' ? 'bg-slate-100 dark:bg-slate-700' : ''
                }`}
                onClick={() => {
                  onSectionChange('tickets');
                  setIsMenuOpen(false);
                }}
              >
                Chamados
              </Button>
              {user.role === 'manager' && (
                <Button variant="ghost" className="w-full justify-start dark:text-[#F6F6F6] dark:hover:bg-slate-700">Relatórios</Button>
              )}
              <Button variant="ghost" className="w-full justify-start dark:text-[#F6F6F6] dark:hover:bg-slate-700">Notificações</Button>
              <Button variant="ghost" className="w-full justify-start dark:text-[#F6F6F6] dark:hover:bg-slate-700">Configurações</Button>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Logado como: <span className="font-medium dark:text-[#F6F6F6]">{user.username}</span>
                </span>
                <DarkModeToggle />
              </div>
              <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
