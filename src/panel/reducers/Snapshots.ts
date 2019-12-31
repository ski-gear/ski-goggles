import { assoc, filter, prop, takeLast, uniqBy } from "ramda";
import { WebRequestPayload } from "../../types/Types";

import {
  SnapshotAction,
  SYNC_SNAPSHOTS,
  SyncSnapShotsAction,
} from "../actions/Snapshots";

const SnapshotsToKeep = 10;

export const snapshots = (state: WebRequestPayload[] = [], action: SnapshotAction): WebRequestPayload[] => {
  switch (action.type) {
    case SYNC_SNAPSHOTS:
      const syncAction = action as SyncSnapShotsAction;
      return syncAction.rows;
    default:
      return state;
  }
};
