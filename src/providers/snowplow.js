// @flow
import type { Provider, WebRequestParams } from '../types.js';
import { map, contains } from 'ramda';

const Snowplow: Provider = {
    canonicalName: 'Snowplow',
    displayName: 'Snowplow',
    logo: 'snowplow.png',
    pattern: /sp\.eventus-test\.net/,
    transformer: (data) => map(transform, data)
};

const transform = (datum: WebRequestParams) : WebRequestParams => {
    if(contains(datum.label, ['cx', 'ue_px'])){
        let cleaned = datum.value.replace(/-/,'+');
        let payload = atob(cleaned);
        let parsed = JSON.parse(payload);
        let json = JSON.stringify(parsed, null, 4);
        return {label: datum.label, value: json, valueType: 'json'};
    }
    else{
        return datum;
    }
};

export { Snowplow };
