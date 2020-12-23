import {combineReducers} from 'redux';
import search from './search';
import app from './app';

const rootReducer = combineReducers({
    search,
    app
});

export default rootReducer;
