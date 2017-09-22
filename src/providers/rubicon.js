// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, assoc, prop, sortBy } from 'ramda';
import { labelReplacerFromDictionary, setTitle } from './helpers.js';

const Rubicon: Provider = {
    canonicalName: 'Rubicon',
    displayName: 'Rubicon',
    logo: 'rubicon.png',
    pattern: /fastlane\.rubiconproject\.com/,
    transformer: (data: WebRequestData) : WebRequestData => {
        const params = sortBy(prop('label'), map(transform, data.params));
        const dataWithTitle = setTitle('Ad Load Request', data);
        // $FlowFixMe
        return assoc('params', params, dataWithTitle);
    }
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    let category = categorize(datum.label);
    let label : string = labelReplacer(datum.label);
    return { label: label, value: datum.value, valueType: 'string', category };
};

const DATA_LABEL = 'Data Layer';

const categorize = (label: string): string | null => {
    switch (label) {
    case (label.match(/^(tg_)(.*)/) || {}).input:
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

export { Rubicon };
