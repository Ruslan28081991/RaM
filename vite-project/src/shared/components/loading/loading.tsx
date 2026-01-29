import cn from 'classnames';

import LoadingImg from '@/assets/images/loading.png';

import './loading.css';

interface ILoading {
  size: 'small' | 'large';
  text?: string;
}

export const Loading = ({ size = 'small', text }: ILoading) => {
  return (
    <div className="loading">
      <img
        className={cn('loading__image', `loading__image_${size}`)}
        src={LoadingImg}
        alt="Loading image"
      />
      <p className="loading__text">{text}</p>
    </div>
  );
};
