import { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import { FETCH_DELAY } from '@/shared/constants';
import type { TFilters } from '@/shared/types';
import type { ICharacterCard } from '@/widgets';

export const useCharacterList = (filters: TFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loadedPageRef = useRef(0);

  const handleNextPage = () => {
    if (page === loadedPageRef.current) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
    loadedPageRef.current = 0;
    setCharacters([]);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;

    const abortController = new AbortController();

    const load = async (signal: AbortSignal) => {
      while (attempts < maxAttempts) {
        try {
          setIsLoading(true);
          const data = await getCharactersListAPI.getCharacters(filters, page, signal);
          setCharacters((prevData) => (page === 1 ? data.changeResponse : [...prevData, ...data.changeResponse]));
          setHasMore(data.info.next !== null);
          loadedPageRef.current = page;
          break;
        } catch (error) {
          attempts++;
          if (attempts > maxAttempts) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status === 404) {
                return setCharacters([]);
              } else {
                toast.error(`Error loading data ${error.message}`);
              }
            }
          }

          await new Promise((resolve) => {
            setTimeout(resolve, FETCH_DELAY);
          });
        }
      }
      setIsLoading(false);
    };
    load(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [filters, page]);

  return { characters, isLoading, hasMore, handleNextPage };
};
