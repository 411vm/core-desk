
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface QuickFiltersProps {
  activeStatusFilters: string[];
  activePriorityFilters: string[];
  onStatusFilterToggle: (status: string) => void;
  onPriorityFilterToggle: (priority: string) => void;
  onClearFilters: () => void;
}

export const QuickFilters = ({
  activeStatusFilters,
  activePriorityFilters,
  onStatusFilterToggle,
  onPriorityFilterToggle,
  onClearFilters
}: QuickFiltersProps) => {
  const statusOptions = [
    { value: 'Novo', label: 'Novo', color: 'bg-blue-100 text-blue-800' },
    { value: 'Em Andamento', label: 'Em Andamento', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'Resolvido', label: 'Resolvido', color: 'bg-green-100 text-green-800' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'Alta', color: 'bg-red-100 text-red-800' },
    { value: 'medium', label: 'Média', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'low', label: 'Baixa', color: 'bg-green-100 text-green-800' }
  ];

  const hasActiveFilters = activeStatusFilters.length > 0 || activePriorityFilters.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">Filtros Rápidos</h4>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Status</p>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeStatusFilters.includes(option.value) ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusFilterToggle(option.value)}
                className={`text-xs ${activeStatusFilters.includes(option.value) ? '' : option.color}`}
              >
                {option.label}
                {activeStatusFilters.includes(option.value) && (
                  <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">
                    ✓
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Prioridade</p>
          <div className="flex flex-wrap gap-2">
            {priorityOptions.map((option) => (
              <Button
                key={option.value}
                variant={activePriorityFilters.includes(option.value) ? "default" : "outline"}
                size="sm"
                onClick={() => onPriorityFilterToggle(option.value)}
                className={`text-xs ${activePriorityFilters.includes(option.value) ? '' : option.color}`}
              >
                {option.label}
                {activePriorityFilters.includes(option.value) && (
                  <Badge variant="secondary" className="ml-2 h-4 w-4 p-0 text-xs">
                    ✓
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
