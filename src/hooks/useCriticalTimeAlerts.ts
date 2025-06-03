
import { useMemo } from 'react';
import { BaseTicket, CriticalAlert, AlertLevel } from '@/types/ticket';

export const useCriticalTimeAlerts = (ticket: BaseTicket): CriticalAlert => {
  return useMemo(() => {
    const isCriticalPriority = ticket.priority === 'urgent' || ticket.priority === 'high';
    const isOpen = ticket.status !== 'Resolvido';
    
    if (!isCriticalPriority || !isOpen) {
      return {
        isCritical: false,
        hoursOverdue: 0,
        alertLevel: 'warning'
      };
    }

    const createdDate = new Date(ticket.createdAt.replace(' ', 'T'));
    const now = new Date();
    const hoursElapsed = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60));
    
    const timeLimit = ticket.priority === 'urgent' ? 24 : 72;
    const hoursOverdue = Math.max(0, hoursElapsed - timeLimit);
    
    let alertLevel: AlertLevel = 'warning';
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

export const getCriticalAlertStyles = (alertLevel: AlertLevel) => {
  const styleMap: Record<AlertLevel, any> = {
    severe: {
      cardClass: 'bg-red-100 dark:bg-red-950/30 border-red-500 dark:border-red-400 ring-2 ring-red-500/20',
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-800 dark:text-red-300'
    },
    critical: {
      cardClass: 'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-500 ring-1 ring-red-400/30',
      iconColor: 'text-red-500 dark:text-red-400',
      textColor: 'text-red-700 dark:text-red-300'
    },
    warning: {
      cardClass: '',
      iconColor: '',
      textColor: ''
    }
  };
  
  return styleMap[alertLevel];
};
