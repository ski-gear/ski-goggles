import { connect, Dispatch } from "react-redux";
import MenuBar from "../MenuBar";
import { clearAllWebRequests } from "../../actions/index";

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clear: () => {
      dispatch(clearAllWebRequests());
    },
  };
};

const MenuContainer = connect(null, mapDispatchToProps)(MenuBar);

export default MenuContainer;
