// Action constant

import DoodleService from '../../services/Doodle';
export const CHANGE_BEGINNING_DATE = 'createDoodle/CHANGE_BEGINNING_DATE';
export const CHANGE_END_DATE = 'createDoodle/CHANGE_END_DATE';
export const CHANGE_QUANTITY = 'createDoodle/CHANGE_QUANTITY';
export const CLEAR_DOODLE = 'createDoodle/CLEAR_DOODLE';

export const SAVE_DOODLE_REQUEST = 'createDoodle/SAVE_DOODLE_REQUEST';
export const SAVE_DOODLE_SUCCESS = 'createDoodle/SAVE_DOODLE_SUCCESS';
export const SAVE_DOODLE_FAIL = 'createDoodle/SAVE_DOODLE_FAIL';

let service = new DoodleService();
const initialState = {
    beginDate: new Date(),
    endDate: new Date(),
    quantity: 3,
    fetching: false,
    error: null,
};
export const setBeginDate = (date) => ({
    type: CHANGE_BEGINNING_DATE,
    date,
});
export const clearDoodle = () => ({
    type: CLEAR_DOODLE,
});
export const setEndDate = (date) => ({
    type: CHANGE_END_DATE,
    date,
});
export const setQuantity = (quantity) => ({
    type: CHANGE_QUANTITY,
    quantity,
});

export function saveDoodle() {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_DOODLE_REQUEST,
        });
        let body = getState().createDoodle;
        let promise = service.post('api/create', {
            startDate: body.beginDate,
            endDate: body.endDate,
            quantity: body.quantity,
        });
        return promise.then(
            (res) => {
                dispatch({type: SAVE_DOODLE_SUCCESS});
                return res;
            },
            (err) => {
                if (err) {
                    dispatch({type: SAVE_DOODLE_FAIL});
                }
            });
    };
}

// Reducer
export default function (state = initialState, action = {}) {
    switch (action.type) {
        case SAVE_DOODLE_REQUEST: {
            return {
                ...state,
                fetching: true,
            };
        }
        case SAVE_DOODLE_SUCCESS: {
            return {
                ...state,
                fetching: false,
            };
        }
        case SAVE_DOODLE_FAIL: {
            return {
                ...state,
                fetching: false,
            };
        }
        case CHANGE_BEGINNING_DATE: {
            {
                let error = null;
                if (action.date > state.endDate) {
                    error = 'Дата окончания меньше даты конца';
                }
                return {
                    ...state,
                    beginDate: action.date,
                    error,
                };
            }
        }
        case CHANGE_END_DATE: {
            let error = null;
            if (state.beginDate > action.date) {
                error = 'Дата окончания меньше даты конца';
            }
            return {
                ...state,
                endDate: action.date,
                error,
            };
        }
        case CHANGE_QUANTITY:
            return {
                ...state,
                quantity: action.quantity,
            };
        case CLEAR_DOODLE:
            return {
                ...state,
                quantity: 3,
                endDate: new Date(),
                beginDate: new Date(),
                fetching: false,
                error: null,
            };
        default:
            return state;
    }
}
