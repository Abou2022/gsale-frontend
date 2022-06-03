// to do import main style

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/app';
import appCreateStore from './lib/app-create-store.js';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);
let store = appCreateStore();

let AppContainer = () => {
    // to do: remove strict mode before presentation
    return (
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    );
};

root.render(<AppContainer />);
