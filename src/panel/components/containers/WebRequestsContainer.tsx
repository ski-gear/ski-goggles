import { connect, Dispatch } from "react-redux";

import { PanelState, WebRequestPayloadSnapshot } from "../../../types/Types";
import { AddSnapshotAction, RemoveSnapshotAction } from "../../actions/Snapshots";
import WebRequests from "../WebRequests";

const mapStateToProps = (state: PanelState) => {
  return {
    chromeId: state.metaData.chromeId,
    data: state.webRequests,
    snapshots: state.snapshots,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot): void => {
      AddSnapshotAction(chromeId, wrps)(dispatch);
    },
    removeSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot): void => {
      RemoveSnapshotAction(chromeId, wrps)(dispatch);
    },
  };
};

const WebRequestsContainer = connect(mapStateToProps, mapDispatchToProps)(WebRequests);

export default WebRequestsContainer;
