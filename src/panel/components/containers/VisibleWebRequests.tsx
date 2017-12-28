import { connect, Dispatch } from "react-redux";
import WebRequests from "../WebRequests";
import { PanelState, WebRequestPayload } from "src/types/Types";
import { addSnapshotRowAction } from "../../actions/index";

const getVisibleWebRequests = (webRequests: any) => {
  return webRequests;
};

const mapStateToProps = (state: PanelState) => {
  return {
    data: getVisibleWebRequests(state.webRequests),
    snapshots: state.snapshots
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addSnapshot: (wrp: WebRequestPayload): void => {
      dispatch(addSnapshotRowAction(wrp));
    },
  };
};

const VisibleWebRequests = connect(mapStateToProps, mapDispatchToProps)(WebRequests);

export default VisibleWebRequests;
