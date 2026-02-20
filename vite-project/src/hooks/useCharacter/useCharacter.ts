import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { getCharactersAPI } from '@/api';
import type { ICharacterCard } from '@/widgets';

export const UseCharacter = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCharactersAPI.getCharacters();
        setCharacters(data);
      } catch (error) {
        toast.error(`Ошибка при загрузке данных ${error}`);
      }
    };
    load();
  }, []);

  return { characters };
};
