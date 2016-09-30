import {expect} from 'chai';
import extend from 'extend';
import reducer, * as cardAction from '../createDoodle';

describe('Redux doodle module', () => {
    describe('Card reducer', () => {
        let initialState = reducer();
        let state = reducer(initialState, {});
        it('CHANGE_BEGINNING_DATE', () => {

            let date = new Date(2011, 0, 1, 2, 3, 4, 567);
            let prevState = extend(true, {}, state);
            let nextState = reducer(state, {
                type: cardAction.CHANGE_BEGINNING_DATE,
                date
            });
            expect(nextState).to.have.property('error')
            expect(nextState.error).not.to.equal('Дата окончания меньше даты конца');
        });
        it('CHANGE_END_DATE', () => {

            let date = new Date(2010, 0, 1, 2, 3, 4, 567);
            let prevState = extend(true, {}, state);
            let nextState = reducer(state, {
                type: cardAction.CHANGE_END_DATE,
                date
            });
            expect(nextState).to.have.property('error')
            expect(nextState.error).to.equal('Дата окончания меньше даты конца');
        });
    });
});
