import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import loggerMiddleware from './middleware/loggerMiddleware';

const middlewareEnhancer = applyMiddleware(loggerMiddleware);

// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(rootReducer, middlewareEnhancer);

export default store