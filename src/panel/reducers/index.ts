import { combineReducers } from "redux";
import { webRequests } from './WebRequests'
import { snapshots } from './Snapshots'

const skiGoggles = combineReducers({
  webRequests,
  snapshots,
});

export default skiGoggles;
