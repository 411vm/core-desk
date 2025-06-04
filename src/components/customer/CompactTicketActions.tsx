
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Wrench, 
  Code, 
  Server, 
  HelpCircle 
} from 'lucide-react';

const ticketCategories = [
  {
    id: 'suporte',
    title: 'Suporte',
    icon: Wrench,
    color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
  },
  {
    id: 'desenvolvimento',
    title: 'Desenvolvimento',
    icon: Code,
    color: 'text-green-600 bg-green-50 hover:bg-green-100'
  },
  {
    id: 'infraestrutura',
    title: 'Infraestrutura',
    icon: Server,
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100'
  },
  {
    id: 'outros',
    title: 'Outros',
    icon: HelpCircle,
    color: 'text-orange-600 bg-orange-50 hover:bg-orange-100'
  }
];

export const CompactTicketActions = () => {
  const handleCategoryClick = (categoryId: string) => {
    window.location.href = `/create-ticket?categoria=${categoryId}`;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Abrir Novo Chamado
          </h3>
          <p className="text-sm text-slate-600">
            Escolha a categoria do seu problema
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {ticketCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="ghost"
                className={`h-auto p-4 flex-col space-y-2 ${category.color} transition-colors`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <IconComponent className="h-6 w-6" />
                <span className="text-sm font-medium">{category.title}</span>
              </Button>
            );
          })}
        </div>

        <Button 
          className="w-full mt-4" 
          onClick={() => window.location.href = '/create-ticket'}
        >
          <Plus className="mr-2 h-4 w-4" />
          Abrir Chamado Personalizado
        </Button>
      </CardContent>
    </Card>
  );
};
