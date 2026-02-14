import { Link } from 'react-router-dom';

import { Input } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants';

interface ICharacterCardName {
  isEdit: boolean;
  characterName: string;
  setCharacterName: (value: string) => void;
}

export const CharacterCardName = ({ isEdit, characterName, setCharacterName }: ICharacterCardName) => {
  const handleChangeName = (value: string) => {
    setCharacterName(value);
  };

  return (
    <>
      {isEdit ? (
        <Input
          size="medium"
          view="underlined"
          value={characterName}
          onChange={handleChangeName}
        />
      ) : (
        <Link
          className="characterCard__name"
          to={APP_ROUTES.CHARACTER_INFO}
        >
          {characterName}
        </Link>
      )}
    </>
  );
};
