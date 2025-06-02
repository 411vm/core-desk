
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter, Check, CheckCheck } from 'lucide-react';

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

const Notifications = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
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
    },
    {
      id: '4',
      title: 'Chamado resolvido',
      message: 'Paula Mendes marcou o chamado de impressora como resolvido',
      ticketId: '#2024-005',
      clientName: 'Paula Mendes',
      type: 'ticket_update',
      read: true,
      createdAt: '2024-01-14 16:15'
    }
  ]);

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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'new_ticket': return 'Novo Chamado';
      case 'ticket_update': return 'Atualização';
      case 'assignment': return 'Atribuição';
      case 'comment': return 'Comentário';
      default: return 'Notificação';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'read' && notification.read) ||
      (statusFilter === 'unread' && !notification.read);
    
    return matchesSearch && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#2b2d31]">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-[#F6F6F6]">
                Todas as Notificações
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {unreadCount > 0 && `${unreadCount} não lidas • `}
                {notifications.length} notificações no total
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Marcar todas como lidas
            </Button>
          )}
        </div>

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Buscar por chamado, cliente ou texto da notificação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
              >
                <option value="all">Todas as datas</option>
                <option value="today">Hoje</option>
                <option value="week">Esta semana</option>
                <option value="month">Este mês</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-[#F6F6F6]"
              >
                <option value="all">Todas</option>
                <option value="unread">Não lidas</option>
                <option value="read">Lidas</option>
              </select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${
                !notification.read ? 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-2xl">{getTypeIcon(notification.type)}</div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-[#F6F6F6]">
                        {notification.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(notification.type)}
                      </Badge>
                      {!notification.read && (
                        <Badge variant="destructive" className="text-xs">
                          Nova
                        </Badge>
                      )}
                    </div>
                    
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-4">
                      <span>{notification.createdAt}</span>
                      {notification.clientName && (
                        <span>Cliente: {notification.clientName}</span>
                      )}
                    </div>
                    {notification.ticketId && (
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {notification.ticketId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              Nenhuma notificação encontrada com os filtros aplicados.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
