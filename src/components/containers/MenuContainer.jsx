import { connect } from 'react-redux';
import MenuBar from '../MenuBar.jsx';
import { clearAll } from '../../lib/actions.js';

const mapStateToProps = (_state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearAll: () => {
            dispatch(clearAll());
        }
    };
};

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);

export default MenuContainer;