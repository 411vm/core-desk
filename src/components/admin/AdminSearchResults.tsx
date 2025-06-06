
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Settings } from 'lucide-react';
import { useClientSearch } from '@/hooks/useClientSearch';

interface AdminSearchResultsProps {
  searchTerm: string;
  onClose: () => void;
}

// Mock data para usuários e setores
const mockUsers = [
  { id: '1', name: 'João Silva', email: 'joao@empresa.com', role: 'admin', sector: 'TI' },
  { id: '2', name: 'Maria Santos', email: 'maria@empresa.com', role: 'operator', sector: 'Suporte' },
  { id: '3', name: 'Pedro Lima', email: 'pedro@empresa.com', role: 'manager', sector: 'Gestão' },
];

const mockSectors = [
  { id: '1', name: 'Tecnologia da Informação', description: 'Setor responsável pela infraestrutura' },
  { id: '2', name: 'Suporte Técnico', description: 'Atendimento aos clientes' },
  { id: '3', name: 'Desenvolvimento', description: 'Criação de novas funcionalidades' },
  { id: '4', name: 'Gestão', description: 'Administração geral' },
];

export const AdminSearchResults = ({ searchTerm, onClose }: AdminSearchResultsProps) => {
  const { results: clientResults } = useClientSearch();
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [filteredSectors, setFilteredSectors] = useState<any[]>([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers([]);
      setFilteredSectors([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    
    // Filtrar usuários
    const users = mockUsers.filter(user =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.sector.toLowerCase().includes(searchLower)
    );
    
    // Filtrar setores
    const sectors = mockSectors.filter(sector =>
      sector.name.toLowerCase().includes(searchLower) ||
      sector.description.toLowerCase().includes(searchLower)
    );

    setFilteredUsers(users);
    setFilteredSectors(sectors);
  }, [searchTerm]);

  const hasResults = clientResults.length > 0 || filteredUsers.length > 0 || filteredSectors.length > 0;

  if (!hasResults) {
    return (
      <Card className="absolute top-full left-0 right-0 mt-2 p-4 shadow-lg z-50">
        <p className="text-sm text-slate-500">Nenhum resultado encontrado para "{searchTerm}"</p>
      </Card>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Results */}
      <Card className="absolute top-full left-0 right-0 mt-2 max-h-96 overflow-y-auto shadow-lg z-50">
        <div className="p-4 space-y-4">
          {/* Clientes */}
          {clientResults.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Building2 className="h-4 w-4 mr-2" />
                Clientes ({clientResults.length})
              </h3>
              <div className="space-y-2">
                {clientResults.slice(0, 3).map((client) => (
                  <div key={client.id} className="p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <div className="font-medium text-sm">{client.name}</div>
                    <div className="text-xs text-slate-500">{client.cnpj}</div>
                    {client.email && (
                      <div className="text-xs text-slate-500">{client.email}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usuários */}
          {filteredUsers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Usuários ({filteredUsers.length})
              </h3>
              <div className="space-y-2">
                {filteredUsers.slice(0, 3).map((user) => (
                  <div key={user.id} className="p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                      <div className="flex space-x-1">
                        <Badge variant="secondary" className="text-xs">
                          {user.role === 'admin' ? 'Admin' : user.role === 'manager' ? 'Gestor' : 'Operador'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {user.sector}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Setores */}
          {filteredSectors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Setores ({filteredSectors.length})
              </h3>
              <div className="space-y-2">
                {filteredSectors.slice(0, 3).map((sector) => (
                  <div key={sector.id} className="p-2 rounded hover:bg-slate-50 cursor-pointer">
                    <div className="font-medium text-sm">{sector.name}</div>
                    <div className="text-xs text-slate-500">{sector.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
