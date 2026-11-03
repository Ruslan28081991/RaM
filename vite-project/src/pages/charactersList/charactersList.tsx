import { useMemo } from 'react';

import { Link } from 'react-router-dom';

import { TitleImg } from '@/assets/images';
import { useCharacterList } from '@/hooks';
import { Container, InfinityScroll, Loading } from '@/shared/components';
import { filtersStore } from '@/stores/store';
import { CharacterCard, PanelFilters } from '@/widgets';

import './charactersList.css';

export const CharactersList = () => {
  const filtersName = filtersStore((state) => state.filters.name);
  const filtersGender = filtersStore((state) => state.filters.gender);
  const filtersSpecies = filtersStore((state) => state.filters.species);
  const filtersStatus = filtersStore((state) => state.filters.status);

  const filters = useMemo(
    () => ({
      name: filtersName || '',
      species: filtersSpecies || '',
      gender: filtersGender || '',
      status: filtersStatus || '',
    }),

    [filtersName, filtersSpecies, filtersGender, filtersStatus]
  );

  const { characters, isLoading, hasMore, handleNextPage } = useCharacterList(filters);

  return (
    <Container>
      <div className="charactersList">
        <Link to="/">
          <img
            className="charactersList__image"
            src={TitleImg}
            alt="Title 'Rick & Morty'"
          />
        </Link>
        <PanelFilters filters={filters} />
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
        {characters.length > 0 && (
          <InfinityScroll
            loader={<Loading size="small" />}
            isLoadingMore={isLoading}
            isHasMore={hasMore}
            onLoadMore={handleNextPage}
          />
        )}
      </div>
    </Container>
  );
};
