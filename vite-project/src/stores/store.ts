import { create } from 'zustand';

import type { IFiltersStore, TFiltersKey } from '@/shared/types';

export const filtersStore = create<IFiltersStore>()((set) => ({
  filters: {
    name: '',
    species: '',
    gender: '',
    status: '',
  },
  setFilters: <K extends TFiltersKey>(key: K, value: IFiltersStore['filters'][K]) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),
}));
