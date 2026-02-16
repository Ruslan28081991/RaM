import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';

import './panelFilters.css';

export const PanelFilters = () => {
  const [isFind, setIsFind] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const handleChangeFind = (newValue: string) => {
    setIsFind(newValue);
  };

  return (
    <div className="panel__filters">
      <Input
        size="medium"
        view="bordered"
        placeholder="Filter by name..."
        value={isFind}
        onChange={handleChangeFind}
        icon={SearchIcon}
      />
      <Select
        placeholder="Species"
        options={SPECIES_OPTIONS}
        value={species}
        onChange={(value) => setSpecies(value)}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={gender}
        onChange={(value) => setGender(value)}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={status}
        onChange={(value) => setStatus(value)}
      />
    </div>
  );
};
