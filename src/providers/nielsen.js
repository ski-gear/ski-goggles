// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, assoc, prop, sortBy } from 'ramda';
import { labelReplacerFromDictionary, setTitle } from './helpers.js';

const Nielsen: Provider = {
    canonicalName: 'Nielsen',
    displayName: 'Nielsen',
    logo: 'nielsen.png',
    pattern: /\.imrworldwide.com\/cgi-bin\/m\?/,
    transformer: (data: WebRequestData) : WebRequestData => {
        const params = sortBy(prop('label'), map(transform, data.params));
        const dataWithTitle = setTitle('Page View', data);
        // $FlowFixMe
        return assoc('params', params, dataWithTitle);
    }
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    let category = categorize(datum.label);
    let label : string = labelReplacer(datum.label);
    return { label: label, value: datum.value, valueType: 'string', category };
};

const categorize = (_label: string): string | null => {
    return null;
};

const labelReplacer = (label: string): string => {
    return labelReplacerFromDictionary(label, LabelDictionary);
};

const LabelDictionary : {[string]: string} = {
    lg: 'Language'
};

export { Nielsen };
