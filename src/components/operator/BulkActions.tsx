
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { X, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onClose: () => void;
  onBulkClose: () => void;
  onBulkReassign: (assignee: string) => void;
  onBulkMove: (target: string) => void;
}

export const BulkActions = ({ 
  selectedCount, 
  onClose, 
  onBulkClose, 
  onBulkReassign, 
  onBulkMove 
}: BulkActionsProps) => {
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  const assignees = [
    { value: 'operador1', label: 'João Silva' },
    { value: 'operador2', label: 'Maria Santos' },
    { value: 'operador3', label: 'Pedro Costa' }
  ];

  const moveTargets = [
    { value: 'suporte-n1', label: 'Suporte N1' },
    { value: 'suporte-n2', label: 'Suporte N2' },
    { value: 'suporte-n3', label: 'Suporte N3' },
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'aguardando', label: 'Aguardando Cliente' },
    { value: 'concluido', label: 'Concluído' }
  ];

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg rounded-lg border p-4 z-50">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="px-3 py-1">
            {selectedCount} selecionado{selectedCount > 1 ? 's' : ''}
          </Badge>
          
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowCloseDialog(true)}
              className="flex items-center"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Fechar
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowReassignDialog(true)}
              className="flex items-center"
            >
              <Users className="h-4 w-4 mr-2" />
              Reatribuir
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowMoveDialog(true)}
              className="flex items-center"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Mover
            </Button>
          </div>
          
          <Button size="sm" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Close Confirmation Dialog */}
      <Dialog open={showCloseDialog} onOpenChange={setShowCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Fechamento</DialogTitle>
          </DialogHeader>
          <p>Deseja realmente fechar {selectedCount} chamado{selectedCount > 1 ? 's' : ''}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              onBulkClose();
              setShowCloseDialog(false);
            }}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reassign Dialog */}
      <Dialog open={showReassignDialog} onOpenChange={setShowReassignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reatribuir Chamados</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Selecione o novo responsável para {selectedCount} chamado{selectedCount > 1 ? 's' : ''}:</p>
            <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um responsável" />
              </SelectTrigger>
              <SelectContent>
                {assignees.map((assignee) => (
                  <SelectItem key={assignee.value} value={assignee.value}>
                    {assignee.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                if (selectedAssignee) {
                  onBulkReassign(selectedAssignee);
                  setShowReassignDialog(false);
                  setSelectedAssignee('');
                }
              }}
              disabled={!selectedAssignee}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Dialog */}
      <Dialog open={showMoveDialog} onOpenChange={setShowMoveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mover Chamados</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Selecione o destino para {selectedCount} chamado{selectedCount > 1 ? 's' : ''}:</p>
            <Select value={selectedTarget} onValueChange={setSelectedTarget}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um destino" />
              </SelectTrigger>
              <SelectContent>
                {moveTargets.map((target) => (
                  <SelectItem key={target.value} value={target.value}>
                    {target.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMoveDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={() => {
                if (selectedTarget) {
                  onBulkMove(selectedTarget);
                  setShowMoveDialog(false);
                  setSelectedTarget('');
                }
              }}
              disabled={!selectedTarget}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
