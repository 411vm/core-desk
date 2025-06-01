
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface PriorityHelperProps {
  description: string;
  onPrioritySuggestion: (priority: 'low' | 'medium' | 'high' | 'urgent') => void;
}

export const PriorityHelper = ({ description, onPrioritySuggestion }: PriorityHelperProps) => {
  const [suggestedPriority, setSuggestedPriority] = useState<'low' | 'medium' | 'high' | 'urgent' | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const urgentKeywords = ['urgente', 'crítico', 'grave', 'parado', 'bloqueado', 'emergência'];
  const highKeywords = ['importante', 'prioridade', 'rápido', 'assim que possível', 'asap'];
  const mediumKeywords = ['problema', 'erro', 'bug', 'não funciona'];

  useEffect(() => {
    if (description.length > 10) {
      const lowerDesc = description.toLowerCase();
      
      if (urgentKeywords.some(keyword => lowerDesc.includes(keyword))) {
        setSuggestedPriority('urgent');
        setShowSuggestion(true);
      } else if (highKeywords.some(keyword => lowerDesc.includes(keyword))) {
        setSuggestedPriority('high');
        setShowSuggestion(true);
      } else if (mediumKeywords.some(keyword => lowerDesc.includes(keyword))) {
        setSuggestedPriority('medium');
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    } else {
      setShowSuggestion(false);
    }
  }, [description]);

  if (!showSuggestion || !suggestedPriority) return null;

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-2">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-4 w-4 text-blue-600" />
        <span className="text-sm text-blue-900 dark:text-blue-100">
          Sugestão de prioridade baseada no conteúdo:
        </span>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <Badge className={`${getPriorityColor(suggestedPriority)}`}>
          {getPriorityLabel(suggestedPriority)}
        </Badge>
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSuggestion(false)}
          >
            Ignorar
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onPrioritySuggestion(suggestedPriority);
              setShowSuggestion(false);
            }}
            className="flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
};
