import cn from 'classnames';

import { LoadingImg } from '@/assets/images';

import './loading.css';

interface ILoading {
  size: 'small' | 'large';
  text?: string;
}

export const Loading = ({ size = 'small', text }: ILoading) => {
  return (
    <div className="loading">
      <img
        className={cn('loading__image', {
          loading__image_large: size === 'large',
          loading__image_small: size === 'small',
        })}
        src={LoadingImg}
        alt="Loading image"
      />
      <p className="loading__text">{text}</p>
    </div>
  );
};
