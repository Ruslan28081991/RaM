import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';

import './panelFilters.css';

interface IFilters {
  name: string;
  species: string;
  gender: string;
  status: string;
}

export const PanelFilters = () => {
  const [filters, setFilters] = useState<IFilters>({
    name: '',
    species: '',
    gender: '',
    status: '',
  });

  const handleFiletrChange = (key: string, value: string) => {
    setFilters((previousFilter) => ({ ...previousFilter, [key]: value }));
  };

  return (
    <div className="panel__filters">
      <Input
        size="medium"
        view="bordered"
        placeholder="Filter by name..."
        value={filters.name}
        onChange={(value) => handleFiletrChange('name', value)}
        icon={SearchIcon}
      />
      <Select
        placeholder="Species"
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={(value) => handleFiletrChange('species', value)}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={(value) => handleFiletrChange('gender', value)}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(value) => handleFiletrChange('status', value)}
      />
    </div>
  );
};
