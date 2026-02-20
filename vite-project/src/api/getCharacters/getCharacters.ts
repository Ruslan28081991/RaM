import axios from 'axios';

import { BASE_URL } from '@/shared/constants';
import type { ICharacterCard } from '@/widgets';

export const getCharactersAPI = {
  getCharacters: async () => {
    const response = await axios.get(BASE_URL);
    const changeResponse = response.data.results.map((character: ICharacterCard) => ({
      ...character,
      status: character.status[0].toLowerCase() + character.status.slice(1),
    }));

    return changeResponse;
  },
};
