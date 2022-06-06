import reducer from '../reducers';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const appCreateStore = () => (
    process.env.NODE_ENV !== 'production' ? createStore(reducer, composeWithDevTools(applyMiddleware(createLogger(), thunk, reporter))) : createStore(reducer, applyMiddleware(thunk))
);

export default appCreateStore;