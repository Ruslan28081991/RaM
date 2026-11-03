import type { TFiltersKey } from './types';

export interface ICharacter {
  image: string;
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: {
    name: string;
  };
  type: string;
  location: {
    name: string;
  };
}

export interface IFiltersStore {
  filters: {
    name: string;
    species: string;
    gender: string;
    status: string;
  };
  setFilters: <K extends TFiltersKey>(key: K, value: IFiltersStore['filters'][K]) => void;
}

export interface IPanelFilters {
  filters: {
    name: string;
    species: string;
    gender: string;
    status: string;
  };
}
