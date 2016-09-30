// Action constant
import DoodleService from '../../services/Doodle';
export const GET_DATA_REQUEST = 'doodle/GET_DATA_REQUEST';
export const GET_DATA_SUCCESS = 'doodle/GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'doodle/GET_DATA_FAIL';

export const SAVE_DATA_REQUEST = 'doodle/SAVE_DATA_REQUEST';
export const SAVE_DATA_SUCCESS = 'doodle/SAVE_DATA_SUCCESS';
export const SAVE_DATA_FAIL = 'doodle/SAVE_DATA_FAIL';

export const UPDATE_CHECKBOX = 'doodle/UPDATE_CHECKBOX';
export const UPDATE_NAME = 'doodle/UPDATE_NAME';
export const CLEAR_DATA = 'doodle/CLEAR_DATA';


let service = new DoodleService();
const initialState = {
    fetching: true,
    intervals: [],
    id: null,
    startDate: null,
    endDate: null,
    quantity: null,
    users: [],
    newName: 'Unknown',
    newTimes: [],
};

export function getData(id) {
    return (dispatch) => {
        dispatch({
            type: GET_DATA_REQUEST,
        });
        let promise = service.get(`api/${id}`);
        return promise.then(
            (res) => {
                dispatch({
                    type: GET_DATA_SUCCESS,
                    data: res,
                });
            },
            (err) => {
                if (err) {
                    dispatch({type: GET_DATA_FAIL});
                }
            });
    };
}

export const updateCheckbox = (id) => ({
    type: UPDATE_CHECKBOX,
    id,
});
export const updateName = (name) => ({
    type: UPDATE_NAME,
    name,
});
export const clearData = () => ({
    type: CLEAR_DATA,
});

export function sendData() {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_DATA_REQUEST,
        });
        let state = getState().doodle;
        let promise = service.post(`api/${state.id}`, {
            name: state.newName,
            times: state.newTimes,
        });
        return promise.then(
            (res) => {
                dispatch({
                    type: SAVE_DATA_SUCCESS,
                    data: JSON.parse(res),
                });
            },
            (err) => {
                if (err) {
                    dispatch({type: SAVE_DATA_FAIL});
                }
            });
    };
}

// Reducer
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case GET_DATA_REQUEST: {
            return {
                ...state,
                fetching: true,
                data: null,
            };
        }
        case GET_DATA_SUCCESS: {
            let times = [];
            for (let i = 0; i < action.data.quantity; i++) {
                times.push(false);
            }
            return {
                ...state,
                fetching: false,
                intervals: action.data.intervals,
                startDate: action.data.startDate,
                endDate: action.data.endDate,
                id: action.data.id,
                quantity: action.data.quantity,
                users: action.data.users,
                newName: 'Unknown',
                newTimes: times,
            };
        }
        case GET_DATA_FAIL: {
            return {
                ...state,
                fetching: false,
            };
        }
        case CLEAR_DATA: {
            return {
                ...state,
                fetching: true,
                intervals: [],
                id: null,
                startDate: null,
                endDate: null,
                quantity: null,
                users: [],
                newName: 'Unknown',
                newTimes: [],
            };
        }
        case UPDATE_CHECKBOX: {
            let checkboxes = state.newTimes;
            checkboxes[action.id] = !checkboxes[action.id];
            return {
                ...state,
                newTimes: checkboxes,

            };
        }
        case UPDATE_NAME: {
            return {
                ...state,
                newName: action.name,
            };
        }
        case SAVE_DATA_REQUEST: {
            return {
                ...state,
                fetching: true,
            };
        }
        case SAVE_DATA_SUCCESS: {
            let times = [];
            for (let i = 0; i < action.data.quantity; i++) {
                times.push(false);
            }
            return {
                ...state,
                fetching: false,
                users: action.data.users,
                newName: 'Unknown',
                newTimes: times,
            };
        }
        case SAVE_DATA_FAIL: {
            return {
                ...state,
                fetching: false,
            };
        }
        default:
            return state;
    }
}
