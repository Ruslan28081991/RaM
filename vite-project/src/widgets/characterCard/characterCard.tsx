import { useState } from 'react';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { CloseIcon, ConfirmIcon, EditIcon } from '@/assets/icons';
import { Input, Select, Status, type TStatus } from '@/shared/components';
import { APP_ROUTES, STATUS_OPTIONS } from '@/shared/constants';

import './characterCard.css';

interface ICharacterCard {
  image: string;
  name: string;
  gender: string;
  species: string;
  location: string;
  status: TStatus;
}

export const CharacterCard = ({ image, name, gender, species, location, status }: ICharacterCard) => {
  const [isEdit, setIsEdit] = useState(false);
  const [characterName, setCharacterName] = useState(name);
  const [characterLocation, setCharacterLocation] = useState(location);
  const [characterStatus, setCharacterStatus] = useState<TStatus>(status);

  const currentStatus = STATUS_OPTIONS.find((option) => option.value === characterStatus);
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
    setCharacterLocation(location);
    setIsEdit(false);
  };

  const handleChangeName = (value: string) => {
    setCharacterName(value);
  };

  const handleChangeLocation = (value: string) => {
    setCharacterLocation(value);
  };

  const handleChangeStatus = (value: TStatus) => {
    setCharacterStatus(value);
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
            {isEdit ? (
              <Input
                size="small"
                value={characterLocation}
                onChange={handleChangeLocation}
              />
            ) : (
              <span>{characterLocation}</span>
            )}
          </dd>

          <dt className="characterCard__item">Status </dt>
          <dd className="characterCard__item-text">
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
          </dd>
        </dl>
      </div>
    </div>
  );
};
