import { connect, Dispatch } from "react-redux";
import MenuBar from "../MenuBar.jsx";
import { clearAll } from "../../actions.js";

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clear: () => {
      dispatch(clearAll());
    },
  };
};

const MenuContainer = connect(null, mapDispatchToProps)(MenuBar);

export default MenuContainer;
