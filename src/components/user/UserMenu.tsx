
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user: {
    username: string;
    role: string;
  };
  onLogout: () => void;
}

export const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getRoleLabel = (role: string) => {
    return role === 'manager' ? 'Gestor' : 'Operador';
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full dark:text-[#F6F6F6]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        <span className="text-sm font-medium text-slate-700 dark:text-[#F6F6F6]">
          {user.username}
        </span>
        <ChevronDown className="h-3 w-3 text-slate-500" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 z-50">
            <div className="p-3 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6]">
                {user.username}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getRoleLabel(user.role)}
              </p>
            </div>
            
            <div className="py-1">
              <button
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <User className="h-4 w-4 mr-3" />
                Ver perfil
              </button>
              
              <button
                onClick={() => {
                  navigate('/settings');
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Settings className="h-4 w-4 mr-3" />
                Configurações
              </button>
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 py-1">
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
