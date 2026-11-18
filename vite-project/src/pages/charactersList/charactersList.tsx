import { Link } from 'react-router-dom';

import { TitleImg } from '@/assets/images';
import { useCharacterList } from '@/hooks';
import { Container, InfinityScroll, Loading } from '@/shared/components';
import { CharacterCard, PanelFilters } from '@/widgets';

import './charactersList.css';

export const CharactersList = () => {
  const { characters, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useCharacterList();

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
        <PanelFilters />
        {isLoading && characters.length === 0 && (
          <Loading
            size="large"
            text="Loading characters..."
          />
        )}
        {!isLoading && !isError && characters.length === 0 && (
          <p className="charactersList__text-empty">Characters list is empty...</p>
        )}
        {isError && <p className="charactersList__text-error">Error loading data: {error?.message}</p>}

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
            isLoadingMore={isFetchingNextPage}
            isHasMore={hasNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </div>
    </Container>
  );
};
