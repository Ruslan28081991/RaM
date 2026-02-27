import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersAPI } from '@/api';
import type { IFilters } from '@/shared/types/interfaces';
import type { ICharacterCard } from '@/widgets';

export const useCharacter = (filters: IFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const load = async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getCharactersAPI.getCharacters(filters, signal);
        setCharacters(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.name === 'AbortError' || axios.isCancel(error)) return;
          toast.error(`Ошибка при загрузке данных ${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    load(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [filters]);

  return { characters, isLoading };
};
