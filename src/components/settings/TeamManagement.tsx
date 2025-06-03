
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, UserX, UserCheck, Users, AlertTriangle } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'operador' | 'gestor' | 'admin';
  isActive: boolean;
  createdAt: string;
  permissions: {
    dashboard: boolean;
    editTickets: boolean;
    viewReports: boolean;
    manageUsers: boolean;
  };
}

interface TeamManagementProps {
  userRole: string;
}

const defaultMembers: TeamMember[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01',
    permissions: { dashboard: true, editTickets: true, viewReports: true, manageUsers: true }
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'gestor',
    isActive: true,
    createdAt: '2024-01-15',
    permissions: { dashboard: true, editTickets: true, viewReports: true, manageUsers: false }
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro.costa@empresa.com',
    role: 'operador',
    isActive: true,
    createdAt: '2024-02-01',
    permissions: { dashboard: true, editTickets: true, viewReports: false, manageUsers: false }
  }
];

export const TeamManagement = ({ userRole }: TeamManagementProps) => {
  const [members, setMembers] = useState<TeamMember[]>(defaultMembers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'operador' as const,
    permissions: { dashboard: true, editTickets: true, viewReports: false, manageUsers: false }
  });

  // License management
  const totalLicenses = 15;
  const usedLicenses = members.filter(m => m.isActive).length;
  const canAddMember = usedLicenses < totalLicenses;

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim() || !canAddMember) return;
    
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name.trim(),
      email: newMember.email.trim(),
      role: newMember.role,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      permissions: newMember.permissions
    };
    
    setMembers(prev => [...prev, member]);
    setNewMember({
      name: '',
      email: '',
      role: 'operador',
      permissions: { dashboard: true, editTickets: true, viewReports: false, manageUsers: false }
    });
    setIsDialogOpen(false);
  };

  const toggleMemberStatus = (memberId: string) => {
    setMembers(prev => prev.map(m => 
      m.id === memberId ? { ...m, isActive: !m.isActive } : m
    ));
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'gestor': return 'Gestor';
      case 'operador': return 'Operador';
      default: return role;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'gestor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'operador': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* License Info Card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                Licenças Utilizadas
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {usedLicenses} de {totalLicenses} licenças em uso
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {usedLicenses}/{totalLicenses}
            </div>
            {!canAddMember && (
              <div className="flex items-center text-sm text-orange-600 dark:text-orange-400">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Limite atingido
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                Membros da Equipe
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Gerencie usuários e suas permissões
              </p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!canAddMember}>
                <Plus className="h-4 w-4 mr-2" />
                {canAddMember ? 'Adicionar Membro' : 'Limite Atingido'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Membro</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="memberName">Nome</Label>
                  <Input
                    id="memberName"
                    value={newMember.name}
                    onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="memberEmail">E-mail</Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@empresa.com"
                  />
                </div>
                <div>
                  <Label>Papel</Label>
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value as any }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                  >
                    <option value="operador">Operador</option>
                    <option value="gestor">Gestor</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddMember} disabled={!newMember.name.trim() || !newMember.email.trim()}>
                    Adicionar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Buscar por nome, e-mail ou papel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                    {getRoleLabel(member.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={member.isActive ? 'default' : 'secondary'}>
                    {member.isActive ? 'Ativo' : 'Inativo'}
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
                      onClick={() => toggleMemberStatus(member.id)}
                    >
                      {member.isActive ? (
                        <UserX className="h-4 w-4" />
                      ) : (
                        <UserCheck className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
