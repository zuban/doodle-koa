import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import CreateDoodle from './doodleContainer/CreateDoodle';
import Doodle from './doodleContainer/Doodle';
import Total from './doodleContainer/Total';
import App from './doodleContainer/AppContainer.js';
import createStore from './redux/store';

// Router
ReactDOM.render((
    <Provider store={createStore()}>
        <Router history={browserHistory}>
            <Route name="Приложение для опросов" path="/" component={App}>
                <Route name="Опрос" path="/doodle/:id" component={Doodle} />
                <Route name="Рекомендуемое время проведения" path="/doodle/:id/total" component={Total} />
                <Route name="Создание опроса" path="*" component={CreateDoodle} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));
