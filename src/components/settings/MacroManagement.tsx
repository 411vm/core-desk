
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, MessageSquare, Eye, EyeOff } from 'lucide-react';

interface Macro {
  id: string;
  name: string;
  description: string;
  content: string;
  availableFor: 'all' | 'operators' | 'managers';
  visibleToClient: boolean;
  group?: string;
  createdAt: string;
}

interface MacroManagementProps {
  userRole: string;
}

const defaultMacros: Macro[] = [
  {
    id: '1',
    name: 'Saudação Inicial',
    description: 'Primeira resposta padrão para novos chamados',
    content: 'Olá! Recebemos seu chamado e já estamos trabalhando para resolvê-lo. Retornaremos em breve com mais informações.',
    availableFor: 'all',
    visibleToClient: true,
    group: 'Atendimento',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Solicitação de Informações',
    description: 'Quando precisamos de mais detalhes do cliente',
    content: 'Para darmos continuidade ao atendimento, precisamos de algumas informações adicionais. Poderia nos fornecer mais detalhes sobre o problema?',
    availableFor: 'all',
    visibleToClient: true,
    group: 'Atendimento',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'Encerramento de Chamado',
    description: 'Finalização padrão para chamados resolvidos',
    content: 'Seu chamado foi resolvido com sucesso. Caso tenha alguma dúvida ou precise de mais assistência, não hesite em nos contatar.',
    availableFor: 'all',
    visibleToClient: true,
    group: 'Finalização',
    createdAt: '2024-01-01'
  }
];

export const MacroManagement = ({ userRole }: MacroManagementProps) => {
  const [macros, setMacros] = useState<Macro[]>(defaultMacros);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [newMacro, setNewMacro] = useState({
    name: '',
    description: '',
    content: '',
    availableFor: 'all' as const,
    visibleToClient: true,
    group: ''
  });

  const groups = Array.from(new Set(macros.map(m => m.group).filter(Boolean)));

  const filteredMacros = macros.filter(macro => {
    const matchesSearch = macro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         macro.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === 'all' || macro.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const handleAddMacro = () => {
    if (!newMacro.name.trim() || !newMacro.content.trim()) return;
    
    const macro: Macro = {
      id: Date.now().toString(),
      name: newMacro.name.trim(),
      description: newMacro.description.trim(),
      content: newMacro.content.trim(),
      availableFor: newMacro.availableFor,
      visibleToClient: newMacro.visibleToClient,
      group: newMacro.group.trim() || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setMacros(prev => [...prev, macro]);
    setNewMacro({
      name: '',
      description: '',
      content: '',
      availableFor: 'all',
      visibleToClient: true,
      group: ''
    });
    setIsDialogOpen(false);
  };

  const handleDeleteMacro = (macroId: string) => {
    setMacros(prev => prev.filter(m => m.id !== macroId));
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'all': return 'Todos';
      case 'operators': return 'Operadores';
      case 'managers': return 'Gestores';
      default: return availability;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'all': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'operators': return 'bg-green-100 text-green-800 border-green-200';
      case 'managers': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Macros de Respostas
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure respostas pré-definidas para agilizar o atendimento
            </p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nova Macro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Macro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="macroName">Nome da Macro *</Label>
                  <Input
                    id="macroName"
                    value={newMacro.name}
                    onChange={(e) => setNewMacro(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Saudação Inicial"
                  />
                </div>
                <div>
                  <Label htmlFor="macroGroup">Grupo (opcional)</Label>
                  <Input
                    id="macroGroup"
                    value={newMacro.group}
                    onChange={(e) => setNewMacro(prev => ({ ...prev, group: e.target.value }))}
                    placeholder="Ex: Atendimento, Finalização"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="macroDescription">Descrição</Label>
                <Input
                  id="macroDescription"
                  value={newMacro.description}
                  onChange={(e) => setNewMacro(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Breve descrição do uso da macro"
                />
              </div>

              <div>
                <Label htmlFor="macroContent">Conteúdo da Resposta *</Label>
                <Textarea
                  id="macroContent"
                  value={newMacro.content}
                  onChange={(e) => setNewMacro(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Digite o texto da resposta automática..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Disponível para</Label>
                  <select
                    value={newMacro.availableFor}
                    onChange={(e) => setNewMacro(prev => ({ ...prev, availableFor: e.target.value as any }))}
                    className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
                  >
                    <option value="all">Todos</option>
                    <option value="operators">Apenas Operadores</option>
                    <option value="managers">Apenas Gestores</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={newMacro.visibleToClient}
                    onCheckedChange={(checked) => setNewMacro(prev => ({ ...prev, visibleToClient: checked }))}
                  />
                  <Label>Visível para o cliente</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddMacro} disabled={!newMacro.name.trim() || !newMacro.content.trim()}>
                  Criar Macro
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Buscar macros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
        >
          <option value="all">Todos os grupos</option>
          {groups.map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Disponível para</TableHead>
            <TableHead>Visibilidade</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMacros.map((macro) => (
            <TableRow key={macro.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{macro.name}</div>
                  {macro.description && (
                    <div className="text-sm text-slate-500">{macro.description}</div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {macro.group && (
                  <Badge variant="secondary">{macro.group}</Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge className={`text-xs ${getAvailabilityColor(macro.availableFor)}`}>
                  {getAvailabilityLabel(macro.availableFor)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  {macro.visibleToClient ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-slate-400" />
                  )}
                  <span className="text-sm">
                    {macro.visibleToClient ? 'Visível' : 'Oculta'}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteMacro(macro.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
