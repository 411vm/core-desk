
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  FileText, 
  BarChart3, 
  Users,
  Headphones,
  Clock
} from 'lucide-react';

const quickActions = [
  {
    title: "Meus Chamados",
    description: "Acompanhe o status dos seus tickets",
    icon: FileText,
    color: "bg-blue-500",
    count: "3 abertos"
  },
  {
    title: "Chat com Suporte",
    description: "Converse diretamente com nossa equipe",
    icon: MessageCircle,
    color: "bg-green-500",
    count: "Online"
  },
  {
    title: "Central Técnica",
    description: "Painel para analistas e técnicos",
    icon: Users,
    color: "bg-purple-500",
    count: "12 pendentes"
  },
  {
    title: "Dashboard Gerencial",
    description: "Métricas e relatórios de desempenho",
    icon: BarChart3,
    color: "bg-orange-500",
    count: "SLA 95%"
  }
];

export const QuickActions = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Acesso Rápido
        </h2>
        <p className="text-lg text-slate-600">
          Principais ferramentas e funcionalidades em um clique
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 hover:border-blue-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 ${action.color} rounded-full group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {action.description}
                    </p>
                    <div className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {action.count}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300">
                    Acessar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Support Banner */}
      <Card className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/10 rounded-full">
                <Headphones className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Precisa de ajuda urgente?
                </h3>
                <p className="text-slate-300">
                  Nossa equipe está disponível 24/7 para emergências críticas
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="lg">
                <Clock className="mr-2 h-4 w-4" />
                Suporte Urgente
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Tel: (11) 3000-1234
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
