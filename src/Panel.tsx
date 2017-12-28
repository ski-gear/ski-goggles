import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import ThunkMiddleWare from 'redux-thunk';

import skiGoggles from "./panel/reducers/";
import App from "./panel/components/App";

let store = createStore(
  skiGoggles,
  {},
  applyMiddleware(ThunkMiddleWare)
);

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root"),
);
