// @flow

import type { Action } from './actions';
import type { UserProviderSetting, ProviderCanonicalName } from './../types';

import * as Providers from '../providers';
import { combineReducers } from 'redux';
import { values, map, assoc } from 'ramda';
import { RESET_ALL_PROVIDERS, ENABLE_PROVIDER, DISABLE_PROVIDER } from './actions';

type UserProviderSettings = Array<UserProviderSetting>;

export const DefaultUserProviderSettings = () : UserProviderSettings => {
    return map(
        // $FlowFixMe
        (p) => ({ providerCanonicalName: p.canonicalName, enabled: true }),
        values(Providers)
    );
};

const toggleProvider = (ups: UserProviderSettings, provider: ProviderCanonicalName, state: boolean) : UserProviderSettings => {
    return map(
        (up) => {
            if (up.providerCanonicalName === provider) {
                // $FlowFixMe
                return assoc('enabled', state, up);
            } else {
                return up;
            }
        },
        ups
    );
};

const providers = (state : UserProviderSettings = DefaultUserProviderSettings() , action: Action ): UserProviderSettings => {
    switch (action.type) {
    case RESET_ALL_PROVIDERS:
        return DefaultUserProviderSettings();
    case ENABLE_PROVIDER:
        return toggleProvider(state, action.provider, true);
    case DISABLE_PROVIDER:
        return toggleProvider(state, action.provider, false);
    default:
        return state;
    }
};

export const options = combineReducers({
    providers
});
