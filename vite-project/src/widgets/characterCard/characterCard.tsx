import { useState } from 'react';

import toast from 'react-hot-toast';

import cn from 'classnames';

import { CloseIcon, ConfirmIcon, EditIcon } from '@/assets/icons';
import { type TStatus } from '@/shared/components';

import { CharacterCardLocation } from './characterCardLocation';
import { CharacterCardName } from './characterCardName';
import { CharacterCardStatus } from './characterCardStatus';

import './characterCard.css';

export interface ICharacterCard {
  id: number;
  image: string;
  name: string;
  gender: string;
  species: string;
  location: {
    name: string;
  };
  status: TStatus;
}

export const CharacterCard = ({ image, name, gender, species, location, status }: ICharacterCard) => {
  const [isEdit, setIsEdit] = useState(false);
  const [characterName, setCharacterName] = useState(name);
  const [characterLocation, setCharacterLocation] = useState(location.name);
  const [characterStatus, setCharacterStatus] = useState<TStatus>(status);

  const trimmedName = characterName.trim();
  const trimmerLocation = characterLocation.trim();

  const handleEditCard = () => {
    setIsEdit(true);
  };

  const handleEditSave = () => {
    if (!trimmedName || !trimmerLocation) return notify();

    setIsEdit(false);
  };

  const handleEditCancel = () => {
    if (!trimmedName || !trimmerLocation) return notify();
    setCharacterName(name);
    setCharacterLocation(location.name);
    setIsEdit(false);
  };

  const notify = () =>
    toast.error('Заполните поля', {
      duration: 2000,
      position: 'top-center',
    });

  return (
    <div
      className={cn('characterCard', {
        characterCard_edited: isEdit,
      })}
    >
      <img
        className="characterCard__image"
        src={image}
        alt={`Picture ${name}`}
      />

      <div className="characterCard__info">
        <div className="characterCard__wrapper">
          <CharacterCardName
            isEdit={isEdit}
            characterName={characterName}
            setCharacterName={setCharacterName}
          />
          <div className="characterCard__actions">
            {isEdit ? (
              <>
                <ConfirmIcon
                  aria-label="Confirm icon"
                  onClick={handleEditSave}
                />
                <CloseIcon
                  aria-label="Cancel icon"
                  onClick={handleEditCancel}
                />
              </>
            ) : (
              <EditIcon
                className="characterCard__edit"
                aria-label="Edit icon"
                onClick={handleEditCard}
              />
            )}
          </div>
        </div>

        <dl className="characterCard__list">
          <dt className="characterCard__item">Gender </dt>
          <dd className="characterCard__item-text">{gender}</dd>

          <dt className="characterCard__item">Species</dt>
          <dd className="characterCard__item-text">{species}</dd>

          <dt className="characterCard__item">Location </dt>
          <dd className="characterCard__item-text">
            <CharacterCardLocation
              isEdit={isEdit}
              characterLocation={characterLocation}
              setCharacterLocation={setCharacterLocation}
            />
          </dd>

          <dt className="characterCard__item">Status </dt>
          <dd className="characterCard__item-text">
            <CharacterCardStatus
              isEdit={isEdit}
              characterStatus={characterStatus}
              setCharacterStatus={setCharacterStatus}
            />
          </dd>
        </dl>
      </div>
    </div>
  );
};
