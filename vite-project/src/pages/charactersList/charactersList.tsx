import { useState } from 'react';

import { TitleImg } from '@/assets/images';
import { useCharacter } from '@/hooks';
import { Container, Loading } from '@/shared/components';
import type { IFilters } from '@/shared/types/interfaces';
import { CharacterCard, PanelFilters } from '@/widgets';

import './charactersList.css';

export const CharactersList = () => {
  const [filters, setFilters] = useState<IFilters>({
    name: '',
    species: '',
    gender: '',
    status: '',
  });
  const { characters, isLoading } = useCharacter(filters);

  return (
    <Container>
      <div className="charactersList">
        <img
          className="charactersList__image"
          src={TitleImg}
          alt="Title 'Rick & Morty'"
        />
        <PanelFilters
          filters={filters}
          setFilters={setFilters}
        />
        {isLoading && (
          <Loading
            size="large"
            text="Loading characters..."
          />
        )}
        {!isLoading && characters.length === 0 && (
          <p className="charactersList__text-empty">Characters list is empty...</p>
        )}

        {characters.length > 0 && (
          <ul className="charactersList__container">
            {characters.map((character) => (
              <li
                className="charactersList__item"
                key={character.id}
              >
                <CharacterCard
                  id={character.id}
                  image={character.image}
                  name={character.name}
                  gender={character.gender}
                  species={character.species}
                  location={character.location}
                  status={character.status}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};
