import { Link } from 'react-router-dom';

import { NotFoundImg } from '@/assets/images';

import './errorPage.css';

export const ErrorPage = () => {
  return (
    <div className="errorPage">
      <img
        className="errorPage__image"
        src={NotFoundImg}
        alt="Error image"
      />
      <Link
        className="errorPage__btn"
        to="/"
      >
        Go to main page
      </Link>
    </div>
  );
};
