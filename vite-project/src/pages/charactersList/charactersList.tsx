import { TitleImg } from '@/assets/images';
import { Loading } from '@/shared/components';

import './charactersList.css';

export const CharactersList = () => {
  return (
    <main className="charactersList">
      <img
        className="charactersList__image"
        src={TitleImg}
        alt="Title 'Rick & Morty'"
      />

      <Loading
        size="large"
        text="Loading characters..."
      />
    </main>
  );
};
