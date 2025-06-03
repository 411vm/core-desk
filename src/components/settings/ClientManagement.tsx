
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Building2, Phone, Mail } from 'lucide-react';

interface Client {
  id: string;
  cnpj: string;
  companyName: string;
  corporateName: string;
  emergencyContact: {
    name: string;
    phone: string;
    email: string;
  };
  isActive: boolean;
  createdAt: string;
}

interface ClientManagementProps {
  userRole: string;
}

const defaultClients: Client[] = [
  {
    id: '1',
    cnpj: '12.345.678/0001-90',
    companyName: 'Tech Solutions Ltda',
    corporateName: 'Tech Solutions Tecnologia Ltda',
    emergencyContact: {
      name: 'Ana Maria',
      phone: '(11) 99999-9999',
      email: 'ana.maria@techsolutions.com'
    },
    isActive: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    cnpj: '98.765.432/0001-10',
    companyName: 'Inovação Digital',
    corporateName: 'Inovação Digital Serviços S.A.',
    emergencyContact: {
      name: 'Carlos Santos',
      phone: '(11) 88888-8888',
      email: 'carlos.santos@inovacaodigital.com'
    },
    isActive: true,
    createdAt: '2024-02-01'
  }
];

export const ClientManagement = ({ userRole }: ClientManagementProps) => {
  const [clients, setClients] = useState<Client[]>(defaultClients);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newClient, setNewClient] = useState({
    cnpj: '',
    companyName: '',
    corporateName: '',
    emergencyContact: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cnpj.includes(searchTerm) ||
    client.corporateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.cnpj.trim() || !newClient.companyName.trim()) return;
    
    const client: Client = {
      id: Date.now().toString(),
      cnpj: newClient.cnpj.trim(),
      companyName: newClient.companyName.trim(),
      corporateName: newClient.corporateName.trim(),
      emergencyContact: newClient.emergencyContact,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setClients(prev => [...prev, client]);
    setNewClient({
      cnpj: '',
      companyName: '',
      corporateName: '',
      emergencyContact: { name: '', phone: '', email: '' }
    });
    setIsDialogOpen(false);
  };

  const toggleClientStatus = (clientId: string) => {
    setClients(prev => prev.map(c => 
      c.id === clientId ? { ...c, isActive: !c.isActive } : c
    ));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Gerenciamento de Clientes
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Cadastre e gerencie clientes corporativos
            </p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Cadastrar Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input
                    id="cnpj"
                    value={newClient.cnpj}
                    onChange={(e) => setNewClient(prev => ({ ...prev, cnpj: e.target.value }))}
                    placeholder="00.000.000/0000-00"
                  />
                </div>
                <div>
                  <Label htmlFor="companyName">Nome da Empresa *</Label>
                  <Input
                    id="companyName"
                    value={newClient.companyName}
                    onChange={(e) => setNewClient(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Nome fantasia"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="corporateName">Razão Social</Label>
                <Input
                  id="corporateName"
                  value={newClient.corporateName}
                  onChange={(e) => setNewClient(prev => ({ ...prev, corporateName: e.target.value }))}
                  placeholder="Razão social completa"
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Contato de Emergência</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactName">Nome</Label>
                    <Input
                      id="contactName"
                      value={newClient.emergencyContact.name}
                      onChange={(e) => setNewClient(prev => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                      }))}
                      placeholder="Nome do contato"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Telefone</Label>
                    <Input
                      id="contactPhone"
                      value={newClient.emergencyContact.phone}
                      onChange={(e) => setNewClient(prev => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                      }))}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">E-mail</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={newClient.emergencyContact.email}
                      onChange={(e) => setNewClient(prev => ({
                        ...prev,
                        emergencyContact: { ...prev.emergencyContact, email: e.target.value }
                      }))}
                      placeholder="contato@empresa.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddClient} disabled={!newClient.cnpj.trim() || !newClient.companyName.trim()}>
                  Cadastrar Cliente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Buscar por nome da empresa, CNPJ ou razão social..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Contato de Emergência</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{client.companyName}</div>
                  {client.corporateName && (
                    <div className="text-sm text-slate-500">{client.corporateName}</div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{client.cnpj}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{client.emergencyContact.name}</div>
                  <div className="flex items-center space-x-3 text-xs text-slate-600">
                    <span className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {client.emergencyContact.phone}
                    </span>
                    <span className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {client.emergencyContact.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={client.isActive ? 'default' : 'secondary'}>
                  {client.isActive ? 'Ativo' : 'Bloqueado'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleClientStatus(client.id)}
                  >
                    {client.isActive ? 'Bloquear' : 'Ativar'}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
