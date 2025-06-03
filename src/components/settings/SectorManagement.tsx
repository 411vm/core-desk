
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Save, X, Building2 } from 'lucide-react';

interface Sector {
  id: string;
  name: string;
  color: string;
  createdAt: string;
}

interface SectorManagementProps {
  userRole: string;
}

const defaultSectors: Sector[] = [
  { id: '1', name: 'Suporte N1', color: '#3b82f6', createdAt: '2024-01-01' },
  { id: '2', name: 'Suporte N2', color: '#f59e0b', createdAt: '2024-01-01' },
  { id: '3', name: 'Suporte N3', color: '#ef4444', createdAt: '2024-01-01' },
  { id: '4', name: 'Desenvolvimento', color: '#10b981', createdAt: '2024-01-01' },
  { id: '5', name: 'Infraestrutura', color: '#8b5cf6', createdAt: '2024-01-01' },
];

export const SectorManagement = ({ userRole }: SectorManagementProps) => {
  const [sectors, setSectors] = useState<Sector[]>(defaultSectors);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSector, setEditingSector] = useState<Sector | null>(null);
  const [newSector, setNewSector] = useState({ name: '', color: '#3b82f6' });

  const canManageSectors = userRole === 'gestor' || userRole === 'admin';

  if (!canManageSectors) {
    return (
      <Card className="p-6">
        <p className="text-slate-500 dark:text-slate-400">
          Você não tem permissão para gerenciar setores. Apenas gestores e administradores podem acessar esta funcionalidade.
        </p>
      </Card>
    );
  }

  const handleAddSector = () => {
    if (!newSector.name.trim()) return;
    
    const sector: Sector = {
      id: Date.now().toString(),
      name: newSector.name.trim(),
      color: newSector.color,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setSectors(prev => [...prev, sector]);
    setNewSector({ name: '', color: '#3b82f6' });
    setIsDialogOpen(false);
  };

  const handleEditSector = (sector: Sector) => {
    setEditingSector(sector);
  };

  const handleSaveEdit = () => {
    if (!editingSector || !editingSector.name.trim()) return;
    
    setSectors(prev => prev.map(s => 
      s.id === editingSector.id ? editingSector : s
    ));
    setEditingSector(null);
  };

  const handleDeleteSector = (sectorId: string) => {
    setSectors(prev => prev.filter(s => s.id !== sectorId));
  };

  const colorOptions = [
    '#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6',
    '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
              Gerenciamento de Setores
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure os setores responsáveis pelos chamados
            </p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Setor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Setor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sectorName">Nome do Setor</Label>
                <Input
                  id="sectorName"
                  value={newSector.name}
                  onChange={(e) => setNewSector(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Suporte N1"
                />
              </div>
              <div>
                <Label>Cor do Setor</Label>
                <div className="flex gap-2 mt-2">
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newSector.color === color ? 'border-slate-400' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewSector(prev => ({ ...prev, color }))}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddSector}>
                  Adicionar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Setor</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectors.map((sector) => (
            <TableRow key={sector.id}>
              <TableCell>
                {editingSector?.id === sector.id ? (
                  <Input
                    value={editingSector.name}
                    onChange={(e) => setEditingSector(prev => 
                      prev ? { ...prev, name: e.target.value } : null
                    )}
                    className="w-full"
                  />
                ) : (
                  <span className="font-medium">{sector.name}</span>
                )}
              </TableCell>
              <TableCell>
                {editingSector?.id === sector.id ? (
                  <div className="flex gap-1">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full border ${
                          editingSector.color === color ? 'border-slate-400' : 'border-slate-200'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setEditingSector(prev => 
                          prev ? { ...prev, color } : null
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <Badge
                    className="text-white"
                    style={{ backgroundColor: sector.color }}
                  >
                    {sector.name}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{sector.createdAt}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {editingSector?.id === sector.id ? (
                    <>
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingSector(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditSector(sector)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteSector(sector.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
