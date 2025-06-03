
import { useMemo } from 'react';

interface Ticket {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: string;
  createdAt: string;
}

interface CriticalAlert {
  isCritical: boolean;
  hoursOverdue: number;
  alertLevel: 'warning' | 'critical' | 'severe';
}

export const useCriticalTimeAlerts = (ticket: Ticket): CriticalAlert => {
  return useMemo(() => {
    // Apenas chamados urgentes e de alta prioridade são considerados críticos
    const isCriticalPriority = ticket.priority === 'urgent' || ticket.priority === 'high';
    
    // Apenas chamados ainda não resolvidos
    const isOpen = ticket.status !== 'Resolvido';
    
    if (!isCriticalPriority || !isOpen) {
      return {
        isCritical: false,
        hoursOverdue: 0,
        alertLevel: 'warning'
      };
    }

    // Calcular tempo decorrido desde a criação
    const createdDate = new Date(ticket.createdAt.replace(' ', 'T'));
    const now = new Date();
    const hoursElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
    
    // Regra de negócio: 24 horas para urgente, 72 horas para alta prioridade
    const timeLimit = ticket.priority === 'urgent' ? 24 : 72;
    const hoursOverdue = Math.max(0, hoursElapsed - timeLimit);
    
    let alertLevel: 'warning' | 'critical' | 'severe' = 'warning';
    if (hoursOverdue > 48) {
      alertLevel = 'severe';
    } else if (hoursOverdue > 0) {
      alertLevel = 'critical';
    }

    return {
      isCritical: hoursOverdue > 0,
      hoursOverdue,
      alertLevel
    };
  }, [ticket.priority, ticket.status, ticket.createdAt]);
};

export const getCriticalAlertStyles = (alertLevel: 'warning' | 'critical' | 'severe') => {
  switch (alertLevel) {
    case 'severe':
      return {
        cardClass: 'bg-red-100 dark:bg-red-950/30 border-red-500 dark:border-red-400 ring-2 ring-red-500/20',
        iconColor: 'text-red-600 dark:text-red-400',
        textColor: 'text-red-800 dark:text-red-300'
      };
    case 'critical':
      return {
        cardClass: 'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-500 ring-1 ring-red-400/30',
        iconColor: 'text-red-500 dark:text-red-400',
        textColor: 'text-red-700 dark:text-red-300'
      };
    default:
      return {
        cardClass: '',
        iconColor: '',
        textColor: ''
      };
  }
};
