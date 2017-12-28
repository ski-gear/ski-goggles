import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider as ReduxProvider } from "react-redux";

import skiGoggles from "./panel/reducers/";
import App from "./panel/components/App";

let store = createStore(skiGoggles);

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById("root"),
);
