// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { find, map, assoc, prop, defaultTo, sortBy } from 'ramda';
import { labelReplacerFromDictionary, setTitle } from './helpers.js';

const Krux: Provider = {
    canonicalName: 'Krux',
    displayName: 'Krux',
    logo: 'krux.png',
    pattern: /beacon\.krxd\.net\/pixel\.gif/,
    transformer: (data: WebRequestData) : WebRequestData => {
        const params = sortBy(prop('label'), map(transform, data.params));
        const dataWithTitle = setTitle(getEventName(params), data);
        // $FlowFixMe
        return assoc('params', params, dataWithTitle);
    }
};

const getEventName = (params: Array<WebRequestParam>) : string | null => {
    const row = find(
        e => e.label == 'fired',
        params
    );
    // $FlowFixMe
    return defaultTo('Page View', prop('value', row));
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    let category = categorize(datum.label);
    let label : string = labelReplacer(datum.label);
    return { label: label, value: datum.value, valueType: 'string', category };
};

const DATA_LABEL = 'Data Layer';

const categorize = (label: string): string | null => {
    switch (label) {
    case (label.match(/^(_k|kpl)(.*)/) || {}).input:
        return DATA_LABEL;
    default:
        return null;
    }
};

const labelReplacer = (label: string): string => {
    return labelReplacerFromDictionary(label, LabelDictionary);
};

const LabelDictionary : {[string]: string} = {
    source: 'Source'
};

export { Krux };
