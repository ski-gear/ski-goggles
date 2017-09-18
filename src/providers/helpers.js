// @flow

import type { ProviderCanonicalName, Provider, WebRequestData } from './../types';
import * as Providers from './../providers';
import { values, find, propOr, lensPath, set } from 'ramda';

export const lookup = (name: ProviderCanonicalName): ?Provider => {
    return find(
        (p) => (p.canonicalName === name),
        values(Providers)
    );
};

export const labelReplacerFromDictionary = (label: string, dictionary: {[string]: string}): string => {
    return propOr(label, label, dictionary);
};

export const setTitle = (title: ?string, data: WebRequestData): WebRequestData => {
    const lens = lensPath(['meta', 'title']);
    if(title){
        return set(lens, title, data);
    } else {
        return data;
    }
};