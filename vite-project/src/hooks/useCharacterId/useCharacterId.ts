import { useQuery } from '@tanstack/react-query';

import { getCharactersListAPI } from '@/api';

export const useCharacterId = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharactersListAPI.getCharacterId(id),
    select: (data) => data.info,
  });

  return { character: data, isError, isLoading };
};
