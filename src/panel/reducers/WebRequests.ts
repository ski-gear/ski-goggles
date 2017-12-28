import { WebRequestPayload } from "../../types/Types";

import { takeLast, uniqBy, prop, assoc } from "ramda";
import { combineReducers } from "redux";
import {
  WebRequestAction,
  AddWebRequestRowAction,
  ADD_WEB_REQUEST_ROW,
  CLEAR_ALL_WEB_REQUESTS,
} from "../actions/";
import { MaxRequestsDisplayed } from "../../Constants";

export const webRequests = (state: WebRequestPayload[] = [], action: WebRequestAction): WebRequestPayload[] => {
  switch (action.type) {
    case CLEAR_ALL_WEB_REQUESTS:
      return [];
    case ADD_WEB_REQUEST_ROW:
      const addAction = action as AddWebRequestRowAction;
      return addWebRequestRow(state, addAction.row);
    default:
      return state;
  }
};

const addWebRequestRow = (state: WebRequestPayload[], row: WebRequestPayload): WebRequestPayload[] => {
  const added = [...state, row];
  const uniq = uniqBy(prop("browserRequestId"), added) as WebRequestPayload[];

  return takeLast(MaxRequestsDisplayed, uniq);
};
