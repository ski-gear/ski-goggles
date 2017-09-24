// @flow
import type { Provider, WebRequestParam, WebRequestData } from '../types.js';
// $FlowFixMe
import { find, map, assoc, prop, propOr, sortBy, contains, pluck, defaultTo, isEmpty } from 'ramda';
import { labelReplacerFromDictionary, setTitle } from './helpers.js';

const LINK_TYPE = 'Link type';
const EVENTS = 'Events';

const transformer = (data: WebRequestData): WebRequestData => {
    const params = sortBy(prop('label'), map(transform, data.params));
    const dataWithTitle = setTitle(getEventName(params), data);
    // $FlowFixMe
    return assoc('params', params, dataWithTitle);
};

const AdobeAnalyticsAppMeasurement: Provider = {
    canonicalName: 'AdobeAnalyticsAppMeasurement',
    displayName: 'Adobe Analytics AppMeasurement',
    logo: 'adobe-analytics-app-measurement.png',
    pattern: /\/b\/ss\/|2o7/,
    transformer: transformer
};

const getEventName = (params: Array<WebRequestParam>) : string | null => {
    // $FlowFixMe
    const isCustomEvent = contains(LINK_TYPE, pluck('label', params));
    const eventRow = defaultTo(
        {}, find(
            e => e.label == EVENTS,
            params
        )
    );

    // $FlowFixMe
    const eventName = propOr('Unknown Event', 'value', eventRow);
    if(isCustomEvent){
        return eventName;
    } else {
        return isEmpty(eventRow) ? 'Page Load' : `Page Load (${eventName})`;
    }
};

const transform = (datum: WebRequestParam): WebRequestParam => {
    let category = categorize(datum.label);
    let label : string = labelReplacer(datum.label);
    return { label: label, value: datum.value, valueType: 'string', category };
};

const DATA_LABEL = 'Evars & Props';

const categorize = (label: string): string | null => {
    switch (label) {
    case (label.match(/^(v|evar)(\d+)$/i) || {}).input:
        return DATA_LABEL;
    case (label.match(/^(c|prop)(\d+)$/i) || {}).input:
        return DATA_LABEL;
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
    , pe: LINK_TYPE
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
    , events: EVENTS
    , products: 'Products'
    , purchaseID: 'Purchase ID'
    , state: 'Visitor state'
    , vmk: 'Visitor migration key'
    , vvp: 'Variable provider'
    , xact: 'Transaction ID'
    , zip: 'ZIP/Postal code'
    , rsid: 'Report Suites'
};

export { AdobeAnalyticsAppMeasurement };
