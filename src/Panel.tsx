import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import ThunkMiddleWare from 'redux-thunk';
import { values, map, contains, defaultTo } from "ramda";

import skiGoggles from "./panel/reducers/";
import App from "./panel/components/App";
import { getOptions } from './chrome/LocalStorage';
import { SnapShotKey, PanelState } from './types/Types'

const key: SnapShotKey = 'skiGogglesSnapshots';

getOptions(key).then((snapshots) => {
    const localSnapshots = defaultTo([], snapshots);
    const state: PanelState = {
      webRequests: [],
      metaData: {
        chromeId: ''
      },
      snapshots: localSnapshots
    }
    let store = createStore(skiGoggles, state, applyMiddleware(ThunkMiddleWare));

    ReactDOM.render(
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>,
        document.getElementById('root')
    );
});
