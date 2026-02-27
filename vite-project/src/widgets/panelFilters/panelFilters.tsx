import { SearchIcon } from '@/assets/icons';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';
import type { IFilters } from '@/shared/types/interfaces';

import './panelFilters.css';

interface IPanelFilters {
  filters: {
    name: string;
    species: string;
    gender: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<IFilters>>;
}

export const PanelFilters = ({ filters, setFilters }: IPanelFilters) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilters((previousFilter) => ({ ...previousFilter, [key]: value }));
  };

  return (
    <div className="panel__filters">
      <Input
        size="medium"
        view="bordered"
        placeholder="Filter by name..."
        value={filters.name}
        onChange={(value) => handleFilterChange('name', value)}
        icon={SearchIcon}
      />
      <Select
        placeholder="Species"
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={(value) => handleFilterChange('species', value)}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={(value) => handleFilterChange('gender', value)}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(value) => handleFilterChange('status', value)}
      />
    </div>
  );
};
