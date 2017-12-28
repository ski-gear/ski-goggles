import { combineReducers } from "redux";
import { webRequests } from './WebRequests'
import { snapshots } from './Snapshots'
import { metaData } from './MetaData'

const skiGoggles = combineReducers({
  webRequests,
  snapshots,
  metaData
});

export default skiGoggles;
