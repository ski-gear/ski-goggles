// @flow

import type { ProviderCanonicalName, Provider } from './types';
import * as Providers from './providers';
import { values, find } from 'ramda';

export const lookup = (name: ProviderCanonicalName): ?Provider => {
    return find(
        (p) => (p.canonicalName === name),
        values(Providers)
    );
};
