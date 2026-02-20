import { TitleImg } from '@/assets/images';
import { UseCharacter } from '@/hooks';
import { Container, Loading } from '@/shared/components';
import { CharacterCard, PanelFilters } from '@/widgets';

import './charactersList.css';

export const CharactersList = () => {
  const { characters } = UseCharacter();

  return (
    <Container>
      <div className="charactersList">
        <img
          className="charactersList__image"
          src={TitleImg}
          alt="Title 'Rick & Morty'"
        />

        <PanelFilters />

        {characters.length === 0 ? (
          <Loading
            size="large"
            text="Loading characters..."
          />
        ) : (
          <ul className="characterList__container">
            {characters.map((character) => (
              <li
                className="characterList__item"
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
