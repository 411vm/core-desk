
import { PriorityLevel, TicketStatus } from '@/types/ticket';

export const getPriorityColor = (priority: PriorityLevel): string => {
  const colorMap: Record<PriorityLevel, string> = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };
  return colorMap[priority] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getPriorityLabel = (priority: PriorityLevel): string => {
  const labelMap: Record<PriorityLevel, string> = {
    urgent: 'Urgente',
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa'
  };
  return labelMap[priority] || 'Normal';
};

export const getStatusColor = (status: TicketStatus): string => {
  const colorMap: Record<TicketStatus, string> = {
    'Novo': 'bg-blue-100 text-blue-800 border-blue-200',
    'Em Andamento': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Aguardando': 'bg-orange-100 text-orange-800 border-orange-200',
    'Resolvido': 'bg-green-100 text-green-800 border-green-200'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const formatTicketId = (id: string): string => {
  return id.startsWith('#') ? id.substring(1) : id;
};

export const addHashToId = (id: string): string => {
  return id.startsWith('#') ? id : `#${id}`;
};
