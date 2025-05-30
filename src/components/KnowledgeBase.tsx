
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  BookOpen, 
  Star, 
  Eye, 
  ThumbsUp,
  Filter,
  TrendingUp
} from 'lucide-react';

const knowledgeArticles = [
  {
    id: 1,
    title: "Como conectar na VPN da empresa",
    description: "Passo a passo para configurar e conectar na VPN corporativa",
    category: "Rede",
    views: 1234,
    likes: 89,
    rating: 4.8,
    tags: ["VPN", "Conectividade", "Remote"]
  },
  {
    id: 2,
    title: "Resetar senha do Windows",
    description: "Procedimento para recuperar ou alterar senha de usuário Windows",
    category: "Sistema",
    views: 2156,
    likes: 156,
    rating: 4.9,
    tags: ["Windows", "Senha", "Login"]
  },
  {
    id: 3,
    title: "Configurar impressora de rede",
    description: "Instalação e configuração de impressoras compartilhadas",
    category: "Hardware",
    views: 876,
    likes: 67,
    rating: 4.6,
    tags: ["Impressora", "Rede", "Configuração"]
  },
  {
    id: 4,
    title: "Backup automático de arquivos",
    description: "Como configurar backup automático no OneDrive e Google Drive",
    category: "Produtividade",
    views: 1543,
    likes: 112,
    rating: 4.7,
    tags: ["Backup", "OneDrive", "Google Drive"]
  },
  {
    id: 5,
    title: "Otimizar performance do computador",
    description: "Dicas para melhorar a velocidade e performance do PC",
    category: "Sistema",
    views: 3241,
    likes: 234,
    rating: 4.8,
    tags: ["Performance", "Otimização", "Limpeza"]
  },
  {
    id: 6,
    title: "Configurar Microsoft Teams",
    description: "Primeiros passos para usar o Teams eficientemente",
    category: "Produtividade",
    views: 1876,
    likes: 143,
    rating: 4.5,
    tags: ["Teams", "Colaboração", "Office365"]
  }
];

const categories = ["Todos", "Sistema", "Rede", "Hardware", "Produtividade", "Segurança"];

export const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Base de Conhecimento
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Encontre respostas rápidas para problemas comuns. 
          Nossa biblioteca está sempre atualizada com as melhores práticas.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Busque por artigos, procedimentos ou problemas..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-blue-600" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-slate-200 hover:border-blue-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                  {article.category}
                </Badge>
                <div className="flex items-center text-xs text-slate-500">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {article.rating}
                </div>
              </div>
              
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {article.title}
              </CardTitle>
              <CardDescription className="text-slate-600">
                {article.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1 mb-4">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {article.views.toLocaleString()} visualizações
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  {article.likes}
                </div>
              </div>
              
              <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300">
                <BookOpen className="mr-2 h-4 w-4" />
                Ler Artigo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Popular Articles Banner */}
      <Card className="mt-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/10 rounded-full">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Artigos mais acessados esta semana
                </h3>
                <p className="text-blue-100">
                  Confira os procedimentos que mais ajudaram nossos usuários
                </p>
              </div>
            </div>
            
            <Button variant="secondary" size="lg">
              Ver Ranking Completo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <Card className="mt-8">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">
              Nenhum artigo encontrado
            </h3>
            <p className="text-slate-500 mb-6">
              Não encontramos artigos que correspondam à sua busca. 
              Que tal tentar termos diferentes ou abrir um chamado?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => {setSearchTerm(""); setSelectedCategory("Todos");}}>
                Limpar Filtros
              </Button>
              <Button variant="outline">
                Abrir Chamado
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};
