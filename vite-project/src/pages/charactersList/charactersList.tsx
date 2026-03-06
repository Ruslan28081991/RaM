import { useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { TitleImg } from '@/assets/images';
import { useCharacterList } from '@/hooks';
import { Container, Loading } from '@/shared/components';
import { CharacterCard, PanelFilters } from '@/widgets';

import './charactersList.css';

export const CharactersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(
    () => ({
      name: searchParams.get('name') || '',
      species: searchParams.get('species') || '',
      gender: searchParams.get('gender') || '',
      status: searchParams.get('status') || '',
    }),
    [searchParams]
  );
  const { characters, isLoading } = useCharacterList(filters);

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
          changeFilters={setSearchParams}
          searchParams={searchParams}
        />
        {isLoading && characters.length === 0 && (
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

        {isLoading && characters.length > 0 && <Loading size="small" />}
      </div>
    </Container>
  );
};
