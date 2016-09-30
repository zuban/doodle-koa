import React from 'react';
import CreateDoodle from './CreateDoodle';

/**
 * Application entry point
 */
const App = (props) => (
    <div className="page">
        {props.children || <CreateDoodle />}
    </div>
);

App.propTypes = {
    params: React.PropTypes.object,  // параметры урла (формирует react-router)
    children: React.PropTypes.object,
};

export default App;
