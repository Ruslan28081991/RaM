import { useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getCharactersListAPI } from '@/api';
import { filtersStore } from '@/stores/store';
export const useCharacterList = () => {
  const filtersName = filtersStore((state) => state.filters.name);
  const filtersGender = filtersStore((state) => state.filters.gender);
  const filtersSpecies = filtersStore((state) => state.filters.species);
  const filtersStatus = filtersStore((state) => state.filters.status);

  const filters = useMemo(
    () => ({
      name: filtersName || '',
      species: filtersSpecies || '',
      gender: filtersGender || '',
      status: filtersStatus || '',
    }),

    [filtersName, filtersSpecies, filtersGender, filtersStatus]
  );

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['characters', filters],
    initialPageParam: 1,
    queryFn: async ({ pageParam, signal }) => {
      const response = await getCharactersListAPI.getCharacters(filters, pageParam, signal);

      return response;
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.info.next === null ? undefined : lastPageParam + 1;
    },
    retry: 5,
    retryDelay: 3000,
  });

  const characters = data?.pages.flatMap((item) => item.changeResponse) ?? [];

  return { characters, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage };
};
