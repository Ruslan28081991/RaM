import { useQuery } from '@tanstack/react-query';

import { getCharactersListAPI } from '@/api';

export const useCharacterId = (id: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const data = await getCharactersListAPI.getCharacterId(id);
      return data;
    },
    select: (data) => data.info,
  });

  return { character: data, isError, isLoading };
};
