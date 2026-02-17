import type { ReactNode } from 'react';

import './container.css';

interface IContainer {
  children: ReactNode;
}

export const Container = ({ children }: IContainer) => {
  return <div className="container">{children}</div>;
};
