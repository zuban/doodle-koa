import React from 'react';
import {DateField} from 'react-date-picker';

const DatePicker = ({...props}) => {
    let {onChange} = props;
    return (
        <DateField
            {...props}
            onChange={(value) => onChange(+new Date(value.split('-')))}
            dateFormat="YYYY-MM-DD"
            defaultValue={+new Date()}
            forceValidDate={true}
            updateOnDateClick={true}
            collapseOnDateClick={true}
            expandOnFocus={true}
        />
    );
};

DatePicker.propTypes = {
    onChange: React.PropTypes.func,
};

export default DatePicker;
