import type { IOption, TStatus } from '../components';
import type { TOptions } from '../types';

export const SPECIES_OPTIONS: TOptions[] = [
  { value: 'human', label: 'Human' },
  { value: 'alien', label: 'Alien' },
  { value: 'humanoid', label: 'Humanoid' },
  { value: 'animal', label: 'Animal' },
  { value: 'robot', label: 'Robot' },
  { value: 'cronenberg', label: 'Cronenberg' },
  { value: 'mythology', label: 'Mythology' },
  { value: 'disease', label: 'Disease' },
  { value: 'unknown', label: 'Unknown' },
];

export const GENDER_OPTIONS: TOptions[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' },
];

export const STATUS_OPTIONS: IOption<TStatus>[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' },
];
