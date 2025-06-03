
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Sector {
  id: string;
  name: string;
  color: string;
}

interface SectorFilterProps {
  sectors: Sector[];
  selectedSector: string;
  onSectorChange: (sectorId: string) => void;
  ticketCounts: Record<string, number>;
}

export const SectorFilter = ({ 
  sectors, 
  selectedSector, 
  onSectorChange, 
  ticketCounts 
}: SectorFilterProps) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedSector === 'all' ? 'default' : 'outline'}
          onClick={() => onSectorChange('all')}
          className="relative"
        >
          Todos os chamados
          <Badge 
            variant="secondary" 
            className="ml-2 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
          >
            {ticketCounts.all || 0}
          </Badge>
        </Button>
        
        {sectors.map((sector) => (
          <Button
            key={sector.id}
            variant={selectedSector === sector.id ? 'default' : 'outline'}
            onClick={() => onSectorChange(sector.id)}
            className="relative"
            style={{
              backgroundColor: selectedSector === sector.id ? sector.color : undefined,
              borderColor: sector.color,
              color: selectedSector === sector.id ? 'white' : sector.color
            }}
          >
            {sector.name}
            <Badge 
              variant="secondary" 
              className="ml-2 bg-white/20 text-current"
            >
              {ticketCounts[sector.id] || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};
