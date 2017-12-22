import { WebRequestPayload } from "../types/Types";

import { combineReducers } from "redux";
import { Action, AddWebRequestRowAction, ADD_WEB_REQUEST_ROW, CLEAR_ALL_WEB_REQUESTS } from "./Actions";

type State = WebRequestPayload[];

const webRequests = (state: State = [], action: Action): State => {
  switch (action.type) {
    case CLEAR_ALL_WEB_REQUESTS:
      return [];
    case ADD_WEB_REQUEST_ROW:
      const addAction = action as AddWebRequestRowAction;
      return [...state, addAction.row];
    default:
      return state;
  }
};

const skiGoggles = combineReducers({
  webRequests,
});

export default skiGoggles;
