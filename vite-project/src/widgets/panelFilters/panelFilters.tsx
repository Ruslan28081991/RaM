import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';

import './panelFilters.css';

export const PanelFilters = () => {
  const [filters, setFilters] = useState({
    name: '',
    species: '',
    gender: '',
    status: '',
  });

  return (
    <div className="panel__filters">
      <Input
        size="medium"
        view="bordered"
        placeholder="Filter by name..."
        value={filters.name}
        onChange={(value) => setFilters((previousFilter) => ({ ...previousFilter, name: value }))}
        icon={SearchIcon}
      />
      <Select
        placeholder="Species"
        options={SPECIES_OPTIONS}
        value={filters.species}
        onChange={(value) => setFilters((previousFilter) => ({ ...previousFilter, species: value }))}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={filters.gender}
        onChange={(value) => setFilters((previousFilter) => ({ ...previousFilter, gender: value }))}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(value) => setFilters((previousFilter) => ({ ...previousFilter, status: value }))}
      />
    </div>
  );
};
