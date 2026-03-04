import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import type { TFilters } from '@/shared/types';
import type { ICharacterCard } from '@/widgets';

export const useCharacterList = (filters: TFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const load = async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getCharactersListAPI.getCharacters(filters, signal);
        setCharacters(data);
      } catch (error) {
        if (axios.isCancel(error)) return;
        if (error instanceof Error && error.name === 'AbortError') return;

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            return setCharacters([]);
          } else {
            toast.error(`Error loading data ${error.message}`);
          }
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
