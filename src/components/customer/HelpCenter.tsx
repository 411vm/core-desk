
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

const popularArticles = [
  { id: 1, title: 'Como resetar minha senha', category: 'Acesso', views: 342 },
  { id: 2, title: 'Configurar VPN corporativa', category: 'Rede', views: 198 },
  { id: 3, title: 'Política de backup', category: 'Segurança', views: 156 },
  { id: 4, title: 'Solicitar novo equipamento', category: 'Hardware', views: 134 }
];

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
    <section className="mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Central de Ajuda
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Encontre respostas rápidas ou converse com nossa IA especializada
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Popular Articles */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Artigos Populares
            </CardTitle>
            <CardDescription>
              Soluções mais acessadas pelos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-slate-400" />
                    <div>
                      <h4 className="font-medium text-slate-900">{article.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {article.views} visualizações
                        </span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5 text-purple-600" />
              Categorias
            </CardTitle>
            <CardDescription>
              Navegue por tópicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                  <span className="font-medium text-slate-900">
                    {category.name}
                  </span>
                  <Badge className={category.color}>
                    {category.count} artigos
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
