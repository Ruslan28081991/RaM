import axios from 'axios';

import { BASE_URL } from '@/shared/constants';
import type { TFilters } from '@/shared/types/types';
import type { ICharacterCard } from '@/widgets';

export const getCharactersListAPI = {
  getCharacters: async (filters: TFilters, page: number, signal: AbortSignal) => {
    const entries = Object.entries(filters).filter(([, value]) => value !== '');
    const params = new URLSearchParams(entries);
    params.append('page', String(page));

    const response = await axios.get(`${BASE_URL}/?${params}`, { signal });
    const changeResponse = response.data.results.map((character: ICharacterCard) => ({
      ...character,
      status: character.status[0].toLowerCase() + character.status.slice(1),
    }));
    const info = response.data.info;

    return { changeResponse, info };
  },

  getCharacterId: async (id: string) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    const info = response.data;
    return { info };
  },
};
