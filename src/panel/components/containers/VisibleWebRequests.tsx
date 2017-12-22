import { connect } from "react-redux";
import WebRequests from "../WebRequests";

const getVisibleWebRequests = (webRequests: any) => {
  return webRequests;
};

const mapStateToProps = (state: any) => {
  return {
    data: getVisibleWebRequests(state.webRequests),
  };
};

const VisibleWebRequests = connect(mapStateToProps)(WebRequests);

export default VisibleWebRequests;
