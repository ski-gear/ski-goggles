// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, contains, pathOr, find, assoc, sortBy, prop, propOr } from 'ramda';
import { labelReplacerFromDictionary, setTitle } from './helpers.js';

const EVENT_PAYLOAD = 'Event Payload';
const EVENT = 'Event';

const transformer = (data: WebRequestData): WebRequestData => {
    const params = sortBy(prop('label'), map(transform, data.params));
    const dataWithTitle = setTitle(getEventName(params), data);
    // $FlowFixMe
    return assoc('params', params, dataWithTitle);
};

const Snowplow: Provider = {
    canonicalName: 'Snowplow',
    displayName: 'Snowplow',
    logo: 'snowplow.png',
    pattern: /(sp\.eventus-test\.net|analytics\.realestate\.com\.au)(\/i\?)/,
    transformer: transformer
};

const getEventName = (params: Array<WebRequestParam>) : string => {
    const row = getEventRow(params) || {};
    // $FlowFixMe
    const eventType = prop('value', row);
    switch (eventType) {
    case 'pv':
        return 'Page View';
    case 'ue':
        return getTitleFromUePx(params);
    default:
        return 'Unknown Event';
    }
};

const getEventRow = (params: Array<WebRequestParam>) : ?WebRequestParam => {
    return find(
        // $FlowFixMe
        e => prop('label', e) == EVENT,
        params
    );
};

const getTitleFromUePx = (params: Array<WebRequestParam>) : string => {
    // Could go wrong in multiple ways
    try {
        const ue_px_row = find(
        // $FlowFixMe
            e => prop('label', e) == EVENT_PAYLOAD,
            params
        );
        // $FlowFixMe
        const json = JSON.parse(prop('value', ue_px_row));
        // $FlowFixMe
        return pathOr('Unknown Event', ['data', 'data', 'event_name'], json);
    } catch (e) {
        console.debug('Unpareable ue_px row from: ',  params);
        return 'Unparseable Event';
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
    const payload = BinarytoAscii(data);
    let parsed;
    try {
        parsed = JSON.parse(payload);
    }
    catch (e) {
        parsed = { bad: 'data'};
    }
    const json = JSON.stringify(parsed, null, 4);
    return json;
};

const BinarytoAscii = (data: string): string => {
    return Buffer.from(data, 'base64').toString('ascii');
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
    'cx': 'Context Payload',
    'e': EVENT
};

export { Snowplow };
