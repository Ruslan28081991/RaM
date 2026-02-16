import { useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Input, Select } from '@/shared/components';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '@/shared/constants';

import './panelFilters.css';

export const PanelFilters = () => {
  const [isFind, setIsFind] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [statusValue, setStatusValue] = useState('');

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
        value={speciesValue}
        onChange={(value) => setSpeciesValue(value)}
      />
      <Select
        placeholder="Gender"
        options={GENDER_OPTIONS}
        value={genderValue}
        onChange={(value) => setGenderValue(value)}
      />
      <Select
        placeholder="Status"
        options={STATUS_OPTIONS}
        value={statusValue}
        onChange={(value) => setStatusValue(value)}
      />
    </div>
  );
};
