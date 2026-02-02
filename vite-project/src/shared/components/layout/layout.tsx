import { Footer, Header } from '@/shared/components';

import './layout.css';

interface ILayout {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
