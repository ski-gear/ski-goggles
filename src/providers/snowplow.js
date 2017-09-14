// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, contains, pathOr, find, set, lensPath, assoc, sortBy, prop } from 'ramda';
import { labelReplacerFromDictionary } from './helpers.js';

const EVENT_PAYLOAD = 'Event Payload';

const Snowplow: Provider = {
    canonicalName: 'Snowplow',
    displayName: 'Snowplow',
    logo: 'snowplow.png',
    pattern: /sp\.eventus-test\.net/,
    transformer: (data: WebRequestData) : WebRequestData => {
        let transformed: WebRequestData = data;
        const params = sortBy(prop('label'), map(transform, data.params));
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
        e => e.label == EVENT_PAYLOAD,
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
    const category = categorize(datum.label);
    const label = labelReplacer(datum.label);

    if (contains(datum.label, ['cx', 'ue_px'])) {
        const json = formattedJSON(datum.value);
        return { label, value: json, valueType: 'json', category};
    }
    else {
        return { label, value: datum.value, valueType: datum.valueType, category};
    }
};

const formattedJSON = (data: string): string => {
    let cleaned = data.replace(/-/, '+');
    let payload = atob(cleaned);
    let parsed = JSON.parse(payload);
    let json = JSON.stringify(parsed, null, 4);
    return json;
};

const DATA_LABEL = 'Data';

const categorize = (label: string): string | null => {
    if (contains(label, ['cx', 'ue_px'])) {
        return DATA_LABEL;
    } else {
        return null;
    }
};

const labelReplacer = (label: string): string => {
    return labelReplacerFromDictionary(label, LabelDictionary);
};

const LabelDictionary : {[string]: string} = {
    'ue_px': EVENT_PAYLOAD,
    'cx': 'Context Payload'
};

export { Snowplow };
