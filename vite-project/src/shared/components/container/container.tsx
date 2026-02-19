import type { PropsWithChildren } from 'react';

import './container.css';

type TContainer = PropsWithChildren;

export const Container = ({ children }: TContainer) => {
  return <div className="container">{children}</div>;
};
