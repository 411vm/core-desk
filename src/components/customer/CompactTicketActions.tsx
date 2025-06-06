
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  MessageSquare,
  ArrowRight,
  Wrench,
  Code,
  Server,
  HelpCircle
} from 'lucide-react';

const ticketCategories = [
  {
    id: 'suporte',
    title: 'Suporte Técnico',
    description: 'Problemas com sistema, login, funcionalidades',
    icon: Wrench,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'desenvolvimento', 
    title: 'Desenvolvimento',
    description: 'Solicitações de novas features',
    icon: Code,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'infraestrutura',
    title: 'Infraestrutura', 
    description: 'Problemas de conectividade',
    icon: Server,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'outros',
    title: 'Outros',
    description: 'Dúvidas gerais',
    icon: HelpCircle,
    color: 'bg-orange-100 text-orange-600'
  }
];

export const CompactTicketActions = () => {
  const handleNewTicket = () => {
    window.location.href = '/abrir-chamado';
  };

  const handleViewTickets = () => {
    window.location.href = '/meus-chamados';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Abrir Chamado</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {ticketCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 cursor-pointer hover:shadow-sm transition-all group"
                onClick={handleNewTicket}
              >
                <div className={`w-8 h-8 rounded-full ${category.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-4 w-4" />
                </div>
                <h4 className="font-medium text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full" 
            onClick={handleNewTicket}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Chamado
          </Button>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleViewTickets}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Ver Meus Chamados
            <ArrowRight className="ml-auto h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
