import { combineReducers } from "redux";
import { metaData } from "./MetaData";
import { snapshots } from "./Snapshots";
import { webRequests } from "./WebRequests";

const skiGoggles = combineReducers({
  webRequests,
  snapshots,
  metaData,
});

export default skiGoggles;
