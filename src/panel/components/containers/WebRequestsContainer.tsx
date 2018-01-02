import { connect, Dispatch } from "react-redux";
import WebRequests from "../WebRequests";
import { PanelState, WebRequestPayload, WebRequestPayloadSnapshot } from "../../../types/Types";
import { AddSnapshotAction, RemoveSnapshotAction } from "../../actions/Snapshots";

const mapStateToProps = (state: PanelState) => {
  return {
    data: state.webRequests,
    snapshots: state.snapshots,
    chromeId: state.metaData.chromeId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot): void => {
      dispatch(AddSnapshotAction(chromeId, wrps));
    },
    removeSnapshot: (chromeId: string, wrps: WebRequestPayloadSnapshot): void => {
      dispatch(RemoveSnapshotAction(chromeId, wrps));
    },
  };
};

const WebRequestsContainer = connect(mapStateToProps, mapDispatchToProps)(WebRequests);

export default WebRequestsContainer;
