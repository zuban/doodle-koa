import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import createDoodle from './createDoodle';
import doodle from './doodle';

export default combineReducers({
    form,
    createDoodle,
    doodle,
});
