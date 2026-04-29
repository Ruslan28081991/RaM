import { useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import type { TFilters } from '@/shared/types';
import type { ICharacterCard } from '@/widgets';

export const useCharacterList = (filters: TFilters) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const hasMoreRef = useRef(true);
  const loaderRef = useRef(null);
  const paginationLockRef = useRef(false);
  const didInitLoadRef = useRef(false);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (!target.isIntersecting) return;
        if (!didInitLoadRef.current) return;
        if (paginationLockRef.current) return;
        if (!hasMoreRef.current) return;

        paginationLockRef.current = true;
        setPage((prev) => prev + 1);
      },
      {
        rootMargin: '0px 0px 200px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setPage(1);
    setCharacters([]);
    hasMoreRef.current = true;
    paginationLockRef.current = true;
    didInitLoadRef.current = false;
  }, [filters]);

  useEffect(() => {
    const abortController = new AbortController();
    const load = async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        const data = await getCharactersListAPI.getCharacters(filters, page, signal);
        setCharacters((prevData) => (page === 1 ? data.changeResponse : [...prevData, ...data.changeResponse]));
        hasMoreRef.current = data.info.next !== null;
        if (page === 1) {
          didInitLoadRef.current = true;
        }
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
        paginationLockRef.current = false;
      }
    };
    load(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [filters, page]);

  return { characters, isLoading, loaderRef };
};
