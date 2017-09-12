// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { defaultTo } from 'ramda';

import { options } from './options/reducers';
import App from './options/components/App.jsx';
import { getOptions, setOptions } from './chrome/local_storage';

const key = 'skiGoggleOptions';

getOptions(chrome, key).then((optionsFromLocal) => {
    const localOptions = defaultTo(optionsFromLocal, undefined);
    const store = createStore(options, localOptions);

    store.subscribe(() => {
        setOptions(chrome, key, store.getState()).then((_e) => {});
    });

    ReactDOM.render(
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>,
        document.getElementById('root')
    );
});
