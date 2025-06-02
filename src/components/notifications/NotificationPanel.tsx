
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Check, CheckCheck, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  ticketId?: string;
  clientName?: string;
  type: 'ticket_update' | 'new_ticket' | 'assignment' | 'comment';
  read: boolean;
  createdAt: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Novo chamado aberto',
      message: 'Maria Silva abriu um novo chamado sobre problemas de email',
      ticketId: '#2024-001',
      clientName: 'Maria Silva',
      type: 'new_ticket',
      read: false,
      createdAt: '2024-01-15 14:30'
    },
    {
      id: '2',
      title: 'Chamado atualizado',
      message: 'Ana Costa respondeu ao chamado sobre computador travando',
      ticketId: '#2024-003',
      clientName: 'Ana Costa',
      type: 'comment',
      read: false,
      createdAt: '2024-01-15 13:45'
    },
    {
      id: '3',
      title: 'Chamado atribuído',
      message: 'Você foi atribuído ao chamado de reset de senha',
      ticketId: '#2024-004',
      clientName: 'Carlos Oliveira',
      type: 'assignment',
      read: true,
      createdAt: '2024-01-15 11:20'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'new_ticket': return '🎫';
      case 'ticket_update': return '📝';
      case 'assignment': return '👤';
      case 'comment': return '💬';
      default: return '📢';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 h-full shadow-xl">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-[#F6F6F6]">
                Notificações
              </h2>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {unreadCount > 0 && (
            <div className="mt-3 flex justify-between">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="h-4 w-4 mr-2" />
                Marcar todas como lidas
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                !notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg">{getTypeIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-[#F6F6F6]">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {notification.message}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {notification.createdAt}
                    </span>
                    {notification.ticketId && (
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {notification.ticketId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Button 
            className="w-full" 
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
          >
            <Eye className="h-4 w-4 mr-2" />
            Ver todas as notificações
          </Button>
        </div>
      </div>
    </div>
  );
};
