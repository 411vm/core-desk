
import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientSearch, Client } from '@/hooks/useClientSearch';

interface ClientSearchInputProps {
  value?: Client;
  onChange: (client: Client | null) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const ClientSearchInput: React.FC<ClientSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Digite o nome do cliente ou CNPJ...",
  required = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(value || null);
  const [hasError, setHasError] = useState(false);
  
  const { searchTerm, setSearchTerm, results, isLoading } = useClientSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      setSelectedClient(value);
      setInputValue(value.name);
    }
  }, [value]);

  useEffect(() => {
    setSearchTerm(inputValue);
  }, [inputValue, setSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        validateSelection();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedClient, inputValue]);

  const validateSelection = () => {
    if (required && inputValue && !selectedClient) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    setHasError(false);
    
    if (!value) {
      setSelectedClient(null);
      onChange(null);
    } else if (selectedClient && value !== selectedClient.name) {
      setSelectedClient(null);
      onChange(null);
    }
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setInputValue(client.name);
    setIsOpen(false);
    setHasError(false);
    onChange(client);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      validateSelection();
    }, 150);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-10 py-2 border rounded-md text-sm bg-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
            "dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]",
            hasError && "border-red-500 focus:ring-red-500",
            selectedClient && "border-green-500 focus:ring-green-500"
          )}
          required={required}
        />
        {selectedClient && (
          <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 h-4 w-4" />
        )}
        {!selectedClient && (
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        )}
      </div>

      {hasError && (
        <p className="mt-1 text-sm text-red-600">
          Por favor, selecione um cliente válido da lista
        </p>
      )}

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading && (
            <div className="flex items-center justify-center py-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-500">Buscando...</span>
            </div>
          )}

          {!isLoading && results.length === 0 && inputValue && (
            <div className="flex items-center py-3 px-4 text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              Nenhum cliente encontrado
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-1">
              {results.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => handleSelectClient(client)}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700 focus:outline-none"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-sm text-slate-900 dark:text-[#F6F6F6]">
                        {client.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-slate-400">
                        CNPJ: {client.cnpj}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {!isLoading && inputValue && results.length === 0 && (
            <div className="py-2 px-4 text-sm text-gray-500 border-t">
              <p className="text-xs">
                💡 <strong>Dica:</strong> Digite o nome da empresa ou CNPJ para buscar
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
