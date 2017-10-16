// @flow

import type { ProviderCanonicalName, UserOptions } from '../../../types.js';

import { connect } from 'react-redux';
import ProvidersList from '../ProvidersList.jsx';
import { disableProviderAction, enableProviderAction } from '../../actions.js';

const mapStateToProps = (state: UserOptions) => {
    return {
        data: state.providers
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onDisableProvider: (provider: ProviderCanonicalName) => dispatch(disableProviderAction(provider)),
        onEnableProvider: (provider: ProviderCanonicalName) => dispatch(enableProviderAction(provider))
    };
};

const VisibleProviders = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProvidersList);

export default VisibleProviders;
