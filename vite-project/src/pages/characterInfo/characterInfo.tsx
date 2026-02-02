import { Link } from 'react-router-dom';

import { ArrowImg } from '@/assets/images';
import { Loading } from '@/shared/components';

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
          src={ArrowImg}
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
