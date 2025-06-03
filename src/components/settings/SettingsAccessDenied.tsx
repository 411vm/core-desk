
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SettingsAccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31] flex items-center justify-center">
      <Card className="p-6 max-w-md">
        <p className="text-slate-500 dark:text-slate-400 text-center">
          Você não tem permissão para acessar as configurações do sistema. 
          Apenas gestores e administradores podem acessar esta área.
        </p>
        <Button 
          className="w-full mt-4" 
          onClick={() => navigate('/dashboard')}
        >
          Voltar ao Dashboard
        </Button>
      </Card>
    </div>
  );
};
