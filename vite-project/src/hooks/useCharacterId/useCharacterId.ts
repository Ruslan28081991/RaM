import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

import { getCharactersListAPI } from '@/api';
import type { ICharacter } from '@/shared/types';

export const useCharacterId = (id: string) => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadCharacter = async (id: string) => {
      try {
        const data = await getCharactersListAPI.getCharacterId(id);
        if (!data) {
          setIsError(true);
          return;
        }
        setCharacter(data.info);
      } catch (error) {
        if (axios.isCancel(error)) return;

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setIsError(true);
            return;
          } else {
            toast.error(`Error loading data ${error.message}`);
          }
        }
      }
    };
    loadCharacter(id);
  }, [id]);

  return { character, isError };
};
