// @ flow

import { ProviderCanonicalName } from '../types.js';

type EnableProvider = {
    type: string,
    provider: ProviderCanonicalName
};

type DisableProvider = {
    type: string,
    provider: ProviderCanonicalName
};

type ResetAllProviderOptions = {
    type: string
};

export type Action = EnableProvider | DisableProvider | ResetAllProviderOptions;

export const ENABLE_PROVIDER = 'ENABLE_PROVIDER';
export const DISABLE_PROVIDER = 'DISABLE_PROVIDER';
export const RESET_ALL_PROVIDER_OPTIONS = 'RESET_ALL_PROVIDER_OPTIONS';

export const enableProviderAction = (provider: ProviderCanonicalName): EnableProvider => {
    return { type: ENABLE_PROVIDER, provider };
};

export const disableProviderAction = (provider: ProviderCanonicalName): DisableProvider => {
    return { type: DISABLE_PROVIDER, provider };
};

export const resetAllProviderOptionsAction = (): ResetAllProviderOptions => {
    return { type: RESET_ALL_PROVIDER_OPTIONS };
};
