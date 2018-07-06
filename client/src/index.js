import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { App } from './App/App';
import {store} from './store/index';
import registerServiceWorker from './registerServiceWorker';

render(
<Provider store = {store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
