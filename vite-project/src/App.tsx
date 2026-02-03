import { Route, Routes } from 'react-router-dom';

import { CharacterInfo, CharactersList } from '@/pages';
import { Layout } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants';

import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path={APP_ROUTES.HOME}
        element={
          <Layout>
            <CharactersList />
          </Layout>
        }
      />
      <Route
        path={APP_ROUTES.CHARACTER_INFO}
        element={
          <Layout>
            <CharacterInfo />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
