import { Input } from '@/shared/components';

interface ICharacterCardLocation {
  isEdit: boolean;
  characterLocation: string;
  setCharacterLocation: (value: string) => void;
}

export const CharacterCardLocation = ({ isEdit, characterLocation, setCharacterLocation }: ICharacterCardLocation) => {
  const handleChangeLocation = (value: string) => {
    setCharacterLocation(value);
  };

  return (
    <>
      {isEdit ? (
        <Input
          size="small"
          value={characterLocation}
          onChange={handleChangeLocation}
        />
      ) : (
        <span>{characterLocation}</span>
      )}
    </>
  );
};
