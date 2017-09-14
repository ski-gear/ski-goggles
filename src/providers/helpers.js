// @flow

import type { ProviderCanonicalName, Provider } from './../types';
import * as Providers from './../providers';
import { values, find, propOr } from 'ramda';

export const lookup = (name: ProviderCanonicalName): ?Provider => {
    return find(
        (p) => (p.canonicalName === name),
        values(Providers)
    );
};

export const labelReplacerFromDictionary = (label: string, dictionary: {[string]: string}): string => {
    return propOr(label, label, dictionary);
};
