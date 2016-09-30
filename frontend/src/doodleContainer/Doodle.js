/* eslint-disable */
//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {connect} from 'react-redux';
/* eslint-enable */
import {browserHistory} from 'react-router';
import {getData, sendData, updateCheckbox, updateName, clearData} from '../redux/modules/doodle';
import {monthNames} from '../enum/months';

class Doodle extends Component {

    /**
     * Выполняет вывод в красивом виде даты
     * @return {String} - строка с датами
     * @param {Date} startDate в формате toISOString()
     * @param {Date} endDate в формате toISOString()
     */
    static getFormattedDate(startDate, endDate) {
        if (startDate === endDate) {
            let date = new Date(startDate);
            return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        } else {
            let stDate = new Date(startDate);
            let edDate = new Date(endDate);
            return `${stDate.getDate()} 
                    ${monthNames[stDate.getMonth()]} ${stDate.getFullYear()} - ${edDate.getDate()} 
                    ${monthNames[edDate.getMonth()]} ${edDate.getFullYear()}`;
        }
    }
    componentWillMount() {
        this.props.getData(this.props.params.id);
    }
    componentWillUnmount() {
        this.props.clearData();
    }

    /**
     * Функция строит чекбоксы в правильном виде.
     * @return {String} - строка с датами
     * @param {Number} quantity - кол-во чекбоксов
     */
    getCheckboxers(quantity) {
        let resp = [];
        for (let i = 0; i < quantity; i++) {
            if (i === 0) {
                resp.push(<div className="doodle-checkbox-first">
                    <input
                        name="p"
                        type="checkbox"
                        style={{marginTop: '0'}}
                        onChange={() => this.props.updateCheckbox(i)}
                    />
                </div>);
            } else {
                resp.push(<div className="doodle-checkbox">
                    <input
                        name="p"
                        type="checkbox"
                        style={{marginTop: '0'}}
                        onChange={() => this.props.updateCheckbox(i)}
                    />
                </div>);
            }
        }
        return resp;
    }

    /**
     * Переход на страницу результатов doodle
     * @redirect
     */
    total() {
        browserHistory.push(`/doodle/${this.props.params.id}/total`);
    }

    render() {
        const {startDate, endDate, quantity, fetching, intervals, users} = this.props.doodle;
        return (<div>
                {
                    fetching ? <div>Загрузка...</div> :
                        <div className="doodle-container">
                            <div className="doodle-line">
                                <div className="doodle-date">
                                    {Doodle.getFormattedDate(startDate, endDate)}
                                </div>
                            </div>
                            <div className="doodle-line">
                                <div className="doodle-items-line-wrapper">
                                    {
                                        intervals.map((item, i) => {
                                            if (i === 0) {
                                                return (
                                                    <div className="doodle-time-first">
                                                        {item}
                                                    </div>);
                                            } else {
                                                return (
                                                    <div className="doodle-time">
                                                        {item}
                                                    </div>);
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            {
                                users.map(user => {
                                    return (<div className="doodle-line">
                                        <div className="doodle-user-wrapper">
                                            <div className="doodle-user-offset">
                                            </div>
                                            <div className="doodle-user">
                                                {user.name}
                                            </div>
                                        </div>
                                        <div className="doodle-items-line-wrapper">
                                            {
                                                user.times.map((time, i) => {
                                                    if (i === 0) {
                                                        if (time) {
                                                            return (<div className="doodle-box-green-first">
                                                                <div className="doodle-checked">
                                                                </div>
                                                            </div>);
                                                        } else {
                                                            return (<div className="doodle-box-red-first"></div>);
                                                        }
                                                    } else {
                                                        if (time) {
                                                            return (<div className="doodle-box-green">
                                                                <div className="doodle-checked">
                                                                </div>
                                                            </div>);
                                                        } else {
                                                            return (<div className="doodle-box-red"></div>);
                                                        }
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>);
                                })
                            }
                            <div className="doodle-line">
                                <div className="doodle-user-wrapper">
                                    <div className="doodle-input-offset">
                                    </div>
                                    <div className="doodle-input">
                                        <input
                                            className="form-control"
                                            name="name"
                                            placeholder="Ваше имя"
                                            type="text"
                                            onChange={(e) => this.props.updateName(e.target.value)}
                                            style={{
                                                width: '70px',
                                                display: 'inherit',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="doodle-items-line-wrapper">
                                    {
                                        this.getCheckboxers(quantity)
                                    }
                                </div>
                            </div>
                            <input
                                type="button"
                                value="Далее"
                                onClick={() => this.props.sendData()}
                            />
                            <input
                                type="button"
                                value="Посмотреть детализацию"
                                onClick={() => this.total()}
                            />
                        </div>
                }
        </div>
        );
    }
}

Doodle.propTypes = {
    doodle: React.PropTypes.object,
    getData: React.PropTypes.func,
    sendData: React.PropTypes.func,
    updateCheckbox: React.PropTypes.func,
    updateName: React.PropTypes.func,
    clearData: React.PropTypes.func,
    params: React.PropTypes.object,
};

export default connect(
    state => ({
        doodle: state.doodle,
    }),
    {
        getData,
        sendData,
        updateCheckbox,
        updateName,
        clearData,
    }
)(Doodle);
