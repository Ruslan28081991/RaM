import { useQuery } from '@tanstack/react-query';

import { getCharactersListAPI } from '@/api';

export const useCharacterId = (id: string) => {
  const { data, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const data = await getCharactersListAPI.getCharacterId(id);
      return data;
    },
  });
  const character = data?.info;

  return { character, isError };
};
