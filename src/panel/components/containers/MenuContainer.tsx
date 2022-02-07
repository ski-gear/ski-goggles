import { connect, Dispatch } from "react-redux";

import { PanelState } from "../../../types/Types";
import { clearAllWebRequests } from "../../actions/WebRequests";
import MenuBar from "../MenuBar";

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clear: () => {
      dispatch(clearAllWebRequests());
    },
  };
};

const mapStateToProps = (state: PanelState) => {
  return {
    chromeId: state.metaData.chromeId,
    data: state.webRequests,
  };
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuContainer;
