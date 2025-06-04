
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  HelpCircle,
  FileText,
  Calendar,
  ArrowRight
} from 'lucide-react';

const categories = [
  { name: 'Acesso', count: 23, color: 'bg-blue-100 text-blue-700' },
  { name: 'Rede', count: 18, color: 'bg-green-100 text-green-700' },
  { name: 'Hardware', count: 15, color: 'bg-purple-100 text-purple-700' },
  { name: 'Software', count: 21, color: 'bg-orange-100 text-orange-700' }
];

const recentArticles = [
  {
    id: 1,
    title: 'Como redefinir sua senha de acesso',
    summary: 'Passo a passo para recuperar o acesso à sua conta',
    date: '2024-01-15',
    category: 'Acesso'
  },
  {
    id: 2,
    title: 'Configuração de VPN para trabalho remoto',
    summary: 'Guia completo para conectar-se à rede da empresa',
    date: '2024-01-14',
    category: 'Rede'
  },
  {
    id: 3,
    title: 'Resolução de problemas de impressora',
    summary: 'Soluções para os problemas mais comuns de impressão',
    date: '2024-01-12',
    category: 'Hardware'
  },
  {
    id: 4,
    title: 'Instalação de software corporativo',
    summary: 'Como instalar e configurar aplicações da empresa',
    date: '2024-01-10',
    category: 'Software'
  }
];

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleChatbot = () => {
    alert('Chatbot será integrado em breve!');
  };

  const handleArticleClick = (articleId: number) => {
    console.log('Opening article:', articleId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
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

      {/* Artigos Recentes */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            Artigos Recentes
          </CardTitle>
          <CardDescription>
            Últimos artigos adicionados à nossa base de conhecimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentArticles.map((article) => (
              <div 
                key={article.id}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 mb-1 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-xs text-slate-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.date)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 ml-2" />
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="ghost" className="w-full mt-3 text-sm">
            Ver Todos os Artigos
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
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
