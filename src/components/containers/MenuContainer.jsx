import { connect } from 'react-redux';
import MenuBar from '../MenuBar.jsx';
import { clearAll } from '../../lib/actions.js';

const mapDispatchToProps = dispatch => {
    return {
        clear: () => {
            dispatch(clearAll());
        }
    };
};

const MenuContainer = connect(
    null,
    mapDispatchToProps
)(MenuBar);

export default MenuContainer;