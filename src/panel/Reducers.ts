import { WebRequestPayload } from "../types/Types";

import { takeLast } from "ramda";
import { combineReducers } from "redux";
import { Action, AddWebRequestRowAction, ADD_WEB_REQUEST_ROW, CLEAR_ALL_WEB_REQUESTS } from "./Actions";

const MaxItems = 30

type State = WebRequestPayload[];

const webRequests = (state: State = [], action: Action): State => {
  switch (action.type) {
    case CLEAR_ALL_WEB_REQUESTS:
      return [];
    case ADD_WEB_REQUEST_ROW:
      const addAction = action as AddWebRequestRowAction;
      return takeLast(MaxItems, [...state, addAction.row]);
    default:
      return state;
  }
};

const skiGoggles = combineReducers({
  webRequests,
});

export default skiGoggles;
