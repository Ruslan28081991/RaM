import { Select, Status, type TStatus } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';

interface ICharacterCardStatus {
  isEdit: boolean;
  characterStatus: TStatus;
  setCharacterStatus: (value: TStatus) => void;
}

export const CharacterCardStatus = ({ isEdit, characterStatus, setCharacterStatus }: ICharacterCardStatus) => {
  const currentStatus = STATUS_OPTIONS.find((option) => option.value === characterStatus);

  const handleChangeStatus = (value: TStatus) => {
    setCharacterStatus(value);
  };
  return (
    <>
      {isEdit ? (
        <Select<TStatus>
          options={STATUS_OPTIONS}
          size="small"
          value={characterStatus}
          onChange={handleChangeStatus}
          OptionComponent={({ option }) => (
            <>
              <span>{option.label}</span>
              <Status status={option?.value} />
            </>
          )}
        />
      ) : (
        <>
          <span>{currentStatus?.label}</span>
          <Status status={characterStatus} />
        </>
      )}
    </>
  );
};
