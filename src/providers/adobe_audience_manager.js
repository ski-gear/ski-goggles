// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { find, map, assoc, prop, lensPath, set, defaultTo} from 'ramda';
import { labelReplacerFromDictionary } from './helper.js';

const AdobeAudienceManager: Provider = {
    canonicalName: 'AdobeAudienceManager',
    displayName: 'Adobe Audience Manager',
    logo: 'adobe-audience-manager.png',
    pattern: /smetrics\.realestate\.com\.au/,
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
        e => e.label == 'Events',
        params
    );
    // $FlowFixMe
    return defaultTo('Page View', prop('value', row));
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    console.log('stuff');
    let category = categorize(datum.label);
    let label : string = labelReplacer(datum.label);
    return { label: label, value: datum.value, valueType: 'string', category };
};

const DATA = 'Data';

const categorize = (label: string): string | null => {
    switch (label) {
    case (label.match(/^(v|evar)(\d+)$/i) || {}).input:
        return DATA;
    case (label.match(/^(c|prop)(\d+)$/i) || {}).input:
        return DATA;
    default:
        return null;
    }
};

const labelReplacer = (label: string): string => {
    switch (label) {
    case (label.match(/^(v|evar)(\d+)$/i) || {}).input:
        // $FlowFixMe
        return `eVar${RegExp.$2}`;
    case (label.match(/^(c|prop)(\d+)$/i) || {}).input:
        // $FlowFixMe
        return `Prop${RegExp.$2}`;
    default:
        return labelReplacerFromDictionary(label, LabelDictionary);
    }
};

const LabelDictionary : {[string]: string} = {
    ns: 'Visitor namespace'
    , ndh: 'Image sent from JS?'
    , ch: 'Channel'
    , v0: 'Campaign'
    , r: 'Referrer URL'
    , ce: 'Character set'
    , cl: 'Cookie lifetime'
    , g: 'Current URL'
    , j: 'JavaScript version'
    , bw: 'Browser width'
    , bh: 'Browser height'
    , s: 'Screen resolution'
    , c: 'Screen color depth'
    , ct: 'Connection type'
    , p: 'Netscape plugins'
    , k: 'Cookies enabled?'
    , hp: 'Home page?'
    , pid: 'Page ID'
    , pidt: 'Page ID type'
    , oid: 'Object ID'
    , oidt: 'Object ID type'
    , ot: 'Object tag name'
    , pe: 'Link type'
    , pev1: 'Link URL'
    , pev2: 'Link name'
    , pev3: 'Video milestone'
    , h1: 'Hierarchy var1'
    , h2: 'Hierarchy var2'
    , h3: 'Hierarchy var3'
    , h4: 'Hierarchy var4'
    , h5: 'Hierarchy var5'
    , cc: 'Currency code'
    , t: 'Browser time'
    , v: 'Javascript-enabled browser?'
    , pccr: 'Prevent infinite redirects'
    , vid: 'Visitor ID'
    , vidn: 'New visitor ID'
    , fid: 'Fallback Visitor ID'
    , mid: 'Marketing Cloud Visitor ID'
    , aid: 'Legacy Visitor ID'
    , cdp: 'Cookie domain periods'
    , pageName: 'Page name'
    , pageType: 'Page type'
    , server: 'Server'
    , events: 'Events'
    , products: 'Products'
    , purchaseID: 'Purchase ID'
    , state: 'Visitor state'
    , vmk: 'Visitor migration key'
    , vvp: 'Variable provider'
    , xact: 'Transaction ID'
    , zip: 'ZIP/Postal code'
    , rsid: 'Report Suites'
};

export { AdobeAudienceManager };
