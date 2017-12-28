import { WebRequestPayload } from "../../types/Types";

export type AddWebRequestRowAction = {
  type: string;
  row: WebRequestPayload;
};

export type ClearAllWebRequestRowsAction = {
  type: string;
};

export type WebRequestAction = AddWebRequestRowAction | ClearAllWebRequestRowsAction;

export const ADD_WEB_REQUEST_ROW = "ADD_WEB_REQUEST_ROW";
export const CLEAR_ALL_WEB_REQUESTS = "CLEAR_ALL_WEB_REQUESTS";

export const addWebRequestRowAction = (webRequest: WebRequestPayload): AddWebRequestRowAction => {
  return { type: ADD_WEB_REQUEST_ROW, row: webRequest };
};

export const clearAllWebRequests = (): ClearAllWebRequestRowsAction => {
  return { type: CLEAR_ALL_WEB_REQUESTS };
};


// Snapshots

export const ADD_SNAPSHOT_ROW = "ADD_SNAPSHOT_ROW";
export const REMOVE_SNAPSHOT_ROW = "REMOVE_SNAPSHOT_ROW";
export const CLEAR_ALL_SNAPSHOTS = "CLEAR_ALL_SNAPSHOTS";

export type SnapshotAction = AddSnapshotRowAction | RemoveSnapshotRowAction | ClearAllSnapshotRowsAction;

export type AddSnapshotRowAction = {
  type: string;
  row: WebRequestPayload;
};

export type RemoveSnapshotRowAction = {
  type: string;
  row: WebRequestPayload;
};

export type ClearAllSnapshotRowsAction = {
  type: string;
};

export const addSnapshotRowAction = (webRequest: WebRequestPayload): SnapshotAction => {
  return { type: ADD_SNAPSHOT_ROW, row: webRequest };
};

export const removeSnapshotRowAction = (webRequest: WebRequestPayload): SnapshotAction => {
  return { type: REMOVE_SNAPSHOT_ROW, row: webRequest };
};

export const clearAllSnapshot = (): SnapshotAction => {
  return { type: CLEAR_ALL_SNAPSHOTS };
};
