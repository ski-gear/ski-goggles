import { connect, Dispatch } from "react-redux";
import WebRequests from "../WebRequests";
import { PanelState, WebRequestPayload } from "src/types/Types";
import { addSnapshotAction } from "../../actions/Snapshots";

const getVisibleWebRequests = (webRequests: any) => {
  return webRequests;
};

const mapStateToProps = (state: PanelState) => {
  return {
    data: getVisibleWebRequests(state.webRequests),
    snapshots: state.snapshots,
    chromeId: state.metaData.chromeId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addSnapshot: (chromeId: string, wrp: WebRequestPayload): void => {
      dispatch(addSnapshotAction(chromeId, wrp));
    },
  };
};

const VisibleWebRequests = connect(mapStateToProps, mapDispatchToProps)(WebRequests);

export default VisibleWebRequests;
