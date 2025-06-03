
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCriticalTimeAlerts } from '@/hooks/useCriticalTimeAlerts';
import { BaseTicket, AlertLevel } from '@/types/ticket';

interface CriticalTimeAlertProps {
  ticket: BaseTicket;
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

  const getAlertMessage = (): string => {
    if (hoursOverdue > 48) {
      return `CRÍTICO: ${hoursOverdue}h em atraso`;
    }
    return `${hoursOverdue}h em atraso`;
  };

  const getAlertColor = (): string => {
    const colorMap: Record<AlertLevel, string> = {
      severe: 'bg-red-600 text-white border-red-700',
      critical: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colorMap[alertLevel];
  };

  const getIconColor = (): string => {
    return alertLevel === 'severe' 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-red-500 dark:text-red-400';
  };

  return (
    <div className="flex items-center space-x-2">
      {showIcon && (
        <div 
          className="flex items-center"
          title={`Chamado ultrapassou o tempo limite crítico - ${getAlertMessage()}`}
        >
          <AlertTriangle 
            className={`h-4 w-4 animate-pulse ${getIconColor()}`} 
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
