import { defaultTo } from "ramda";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ThunkMiddleWare from "redux-thunk";

import { getOptions } from "./chrome/LocalStorage";
import App from "./panel/components/App";
import skiGoggles from "./panel/reducers/";
import { PanelState, SnapShotKey } from "./types/Types";

const key: SnapShotKey = "skiGogglesSnapshots";

getOptions(key).then(snapshots => {
  const localSnapshots = defaultTo([], snapshots);
  const state: PanelState = {
    webRequests: [],
    metaData: {
      chromeId: "",
    },
    snapshots: localSnapshots,
  };
  let store = createStore(skiGoggles, state, applyMiddleware(ThunkMiddleWare));

  ReactDOM.render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
    document.getElementById("root"),
  );
});
