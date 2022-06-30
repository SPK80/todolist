import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store';
import {Provider} from 'react-redux';
import {AppWithRedux} from "./AppWithRedux";
// import {AppWithReducer} from "./AppWithReducer";

// ReactDOM.render(<AppWithReducer/>, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>, document.getElementById('root'));