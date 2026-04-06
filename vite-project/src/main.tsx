import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { HashRouter } from 'react-router-dom';

import App from './App.tsx';

import 'normalize.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter basename="/RaM"> */}
    <HashRouter>
      <App />
      <Toaster position="bottom-right" />
    </HashRouter>
    {/* </BrowserRouter> */}
  </StrictMode>
);
