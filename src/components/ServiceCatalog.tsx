
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, 
  Wifi, 
  Shield, 
  Download, 
  UserPlus, 
  Mail,
  Clock,
  TrendingUp
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: "Problemas de Hardware",
    description: "Computador lento, tela azul, problemas de impressora",
    icon: Monitor,
    category: "Hardware",
    avgTime: "2-4h",
    priority: "medium"
  },
  {
    id: 2,
    title: "Conectividade e Rede",
    description: "Sem internet, WiFi instável, VPN não conecta",
    icon: Wifi,
    category: "Rede",
    avgTime: "1-2h",
    priority: "high"
  },
  {
    id: 3,
    title: "Segurança e Antivírus",
    description: "Vírus detectado, comportamento suspeito, firewall",
    icon: Shield,
    category: "Segurança",
    avgTime: "30m-1h",
    priority: "urgent"
  },
  {
    id: 4,
    title: "Instalação de Software",
    description: "Instalar programas, atualizações, licenças",
    icon: Download,
    category: "Software",
    avgTime: "1-3h",
    priority: "low"
  },
  {
    id: 5,
    title: "Criação de Usuários",
    description: "Novo colaborador, acessos, permissões",
    icon: UserPlus,
    category: "Acessos",
    avgTime: "2-6h",
    priority: "medium"
  },
  {
    id: 6,
    title: "E-mail e Office",
    description: "Problemas no Outlook, Teams, SharePoint",
    icon: Mail,
    category: "Produtividade",
    avgTime: "1-2h",
    priority: "medium"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ServiceCatalog = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Catálogo de Serviços
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Encontre rapidamente o tipo de suporte que você precisa. 
          Nossos serviços são organizados por categoria para facilitar sua busca.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <Badge className={getPriorityColor(service.priority)}>
                    {service.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
                <CardDescription className="text-slate-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.avgTime}
                  </div>
                  <div className="flex items-center text-sm text-slate-500">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {service.category}
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Solicitar Suporte
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
