import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// All these axios imports actually all share the same config.
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-type'] = 'application/json';

// This will be then shared not only in this file but across all files in your project
// So it will affect all requests sent from anywhere in your App
// That interceoptor take a function as an input which receives the config or the request
axios.interceptors.request.use(request => {
    console.log(request);
    // In your interceoptor func here, you need to always return the request or the request config
    // Otherwise you're bloking the request
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
