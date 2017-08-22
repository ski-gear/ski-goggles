// @flow

import * as Providers from './providers';
import { map, join, path, values, toPairs, find, isNil } from 'ramda';
import type { Provider } from './types.js';

const matchesBroadly = (url: string, regexPattern: RegExp): bool => {
  return !!(url.match(regexPattern));
};

const generateMasterPattern = () : RegExp => {
  let pattern = join(
    '|',
    map(
      path(['pattern', 'source']),
      values(Providers)
    )
  );

  return new RegExp(pattern);
};

const getProvider = (url: string) : (Provider | null) => {
  let provider = find(
    (p) => !!(url.match(path(['pattern'], p[1]))),
    toPairs(Providers)
  )

  return isNil(provider) ? null : provider[1]
}

export {
  generateMasterPattern,
  matchesBroadly,
  getProvider
}
