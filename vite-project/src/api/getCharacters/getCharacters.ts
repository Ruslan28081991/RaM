import axios from 'axios';

import { BASE_URL } from '@/shared/constants';
import type { IFilters } from '@/shared/types/interfaces';
import type { ICharacterCard } from '@/widgets';

export const getCharactersAPI = {
  getCharacters: async (filters: IFilters, signal: AbortSignal) => {
    const entries = Object.entries(filters).filter(([_, value]) => value !== '');
    const params = new URLSearchParams(entries);

    const response = await axios.get(`${BASE_URL}/?${params}`, { signal });
    const changeResponse = response.data.results.map((character: ICharacterCard) => ({
      ...character,
      status: character.status[0].toLowerCase() + character.status.slice(1),
    }));

    return changeResponse;
  },
};
