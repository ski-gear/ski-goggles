import { defaultTo } from "ramda";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";

import { getOptions, setOptions } from "./chrome/LocalStorage";
import App from "./options/components/App";
import { options } from "./options/reducers";
import { UserOptionsKey } from "./types/Types";

const key: UserOptionsKey = "skiGogglesOptions";

getOptions(key, true).then(optionsFromLocal => {
  const localOptions = defaultTo(optionsFromLocal, undefined);
  const store = createStore(options, localOptions);

  store.subscribe(() => {
    const state = store.getState();
    if (state) {
      setOptions(key, state, true).then(e => {});
    }
  });

  ReactDOM.render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
    document.getElementById("root"),
  );
});
