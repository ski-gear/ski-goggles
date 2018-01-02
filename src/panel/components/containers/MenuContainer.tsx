import { connect, Dispatch } from "react-redux";
import MenuBar from "../MenuBar";
import { clearAllWebRequests } from "../../actions/WebRequests";
import { PanelState } from "../../../types/Types";

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
  };
};

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuContainer;
