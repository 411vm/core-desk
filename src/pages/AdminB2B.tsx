
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { ClientManagement } from '@/components/admin/ClientManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { BrandManagement } from '@/components/admin/BrandManagement';
import { AppearanceManagement } from '@/components/admin/AppearanceManagement';
import { SectorManagement } from '@/components/settings/SectorManagement';
import { Building2, Users, Palette, Eye, Settings } from 'lucide-react';

const AdminB2B = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('coredesk_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Verificar se é admin
      if (parsedUser.role !== 'admin') {
        navigate('/customer-dashboard');
        return;
      }
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-[#F6F6F6] mb-2">
            Acesso Negado
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Apenas administradores podem acessar esta área.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <Navbar />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-[#F6F6F6] mb-2">
              Administração B2B
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Configure e gerencie todos os aspectos da sua plataforma CoreDesk
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="clients" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="clients" className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Clientes</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Usuários</span>
              </TabsTrigger>
              <TabsTrigger value="brand" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Marca</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Aparência</span>
              </TabsTrigger>
              <TabsTrigger value="sectors" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Setores</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              <ClientManagement userRole={user.role} />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement userRole={user.role} />
            </TabsContent>

            <TabsContent value="brand">
              <BrandManagement userRole={user.role} />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceManagement userRole={user.role} />
            </TabsContent>

            <TabsContent value="sectors">
              <SectorManagement userRole={user.role} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminB2B;
