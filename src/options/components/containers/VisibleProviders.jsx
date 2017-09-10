import { connect } from 'react-redux';
import ProvidersList from '../ProvidersList.jsx';

const getVisibleProviders = (providers) => {
    return providers;
};

const mapStateToProps = state => {
    return {
        data: getVisibleProviders(state.enabledProviders)
    };
};

const VisibleProviders = connect(
    mapStateToProps,
)(ProvidersList);

export default VisibleProviders;
