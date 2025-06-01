
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchSuggestion {
  type: 'id' | 'title' | 'requester' | 'keyword';
  value: string;
  label: string;
}

interface SmartSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void;
}

export const SmartSearch = ({ value, onChange, onSuggestionSelect }: SmartSearchProps) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock suggestions - in a real app, this would come from an API
  const mockSuggestions: SearchSuggestion[] = [
    { type: 'id', value: '#2024-001', label: '#2024-001 - Problema com email' },
    { type: 'id', value: '#2024-002', label: '#2024-002 - Instalação Adobe' },
    { type: 'requester', value: 'Maria Silva', label: 'Maria Silva (Solicitante)' },
    { type: 'requester', value: 'João Santos', label: 'João Santos (Solicitante)' },
    { type: 'keyword', value: 'impressora', label: 'Chamados sobre impressora' },
    { type: 'keyword', value: 'senha', label: 'Chamados sobre senha' }
  ];

  useEffect(() => {
    if (value.length >= 2) {
      const filtered = mockSuggestions.filter(
        suggestion => 
          suggestion.label.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.value.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.value);
    setShowSuggestions(false);
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
        <Input
          placeholder="Buscar por ID, título, solicitante ou palavras-chave..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                  {suggestion.type === 'id' ? 'ID' : 
                   suggestion.type === 'title' ? 'Título' : 
                   suggestion.type === 'requester' ? 'Pessoa' : 'Palavra-chave'}
                </span>
                <span className="text-sm text-slate-900 dark:text-[#F6F6F6]">
                  {suggestion.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
