
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  HelpCircle
} from 'lucide-react';

const categories = [
  { name: 'Acesso', count: 23, color: 'bg-blue-100 text-blue-700' },
  { name: 'Rede', count: 18, color: 'bg-green-100 text-green-700' },
  { name: 'Hardware', count: 15, color: 'bg-purple-100 text-purple-700' },
  { name: 'Software', count: 21, color: 'bg-orange-100 text-orange-700' }
];

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar busca
    console.log('Searching for:', searchQuery);
  };

  const handleChatbot = () => {
    alert('Chatbot será integrado em breve!');
  };

  return (
    <section>
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Base de Conhecimento
        </h2>
        <p className="text-slate-600">
          Encontre respostas rápidas ou converse com nossa IA especializada
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Busque por problemas, tutoriais ou soluções..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Buscar
            </Button>
            <Button type="button" variant="outline" onClick={handleChatbot}>
              <MessageSquare className="mr-2 h-4 w-4" />
              IA Assistente
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <HelpCircle className="mr-2 h-5 w-5 text-purple-600" />
            Navegue por Categorias
          </CardTitle>
          <CardDescription>
            Encontre soluções organizadas por tópicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <div key={category.name} className="flex flex-col items-center p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-slate-200">
                <Badge className={`${category.color} mb-2`}>
                  {category.count} artigos
                </Badge>
                <span className="font-medium text-slate-900 text-sm text-center">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
