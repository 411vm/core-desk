
import { useState, useEffect } from 'react';

export interface Client {
  id: string;
  name: string;
  cnpj: string;
  email?: string;
  phone?: string;
}

// Mock de clientes para demonstração
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Amparo Tech Soluções',
    cnpj: '12.345.678/0001-90',
    email: 'contato@amparotech.com.br',
    phone: '(11) 9999-8888'
  },
  {
    id: '2',
    name: 'Inovação Digital LTDA',
    cnpj: '98.765.432/0001-10',
    email: 'vendas@inovacaodigital.com.br',
    phone: '(11) 8888-7777'
  },
  {
    id: '3',
    name: 'TechSolutions Empresa',
    cnpj: '11.222.333/0001-44',
    email: 'suporte@techsolutions.com.br',
    phone: '(11) 7777-6666'
  },
  {
    id: '4',
    name: 'Consultoria Avançada ME',
    cnpj: '55.666.777/0001-88',
    email: 'info@consultoriaavancada.com.br',
    phone: '(11) 6666-5555'
  },
  {
    id: '5',
    name: 'Digital Corp Sistemas',
    cnpj: '22.333.444/0001-99',
    email: 'contato@digitalcorp.com.br',
    phone: '(11) 5555-4444'
  }
];

export const useClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      setIsLoading(true);
      
      // Simular busca na API
      const filteredClients = mockClients.filter(client => {
        const searchLower = searchTerm.toLowerCase();
        const cnpjOnly = client.cnpj.replace(/[^\d]/g, '');
        const searchOnlyNumbers = searchTerm.replace(/[^\d]/g, '');
        
        return (
          client.name.toLowerCase().includes(searchLower) ||
          cnpjOnly.includes(searchOnlyNumbers) ||
          client.cnpj.includes(searchTerm)
        );
      });

      setResults(filteredClients);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading
  };
};
