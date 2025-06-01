
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface PeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodFilter = ({ period, onPeriodChange }: PeriodFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-4 w-4 text-slate-500" />
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Esta Semana</SelectItem>
          <SelectItem value="month">Este Mês</SelectItem>
          <SelectItem value="quarter">Este Trimestre</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
