import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './modules/reducer';

const logger = createLogger({
    predicate: () => true,
});

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function (initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
