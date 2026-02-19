import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/shared/components';

import './layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
