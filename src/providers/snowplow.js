// @flow
import type { Provider, WebRequestParams } from '../types.js';
import { map, contains } from 'ramda';
import { labelReplacerFromDictionary } from './helper.js';

const Snowplow: Provider = {
    canonicalName: 'Snowplow',
    displayName: 'Snowplow',
    logo: 'snowplow.png',
    pattern: /sp\.eventus-test\.net/,
    transformer: (data) => map(transform, data)
};

const transform = (datum: WebRequestParams): WebRequestParams => {
    let transformedDatum: WebRequestParams;

    if (contains(datum.label, ['cx', 'ue_px'])) {
        let cleaned = datum.value.replace(/-/, '+');
        let payload = atob(cleaned);
        let parsed = JSON.parse(payload);
        let json = JSON.stringify(parsed, null, 4);
        let label = labelReplacer(datum.label);
        transformedDatum = { label, value: json, valueType: 'json' };
    }
    else {
        transformedDatum = datum;
    }

    let label = labelReplacer(transformedDatum.label);
    return { label, value: transformedDatum.value, valueType: transformedDatum.valueType };
};

const labelReplacer = (label: string): string => {
    return labelReplacerFromDictionary(label, LabelDictionary);
};

const LabelDictionary : {[string]: string} = {
};

export { Snowplow };
