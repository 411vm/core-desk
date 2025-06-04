
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Lock, Unlock, Users, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'operador' | 'gestor' | 'admin';
  status: 'ativo' | 'bloqueado';
  lastLogin: string;
  createdAt: string;
}

interface UserManagementProps {
  userRole: string;
}

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'operador',
    status: 'ativo',
    lastLogin: '2024-06-04 14:30',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'gestor',
    status: 'ativo',
    lastLogin: '2024-06-04 09:15',
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'Pedro Admin',
    email: 'pedro.admin@empresa.com',
    role: 'admin',
    status: 'ativo',
    lastLogin: '2024-06-04 16:45',
    createdAt: '2024-01-01'
  }
];

export const UserManagement = ({ userRole }: UserManagementProps) => {
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'operador' as 'operador' | 'gestor' | 'admin'
  });
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "Erro",
        description: "Nome e e-mail são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Verificar e-mail único
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "Erro",
        description: "Este e-mail já está em uso",
        variant: "destructive"
      });
      return;
    }
    
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name.trim(),
      email: newUser.email.trim(),
      role: newUser.role,
      status: 'ativo',
      lastLogin: 'Nunca',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers(prev => [...prev, user]);
    setNewUser({ name: '', email: '', role: 'operador' });
    setIsDialogOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Usuário criado com sucesso"
    });
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleUpdateUser = () => {
    if (!editingUser || !editingUser.name.trim() || !editingUser.email.trim()) {
      toast({
        title: "Erro",
        description: "Nome e e-mail são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Verificar e-mail único (exceto o próprio usuário)
    if (users.some(user => user.email === editingUser.email && user.id !== editingUser.id)) {
      toast({
        title: "Erro",
        description: "Este e-mail já está em uso",
        variant: "destructive"
      });
      return;
    }
    
    setUsers(prev => prev.map(u => 
      u.id === editingUser.id ? editingUser : u
    ));
    setEditingUser(null);
    setIsDialogOpen(false);
    
    toast({
      title: "Sucesso",
      description: "Usuário atualizado com sucesso"
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, status: u.status === 'ativo' ? 'bloqueado' : 'ativo' } : u
    ));
    
    toast({
      title: "Sucesso",
      description: "Status do usuário alterado"
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      
      toast({
        title: "Sucesso",
        description: "Usuário excluído com sucesso"
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'gestor': return 'bg-blue-100 text-blue-800';
      case 'operador': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'gestor': return 'Gestor';
      case 'operador': return 'Operador';
      default: return role;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Gestão de Usuários Internos
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Gerencie operadores, gestores e administradores
            </p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingUser(null);
            setNewUser({ name: '', email: '', role: 'operador' });
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Editar Usuário' : 'Criar Novo Usuário'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="userName">Nome Completo *</Label>
                <Input
                  id="userName"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={(e) => editingUser 
                    ? setEditingUser({ ...editingUser, name: e.target.value })
                    : setNewUser(prev => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Nome completo do usuário"
                />
              </div>
              
              <div>
                <Label htmlFor="userEmail">E-mail *</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={(e) => editingUser 
                    ? setEditingUser({ ...editingUser, email: e.target.value })
                    : setNewUser(prev => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="email@empresa.com"
                />
              </div>

              <div>
                <Label htmlFor="userRole">Papel</Label>
                <Select 
                  value={editingUser ? editingUser.role : newUser.role}
                  onValueChange={(value: 'operador' | 'gestor' | 'admin') => 
                    editingUser 
                      ? setEditingUser({ ...editingUser, role: value })
                      : setNewUser(prev => ({ ...prev, role: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o papel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operador">Operador</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={editingUser ? handleUpdateUser : handleAddUser}>
                  {editingUser ? 'Atualizar' : 'Criar'} Usuário
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="mb-4 flex items-center space-x-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Papel</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Último Login</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-slate-600">{user.email}</TableCell>
              <TableCell>
                <Badge className={getRoleColor(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={user.status === 'ativo' ? 'default' : 'secondary'}>
                  {user.status === 'ativo' ? 'Ativo' : 'Bloqueado'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-slate-600">{user.lastLogin}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    {user.status === 'ativo' ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Unlock className="h-4 w-4" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            Nenhum usuário encontrado.
          </p>
        </div>
      )}
    </Card>
  );
};
