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
    queryFn: ({ pageParam, signal }) => {
      const response = getCharactersListAPI.getCharacters(filters, pageParam, signal);
      return response;
    },
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      return lastPage.info.next === null ? undefined : lastPageParam + 1;
    },
    select: (data) => data?.pages.flatMap((item) => item.changeResponse),
  });

  const characters = data ?? [];

  return { characters, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage };
};
