// @flow

import type { Action } from './actions';
import type { Provider } from '../types.js';

import * as Providers from '../providers';
import { combineReducers } from 'redux';
import { values, append, reject, equals, uniq } from 'ramda';
import { RESET_ALL_PROVIDERS, ENABLE_PROVIDER, DISABLE_PROVIDER } from './actions';

type State = Array<Provider>;

const AllProviders = () : Array<Provider> => values(Providers);

const enabledProviders = (state : State = AllProviders() , action: Action ): State => {
    switch (action.type) {
    case RESET_ALL_PROVIDERS:
        return AllProviders();
    case ENABLE_PROVIDER:
        return uniq(append(action.provider, state));
    case DISABLE_PROVIDER:
        return reject(
            // $FlowFixMe
            p => equals(p, action.provider),
            state
        );
    default:
        return state;
    }
};

const options = combineReducers({
    enabledProviders
});

export default options;
