import { WebRequestPayload } from "../../types/Types";
import { Dispatch } from "react-redux";
import { setOptions } from '../../chrome/LocalStorage';
import { SendRuntimeMessage } from "../Helpers";

export const ADD_SNAPSHOT_ROW = "ADD_SNAPSHOT_ROW";
export const REMOVE_SNAPSHOT_ROW = "REMOVE_SNAPSHOT_ROW";
export const CLEAR_ALL_SNAPSHOTS = "CLEAR_ALL_SNAPSHOTS";
export const SYNC_SNAPSHOTS = "SYNC_SNAPSHOTS";

export type SnapshotAction = AddSnapshotRowAction | RemoveSnapshotRowAction | ClearAllSnapshotRowsAction | SyncSnapShotsAction;

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

export type  SyncSnapShotsAction = {
  type: string;
  rows: WebRequestPayload[]
};


type Action = (dispatch: Dispatch<any>) => void;

export const addSnapshotAction = (chromeId: string, wrp: WebRequestPayload): Action => {
  return (dispatch: Dispatch<any>): void => {
    SendRuntimeMessage(chromeId, "save-snapshot", wrp);
  }
};

export const removeSnapshot = (wrp: WebRequestPayload): RemoveSnapshotRowAction => {
  return { type: REMOVE_SNAPSHOT_ROW, row: wrp };
};

export const clearAllSnapshot = (): ClearAllSnapshotRowsAction => {
  return { type: CLEAR_ALL_SNAPSHOTS };
};

export const syncSnapshots = (wrps: WebRequestPayload[]): SyncSnapShotsAction => {
  return { type: SYNC_SNAPSHOTS, rows:  wrps};
};
