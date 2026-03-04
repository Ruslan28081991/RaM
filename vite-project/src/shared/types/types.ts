import type { ReactNode } from 'react';

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
