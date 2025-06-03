
import { useMemo, useState } from 'react';
import { BaseTicket } from '@/types/ticket';

export const useTicketFilters = (tickets: BaseTicket[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const [activePriorityFilters, setActivePriorityFilters] = useState<string[]>([]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = searchTerm === '' || 
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = activeStatusFilters.length === 0 || 
        activeStatusFilters.includes(ticket.status);
      
      const matchesPriority = activePriorityFilters.length === 0 || 
        activePriorityFilters.includes(ticket.priority);
      
      const isRecentOrReply = ticket.status === 'Novo' || ticket.hasCustomerReply;
      
      return matchesSearch && matchesStatus && matchesPriority && isRecentOrReply;
    });
  }, [tickets, searchTerm, activeStatusFilters, activePriorityFilters]);

  const handleStatusFilterToggle = (status: string) => {
    setActiveStatusFilters(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handlePriorityFilterToggle = (priority: string) => {
    setActivePriorityFilters(prev =>
      prev.includes(priority)
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const handleClearFilters = () => {
    setActiveStatusFilters([]);
    setActivePriorityFilters([]);
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    activeStatusFilters,
    activePriorityFilters,
    filteredTickets,
    handleStatusFilterToggle,
    handlePriorityFilterToggle,
    handleClearFilters
  };
};
