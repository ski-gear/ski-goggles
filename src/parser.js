// @flow

import type { InterceptedDatum } from './types.js';
import { toPairs, map } from 'ramda';

const URL = require('url');
import querystring from 'querystring';

const parse = (url: string) : Array<InterceptedDatum> => {
    const parsed = new URL.parse(url);
    const data: Array<InterceptedDatum> = map(
        createInterceptedDatum,
        toPairs(
            // $FlowFixMe
            querystring.parse(parsed.query)
        )
    );
    return data;
};

const createInterceptedDatum = (tuple : [string, string]) : InterceptedDatum => {
    return {label: tuple[0], value: tuple[1], valueType: 'string'};
};

export { parse };
