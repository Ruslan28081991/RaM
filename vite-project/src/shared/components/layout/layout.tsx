import { Routes, Route } from 'react-router-dom';

import { CharacterInfo } from '@/pages/characterInfo';
import { CharactersList } from '@/pages/charactersList';

import { Footer } from '../footer';
import { Header } from '../header';

import './layout.css';

export const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<CharactersList />}
        />
        <Route
          path="characterInfo"
          element={<CharacterInfo />}
        />
      </Routes>
      <Footer />
    </>
  );
};
