import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import * as serviceWorker from './serviceWorker';
// import {AppWithRedux} from "./AppWithRedux";
//
//
// ReactDOM.render(<AppWithRedux/>, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import {store} from './store';
import {Provider} from 'react-redux';
import {AppWithRedux} from "./AppWithRedux";
import ReactDOM from 'react-dom';

ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));