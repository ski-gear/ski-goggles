// @flow

import { SkiProviders as Providers } from 'ski-providers';
import { map, join, path, values, find, isNil, filter, contains } from 'ramda';
import type { Provider, ProviderCanonicalName } from './types.js';

const matchesBroadly = (url: string, regexPattern: RegExp): bool => {
    return !!(url.match(regexPattern));
};

const generateMasterPattern = (selectedProviders: Array<ProviderCanonicalName>) : RegExp => {
    const filtered = filter(
        (p: Provider) => contains(p.canonicalName, selectedProviders),
        values(Providers)
    );

    let pattern = join(
        '|',
        map(
            path(['pattern', 'source']),
            filtered
        )
    );

    return new RegExp(pattern);
};

const getProvider = (url: string) : (Provider | null) => {
    let provider = find(
        (p) => !!(url.match(path(['pattern'], p))),
        values(Providers)
    );

    return isNil(provider) ? null : provider;
};

export {
    generateMasterPattern,
    matchesBroadly,
    getProvider
};
