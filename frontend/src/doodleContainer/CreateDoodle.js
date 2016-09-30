/* eslint-disable */
//noinspection JSUnresolvedVariable
import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {connect} from 'react-redux';
/* eslint-enable */
import {setBeginDate, setEndDate, setQuantity, saveDoodle, clearDoodle} from '../redux/modules/createDoodle';
import DatePicker from './DatePicker';
import {browserHistory} from 'react-router';

/**
 * Создание doole
 */
class CreateDoodle extends Component {
    componentWillUnmount() {
        this.props.clearDoodle();
    }

    /**
     * Переход на новую страницу doodle
     * @redirect
     */
    saveDoodle() {
        this.props.saveDoodle().then(res => {
            browserHistory.push(`/doodle/${res}`);
        });
    }

    render() {
        const {fetching, error} = this.props.doodle;
        return (
            <div className="container">
                <div className="form-create-doodle">
                    {error ? <h3>{error}</h3> : null}
                    <div className="entry">
                        <span><label className="label-date">Дата начала</label></span>
                        <span>
                            <DatePicker
                                onChange={(date) => this.props.setBeginDate(new Date(date).toISOString())}
                            />
                        </span>
                    </div>
                    <div className="entry">
                        <span><label className="label-date">Дата окончания</label></span>
                        <span>
                            <DatePicker
                                onChange={(date) => this.props.setEndDate(new Date(date).toISOString())}
                            />
                        </span>
                    </div>
                    <div className="entry">
                        <span><label className="label-number-quantity">Колличество лотов в день</label></span>
                        <span><input
                            type="number"
                            name="quantity"
                            min="3"
                            max="24"
                            defaultValue="3"
                            onChange={(e) => this.props.setQuantity(e.target.value)}
                        /></span>
                    </div>
                    <div className="entry">
                        <span>
                            <button
                                disabled={(fetching || error)}
                                onClick={() => this.saveDoodle()}
                            >
                                {fetching ? 'Сохранение...' : 'Сохранить'}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

CreateDoodle.propTypes = {
    doodle: React.PropTypes.object,
    setBeginDate: React.PropTypes.func,
    setEndDate: React.PropTypes.func,
    setQuantity: React.PropTypes.func,
    saveDoodle: React.PropTypes.func,
    clearDoodle: React.PropTypes.func,
};

export default connect(
    state => ({
        doodle: state.createDoodle,
    }),
    {
        setBeginDate,
        setEndDate,
        setQuantity,
        saveDoodle,
        clearDoodle,
    }
)(CreateDoodle);
