import { Link } from 'react-router-dom';

import Back from '@/assets/images/arrow.png';
import { Loading } from '@/shared/components/loading';

import './characterInfo.css';

export const CharacterInfo = () => {
  return (
    <>
      <Link
        className="characterInfo__link"
        to="/"
      >
        <img
          className="characterInfo__link-image"
          src={Back}
          alt="Back image"
        />
        GO BACK
      </Link>
      <section className="characterInfo">
        <Loading
          size="large"
          text="Loading character card..."
        />
      </section>
    </>
  );
};
