import { useCallback, useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import type { TFilters } from '@/shared/types';
import type { ICharacterCard } from '@/widgets';

export const useCharacterList = (filters: TFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const loaderRef = useRef(null);
  const isFirstLoad = useRef(true);

  const handleNextPage = useCallback(() => {
    if (isLoading || !hasMore) return;

    setPage((prev) => prev + 1);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (!target.isIntersecting) return;
        if (isLoading) return;
        if (!hasMore) return;

        if (isFirstLoad.current) {
          isFirstLoad.current = false;
          return;
        }

        handleNextPage();
      },
      {
        rootMargin: '200px',
      }
    );

    observer.observe(el);

    return () => observer.unobserve(el);
  }, [isLoading, hasMore, handleNextPage]);

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setHasMore(true);
    isFirstLoad.current = true;
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

  return { characters, isLoading, page, loaderRef };
};
