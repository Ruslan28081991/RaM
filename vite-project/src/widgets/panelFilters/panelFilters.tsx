import { useEffect, useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { useDebounce } from '@/hooks';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS, TIMER_DEBOUNCE } from '@/shared/constants';
import { filtersStore } from '@/stores/store';

import './panelFilters.css';

export const PanelFilters = () => {
  const filtersName = filtersStore((state) => state.filters.name);
  const filtersSpecies = filtersStore((state) => state.filters.species);
  const filtersGender = filtersStore((state) => state.filters.gender);
  const filtersStatus = filtersStore((state) => state.filters.status);

  const [name, setName] = useState(filtersName);
  const setFilters = filtersStore((state) => state.setFilters);
  const debaucedName = useDebounce(name, TIMER_DEBOUNCE);

  useEffect(() => {
    setFilters('name', debaucedName);
  }, [debaucedName]);

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
        value={filtersSpecies}
        onChange={(value) => setFilters('species', value)}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={filtersGender}
        onChange={(value) => setFilters('gender', value)}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={filtersStatus}
        onChange={(value) => setFilters('status', value)}
      />
    </div>
  );
};
