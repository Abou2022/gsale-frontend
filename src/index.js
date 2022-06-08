// to do import main style
// import './style/.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';
import appCreateStore from './lib/app-create-store.js';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

let AppContainer = () => {
  // to do: remove strict mode before presentation
  return (
    <React.StrictMode>
      <Provider store={appCreateStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<AppContainer />);
