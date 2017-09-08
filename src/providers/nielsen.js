// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { map, assoc, prop, lensPath, set, sortBy } from 'ramda';
import { labelReplacerFromDictionary } from './helper.js';

const Nielsen: Provider = {
    canonicalName: 'Nielsen',
    displayName: 'Nielsen',
    logo: 'nielsen.png',
    pattern: /secure-au\.imrworldwide\.com\/cgi-bin\/m\?/,
    transformer: (data: WebRequestData) : WebRequestData => {
        let transformed: WebRequestData = data;
        const params = sortBy(prop('label'), map(transform, data.params));
        const eventName = 'Page Load';

        const lens = lensPath(['meta', 'title']);
        if(eventName){
            transformed = set(lens, eventName, transformed);
        }
        // $FlowFixMe
        transformed = assoc('params', params, transformed);

        return transformed;
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
