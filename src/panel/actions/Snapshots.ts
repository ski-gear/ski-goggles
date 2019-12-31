import { Dispatch } from "react-redux";
import { setOptions } from "../../chrome/LocalStorage";
import { ADD_SNAPSHOT, REMOVE_SNAPSHOT } from "../../Constants";
import { WebRequestPayload, WebRequestPayloadSnapshot } from "../../types/Types";
import { SendRuntimeMessage } from "../Helpers";

export const ADD_SNAPSHOT_ROW = "ADD_SNAPSHOT_ROW";
export const REMOVE_SNAPSHOT_ROW = "REMOVE_SNAPSHOT_ROW";
export const CLEAR_ALL_SNAPSHOTS = "CLEAR_ALL_SNAPSHOTS";
export const SYNC_SNAPSHOTS = "SYNC_SNAPSHOTS";

export type SnapshotAction = AddSnapshotRowAction | RemoveSnapshotRowAction | ClearAllSnapshotRowsAction | SyncSnapShotsAction;

export interface AddSnapshotRowAction {
  type: string;
  row: WebRequestPayload;
}

export interface RemoveSnapshotRowAction {
  type: string;
  row: WebRequestPayload;
}

export interface ClearAllSnapshotRowsAction {
  type: string;
}

export interface  SyncSnapShotsAction {
  type: string;
  rows: WebRequestPayload[];
}

type Action = (dispatch: Dispatch<any>) => void;

export const AddSnapshotAction = (chromeId: string, wrps: WebRequestPayloadSnapshot): Action => {
  return (dispatch: Dispatch<any>): void => {
    SendRuntimeMessage(chromeId, ADD_SNAPSHOT, wrps);
  };
};

export const RemoveSnapshotAction = (chromeId: string, wrps: WebRequestPayloadSnapshot): Action => {
  return (dispatch: Dispatch<any>): void => {
    SendRuntimeMessage(chromeId, REMOVE_SNAPSHOT, wrps);
  };
};

export const SyncSnapshots = (wrpss: WebRequestPayloadSnapshot[]): SyncSnapShotsAction => {
  return { type: SYNC_SNAPSHOTS, rows:  wrpss};
};

export const removeSnapshot = (wrps: WebRequestPayloadSnapshot): RemoveSnapshotRowAction => {
  return { type: REMOVE_SNAPSHOT_ROW, row: wrps };
};

export const clearAllSnapshot = (): ClearAllSnapshotRowsAction => {
  return { type: CLEAR_ALL_SNAPSHOTS };
};
