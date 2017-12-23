import { WebRequestPayload } from "../types/Types";

import { takeLast, uniqBy, prop } from "ramda";
import { combineReducers } from "redux";
import { Action, AddWebRequestRowAction, ADD_WEB_REQUEST_ROW, CLEAR_ALL_WEB_REQUESTS } from "./Actions";
import { MaxRequestsDisplayed } from "../Constants";

type State = WebRequestPayload[];

const webRequests = (state: State = [], action: Action): State => {
  switch (action.type) {
    case CLEAR_ALL_WEB_REQUESTS:
      return [];
    case ADD_WEB_REQUEST_ROW:
      const addAction = action as AddWebRequestRowAction;
      return addRow(state, addAction.row);
    default:
      return state;
  }
};

const skiGoggles = combineReducers({
  webRequests,
});

const addRow = (state: State, row: WebRequestPayload): State => {
  const added = [...state, row];
  const uniq = uniqBy(
    prop('browserRequestId'),
    added
  ) as WebRequestPayload[]

  return takeLast(MaxRequestsDisplayed, uniq);
}

export default skiGoggles;
