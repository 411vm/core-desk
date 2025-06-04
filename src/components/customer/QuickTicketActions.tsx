
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wrench, 
  Code, 
  Server, 
  HelpCircle, 
  MessageSquare,
  Plus
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
    description: 'Solicitações de novas features, customizações',
    icon: Code,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'infraestrutura',
    title: 'Infraestrutura',
    description: 'Problemas de conectividade, performance, servidores',
    icon: Server,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'outros',
    title: 'Outros',
    description: 'Dúvidas gerais e outras solicitações',
    icon: HelpCircle,
    color: 'bg-orange-100 text-orange-600'
  }
];

export const QuickTicketActions = () => {
  const handleCategoryClick = (categoryId: string) => {
    // Redirecionar para abertura de chamado com categoria pré-selecionada
    window.location.href = `/create-ticket?categoria=${categoryId}`;
  };

  const handleChatbotClick = () => {
    // Abrir chatbot - placeholder por enquanto
    alert('Chatbot será integrado em breve!');
  };

  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Como podemos ajudar você hoje?
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Escolha uma categoria para abrir um chamado ou converse com nosso assistente virtual
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ticketCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Card 
              key={category.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 hover:border-blue-300"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardHeader className="text-center pb-3">
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Abrir Chamado
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chatbot Section */}
      <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/10 rounded-full">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Assistente Virtual 24/7
                </h3>
                <p className="text-indigo-100">
                  Obtenha respostas instantâneas com nossa IA especializada
                </p>
              </div>
            </div>
            
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleChatbotClick}
              className="bg-white text-indigo-600 hover:bg-indigo-50"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Iniciar Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
