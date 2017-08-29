// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, contains, pathOr, find, set, lensPath, assoc } from 'ramda';
import { labelReplacerFromDictionary } from './helper.js';

const Snowplow: Provider = {
    canonicalName: 'Snowplow',
    displayName: 'Snowplow',
    logo: 'snowplow.png',
    pattern: /sp\.eventus-test\.net/,
    transformer: (data: WebRequestData) : WebRequestData => {
        let transformed: WebRequestData = data;
        const params = map(transform, data.params);
        const eventName = getEventName(params);

        const lens = lensPath(['meta', 'title']);
        if(eventName){
            transformed = set(lens, eventName, transformed);
        }
        // $FlowFixMe
        transformed = assoc('params', params, transformed);

        return transformed;
    }
};

const getEventName = (params: Array<WebRequestParam>) : string | null => {
    const row = find(
        e => e.label == 'ue_px',
        params
    );
    if(row){
        const json = JSON.parse(row.value);
        // $FlowFixMe
        return pathOr('Unknown Event', ['data', 'data', 'event_name'], json);
    } else {
        return 'Page View';
    }
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    let transformedDatum: WebRequestParam;

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
