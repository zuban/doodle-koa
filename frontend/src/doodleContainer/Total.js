/* eslint-disable */
//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {connect} from 'react-redux';
/* eslint-enable */
import {getData, clearData} from '../redux/modules/doodle';

class Total extends Component {
    componentWillMount() {
        this.props.getData(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    /**
     * Вывод
     * @return {String}
     * @param {Array} intervals - массив всех промежутков
     * @param {Array} users - массив всех введенных юзерами удобных промежутков
     */
    getTotal(intervals, users) {
        if (!users.length) {
            return 'Данных для детализации недостаточно';
        } else {
            let counter = {};

            for (let c = 0; c < users[0].times.length; c++) {
                counter[c] = 0;
            }
            for (let i = 0; i < users.length; i++) {
                for (let j = 0; j < users[i].times.length; j++) {
                    if (users[i].times[j]) {
                        counter[j] += 1;
                    }
                }
            }
            let indexes = [];
            let maxValue = 0;

            Object.keys(counter).forEach((item) => {
                if (counter[item] === maxValue) {
                    indexes.push(item);
                } else if (counter[item] > maxValue) {
                    indexes = [];
                    indexes.push(item);
                    maxValue = counter[item];
                }
            });
            if (indexes.length) {
                let returnString = 'Оптимальное время: ';
                indexes.forEach(indx => {
                    returnString += `${intervals[indx]}, `;
                });
                return returnString;
            } else {
                return 'Нет оптимального времени';
            }
        }
    }

    render() {
        const {fetching, intervals, users} = this.props.doodle;
        return (
            <div>
                {
                    fetching ? <div>Загрузка...</div> :
                        <div className="doodle-container">
                            {
                                this.getTotal(intervals, users)
                            }
                        </div>
                }
            </div>
        );
    }
}

Total.propTypes = {
    getData: React.PropTypes.func,
    clearData: React.PropTypes.func,
    doodle: React.PropTypes.object,
    params: React.PropTypes.object,
};

export default connect(
    state => ({
        doodle: state.doodle,
    }),
    {
        getData,
        clearData,
    }
)(Total);
