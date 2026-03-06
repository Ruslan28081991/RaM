import { useCallback, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import { HEIGHT_PIXEL, SCROLL_TRIGGER_DIVISOR, TIMER_LOADING } from '@/shared/constants';
import type { TFilters } from '@/shared/types';
import type { ICharacterCard } from '@/widgets';

import { useThrottle } from '../useThrottle/useThrottle';

export const useCharacterList = (filters: TFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  }, [isLoading, hasMore]);

  const throttleNextPage = useThrottle(handleNextPage, TIMER_LOADING);

  useEffect(() => {
    const checkPosition = () => {
      if (isLoading || !hasMore) return;

      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / SCROLL_TRIGGER_DIVISOR - HEIGHT_PIXEL;
      const position = scrolled + screenHeight;

      if (position >= threshold) {
        throttleNextPage();
      }
    };

    window.addEventListener('scroll', checkPosition);

    return () => {
      window.removeEventListener('scroll', checkPosition);
    };
  }, [isLoading, hasMore, throttleNextPage]);

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const abortController = new AbortController();
    const load = async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getCharactersListAPI.getCharacters(filters, page, signal);
        setCharacters((prevData) => (page === 1 ? data.changeResponse : [...prevData, ...data.changeResponse]));
        setHasMore(data.info.next !== null);
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
  }, [filters, page]);

  return { characters, isLoading };
};
