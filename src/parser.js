// @flow

import type { WebRequestParams } from './types.js';
import { toPairs, map } from 'ramda';

const URL = require('url');
import querystring from 'querystring';

const parse = (url: string) : Array<WebRequestParams> => {
    const parsed = new URL.parse(url);
    const data: Array<WebRequestParams> = map(
        createWebRequestParams,
        toPairs(
            // $FlowFixMe
            querystring.parse(parsed.query)
        )
    );
    return data;
};

const createWebRequestParams = (tuple : [string, string]) : WebRequestParams => {
    return {label: tuple[0], value: tuple[1], valueType: 'string'};
};

export { parse };
