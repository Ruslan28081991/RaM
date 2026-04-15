import { useEffect, useState } from 'react';

import type { SetURLSearchParams } from 'react-router-dom';

import { SearchIcon } from '@/assets/icons';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';

import './panelFilters.css';

export interface IPanelFilters {
  filters: {
    name: string;
    species: string;
    gender: string;
    status: string;
  };
  changeFilters: SetURLSearchParams;
  searchParams: URLSearchParams;
}

export const PanelFilters = ({ filters, changeFilters, searchParams }: IPanelFilters) => {
  const [name, setName] = useState(filters.name);

  const handleFilterChange = (key: string, value: string) => {
    const copyParams = new URLSearchParams(searchParams);
    if (value) {
      copyParams.set(key, value);
    } else {
      copyParams.delete(key);
    }

    changeFilters(copyParams);
  };

  const debouncedName = useDebounce(name, 500);

  useEffect(() => {
    handleFilterChange('name', debouncedName);
  }, [debouncedName]);

  useEffect(() => {
    if (name !== filters.name) {
      setName(filters.name);
    }
  }, [filters.name]);

  return (
    <div className="panel__filters">
      <Input
        size="medium"
        view="bordered"
        placeholder="Filter by name..."
        value={name}
        onChange={(value) => setName(value)}
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
