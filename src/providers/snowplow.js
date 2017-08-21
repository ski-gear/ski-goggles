// @flow
import type { Provider } from '../types.js';

const Snowplow: Provider = {
  canonicalName: 'Snowplow',
  displayName: 'Snowplow',
  logo: 'snowplow.png',
  pattern: /sp\.eventus\-test\.net/,
  transformer: (data) => {
    return data;
  }
};

export { Snowplow };
