import type { ReactNode } from 'react';

import type { IFiltersStore } from './interfaces';

export type TFilters = {
  name: string;
  species: string;
  gender: string;
  status: string;
};

export type TOptions = {
  value: string;
  label: string;
};

export type TProps = {
  children: ReactNode;
};

export type TState = {
  hasError: boolean;
};

export type TFiltersKey = keyof IFiltersStore['filters'];
