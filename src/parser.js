import type { WebRequestParam } from './types.js';
import { toPairs, map } from 'ramda';

const URL = require('url');
import querystring from 'querystring';

const parse = (url: string) : WebRequestParam => {
    const parsed = new URL.parse(url);
    const data: WebRequestParam = map(
        createWebRequestParam,
        toPairs(
            // $FlowFixMe
            querystring.parse(parsed.query)
        )
    );
    return data;
};

const createWebRequestParam = (tuple : [string, string]) : WebRequestParam => {
    return {label: tuple[0], value: tuple[1], valueType: 'string'};
};

export { parse };
