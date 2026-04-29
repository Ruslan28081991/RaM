import { Link, Navigate, useParams } from 'react-router-dom';

import { ArrowImg } from '@/assets/images';
import { useCharacterId } from '@/hooks';
import { Container, Loading } from '@/shared/components';

import './characterInfo.css';

export const CharacterInfo = () => {
  const { id } = useParams();
  const { character, isError } = useCharacterId(id!);

  if (isError) return <Navigate to="/404" />;

  return (
    <Container>
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
        {character !== null ? (
          <div className="characterInfo__content">
            <img
              className="characterInfo__image"
              src={character?.image}
              alt={`Image ${character?.name}`}
            />
            <h2 className="characterInfo__name">{character?.name}</h2>
            <span className="characterInfo__title">Information</span>
            <dl className="characterInfo__list">
              <dt className="characterInfo__item">Gender</dt>
              <dd className="characterInfo__item-text">{character?.gender}</dd>

              <dt className="characterInfo__item">Status</dt>
              <dd className="characterInfo__item-text">{character?.status}</dd>

              <dt className="characterInfo__item">Specie</dt>
              <dd className="characterInfo__item-text">{character?.species}</dd>

              <dt className="characterInfo__item">Origin</dt>
              <dd className="characterInfo__item-text">{character?.origin.name}</dd>

              <dt className="characterInfo__item">Type</dt>
              <dd className="characterInfo__item-text">{character?.type || 'Unknown'}</dd>

              <dt className="characterInfo__item">Location</dt>
              <dd className="characterInfo__item-text">{character?.location.name}</dd>
            </dl>
          </div>
        ) : (
          <Loading
            size="large"
            text="Loading character card..."
          />
        )}
      </section>
    </Container>
  );
};
