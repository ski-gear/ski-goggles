// @ flow

import { Provider } from '../types.js';

type EnableProvider = {
    type: string,
    provider: Provider
};

type DisableProvider = {
    type: string,
    provider: Provider
};

type ResetAllProviderOptions = {
    type: string
};

export type Action = EnableProvider | DisableProvider | ResetAllProviderOptions;

export const ENABLE_PROVIDER = 'ENABLE_PROVIDER';
export const DISABLE_PROVIDER = 'DISABLE_PROVIDER';
export const RESET_ALL_PROVIDER_OPTIONS = 'RESET_ALL_PROVIDER_OPTIONS';

export const enableProviderAction = (provider: Provider): EnableProvider => {
    return { type: ENABLE_PROVIDER, provider };
};

export const disableProviderAction = (provider: Provider): DisableProvider => {
    return { type: DISABLE_PROVIDER, provider };
};

export const resetAllProviderOptionsAction = (): ResetAllProviderOptions => {
    return { type: RESET_ALL_PROVIDER_OPTIONS };
};
