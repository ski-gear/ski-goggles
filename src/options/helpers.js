// @flow

import type { Provider } from '../types';
import * as Providers from '../providers';
import { values, map } from 'ramda';
import { UserOptionsVersion } from '../versions';

export const defaultOptions = (): any => {
    return {
        version: UserOptionsVersion,
        providers: map(
            (p: Provider) => {
                return {
                    enabled: true,
                    providerCanonicalName: p.canonicalName,
                    providerPattern: p.pattern
                };
            },
            values(Providers)
        )
    };
};
