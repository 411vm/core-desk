
export interface BaseTicket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee: string;
  requester: string;
  createdAt: string;
  responses: number;
  attachments: number;
  status: string;
  hasCustomerReply: boolean;
  updatedAt: string;
}

export interface TicketDetail extends BaseTicket {
  sector: string;
}

export interface TicketResponse {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'customer' | 'staff' | 'system';
  isPrivate: boolean;
}

export type PriorityLevel = 'urgent' | 'high' | 'medium' | 'low';
export type TicketStatus = 'Novo' | 'Em Andamento' | 'Aguardando' | 'Resolvido';
export type AlertLevel = 'warning' | 'critical' | 'severe';

export interface CriticalAlert {
  isCritical: boolean;
  hoursOverdue: number;
  alertLevel: AlertLevel;
}
