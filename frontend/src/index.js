import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {applyMiddleware, combineReducers, createStore} from "redux";
import team from './reducers/team'
import worlds from "./reducers/worlds";
import characters from "./reducers/characters"

const loggerMiddleware = createLogger();
const store = createStore(combineReducers({team, worlds, characters}),
    {},
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
