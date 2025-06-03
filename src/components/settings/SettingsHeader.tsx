
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';

interface SettingsHeaderProps {
  userRole: string;
}

export const SettingsHeader = ({ userRole }: SettingsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
            Configurações do Sistema
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Administração e configurações avançadas da plataforma
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <SettingsIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {userRole === 'admin' ? 'Administrador' : 'Gestor'}
        </span>
      </div>
    </div>
  );
};
