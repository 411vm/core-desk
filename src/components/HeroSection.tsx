
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Clock, CheckCircle } from 'lucide-react';

export const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Central de Atendimento
                <span className="block text-blue-200">Inteligente de TI</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Resolva seus problemas de TI de forma rápida e eficiente. 
                Portal completo com autoatendimento, base de conhecimento e suporte especializado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Abrir Chamado
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explorar Serviços
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500/20 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-blue-200 text-sm">Taxa de Resolução</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500/20 rounded-full">
                  <Clock className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2h</p>
                  <p className="text-blue-200 text-sm">Tempo Médio</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 sm:col-span-2">
              <div className="text-center">
                <p className="text-3xl font-bold">1,247</p>
                <p className="text-blue-200">Chamados Resolvidos Este Mês</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
