import Title from '@/assets/images/title.png';
import { Loading } from '@/shared/components/loading';

import './charactersList.css';

export const CharactersList = () => {
  return (
    <section className="charactersList">
      <img
        className="charactersList__image"
        src={Title}
        alt="Title image"
      />

      <Loading
        size="large"
        text="Loading characters..."
      />
    </section>
  );
};
