
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCriticalTimeAlerts } from '@/hooks/useCriticalTimeAlerts';

interface CriticalTimeAlertProps {
  ticket: {
    id: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: string;
    createdAt: string;
  };
  showBadge?: boolean;
  showIcon?: boolean;
}

export const CriticalTimeAlert = ({ 
  ticket, 
  showBadge = true, 
  showIcon = true 
}: CriticalTimeAlertProps) => {
  const { isCritical, hoursOverdue, alertLevel } = useCriticalTimeAlerts(ticket);

  if (!isCritical) return null;

  const getAlertMessage = () => {
    if (hoursOverdue > 48) {
      return `CRÍTICO: ${hoursOverdue}h em atraso`;
    }
    return `${hoursOverdue}h em atraso`;
  };

  const getAlertColor = () => {
    switch (alertLevel) {
      case 'severe':
        return 'bg-red-600 text-white border-red-700';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-orange-100 text-orange-800 border-orange-200';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {showIcon && (
        <div 
          className="flex items-center"
          title={`Chamado ultrapassou o tempo limite crítico - ${getAlertMessage()}`}
        >
          <AlertTriangle 
            className={`h-4 w-4 animate-pulse ${
              alertLevel === 'severe' 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-red-500 dark:text-red-400'
            }`} 
          />
        </div>
      )}
      
      {showBadge && (
        <Badge className={`text-xs animate-pulse ${getAlertColor()}`}>
          {getAlertMessage()}
        </Badge>
      )}
    </div>
  );
};
