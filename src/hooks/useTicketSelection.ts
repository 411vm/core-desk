
import { useState } from 'react';

export const useTicketSelection = () => {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) 
        ? prev.filter(id => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handleSelectAll = (ticketIds: string[]) => {
    if (selectedTickets.length === ticketIds.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(ticketIds);
    }
  };

  const clearSelection = () => {
    setSelectedTickets([]);
  };

  return {
    selectedTickets,
    handleTicketSelect,
    handleSelectAll,
    clearSelection
  };
};
