import { connect } from 'react-redux';
import WebRequests from '../WebRequests.jsx';

const getVisibleWebRequests = (webRequests) => {
    return webRequests;
};

const mapStateToProps = state => {
    return {
        data: getVisibleWebRequests(state.webRequests)
    };
};

const VisibleWebRequests = connect(
    mapStateToProps,
)(WebRequests);

export default VisibleWebRequests;