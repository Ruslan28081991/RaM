import { Route, Routes } from 'react-router-dom';

import { CharacterInfo, CharactersList } from '@/pages';
import { Layout } from '@/shared/components';
import { APP_ROUTES } from '@/shared/constants';

import ErrorBoundary from './shared/components/errorBoundary/errorBoudary';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route
          path={APP_ROUTES.HOME}
          element={<Layout />}
        >
          <Route
            index
            element={<CharactersList />}
          />
          <Route
            path={APP_ROUTES.CHARACTER_INFO}
            element={<CharacterInfo />}
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
