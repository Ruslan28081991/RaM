import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { getCharactersAPI } from '@/api';
import type { ICharacterCard } from '@/widgets';

export const useCharacter = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await getCharactersAPI.getCharacters();
        setCharacters(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Ошибка при загрузке данных ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { characters, isLoading };
};
