import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';

function render() {

    ReactDOM.render(
        <App store={store.getState() } />, 
        document.getElementById('root')
    );
}

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if(module.hot) {
    module.hot.accept();
}
