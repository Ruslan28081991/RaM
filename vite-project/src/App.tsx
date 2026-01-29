// import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/shared/components/layout';

import './App.css';
// import { CharacterInfo } from './pages/characterInfo';

function App() {
  return (
    <>
      {/* <Routes>
        <Route
          path="/"
          element={<Layout />}
        />
        <Route
          path="/characterInfo"
          element={<CharacterInfo />}
        />
      </Routes> */}
      <Layout />
    </>
  );
}

export default App;
