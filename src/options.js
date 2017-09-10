import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { defaultTo, values, isEmpty } from 'ramda';

import options from './options/reducers';
import App from './options/components/App.jsx';
import { getOptions } from './chrome/local_storage';
import * as Providers from './providers';

const AllProviders = () : Array<Provider> => values(Providers);

getOptions(chrome, 'skiGoggles.enabledProviders').then((optionsFromLocal) => {
    let localOptions = defaultTo(optionsFromLocal, []);
    localOptions = isEmpty(localOptions) ? AllProviders() : localOptions;

    let store = createStore(options, {enabledProviders: localOptions});

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
});
