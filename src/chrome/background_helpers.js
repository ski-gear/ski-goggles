// @flow

import { curry, pluck, prop, filter } from 'ramda';
import type { WebRequestEnvelope, GlobalState } from '../types.js';
import moment from 'moment';
import { parse } from '../parser.js';
import { matchesBroadly, getProvider, generateMasterPattern } from '../matcher.js';
import { defaultOptions } from '../options/helpers';
import { setOptions, getOptions } from './local_storage';

export const onInstall = curry((state: GlobalState, _details: any) : void => {
    const defaults = defaultOptions();
    setOptions(state.chrome, state.chromeOptionsKey, defaults).then((_data) => {
        console.log('Initial Defaults set');
        refreshMasterPattern(state);
    });
});

export const processWebRequest = curry((state: GlobalState, details: any) : void => {
    if (!(details.tabId in state.tabs)) {
        return;
    }
    if(matchesBroadly(details.url, state.masterPattern)) {
        let url: string = details.url;
        let tabId: string = details.tabId;
        let timeStamp: number = parseInt(moment().format('x'));
        let data = parse(url);
        let provider = getProvider(url);

        if(provider){
            let eventData: WebRequestEnvelope = {
                type: 'webRequest',
                payload: {
                    url: url,
                    providerDisplayName: provider.displayName,
                    providerCanonicalName: provider.canonicalName,
                    providerLogo: provider.logo,
                    timeStamp: timeStamp,
                    data: provider.transformer({params: data})
                }
            };
            sendToSkiGoggles(state, tabId, eventData);
        }
    }
});

export const refreshMasterPattern = (state: GlobalState) => {
    console.debug('Recreating masterpattern');
    getOptions(state.chrome, state.chromeOptionsKey).then(
        (opts) => {
            state.masterPattern = generateMasterPattern(
                enabledProvidersFromOptions(opts)
            );
        }
    );
};

export const onConnectCallBack = curry((state: GlobalState, port: any): void => {
    if (port.name.indexOf('skig-') !== 0) return;
    console.debug(`Registered port: ${port.name}`);

    const tabId = getTabId(port);
    state.tabs[tabId] = {
        port: port
    };

    // Remove port when destroyed (e.g. when devtools instance is closed)
    port.onDisconnect.addListener(port => {
        console.debug(`Disconnecting port ${port.name}`);
        delete state.tabs[getTabId(port)];
    });

    // logs messages from the port (in the background page's console!)
    port.onMessage.addListener(msg => {
        console.debug(`Message from port[${tabId}]: `, msg);
    });
});

const getTabId = (port: any) : string => {
    return port.name.substring(port.name.indexOf('-') + 1);
};

const sendToSkiGoggles = (state: GlobalState, tabId: string, object: any) => {
    console.debug('sending ', object.type, ' message to tabId: ', tabId, ': ', object);
    try {
        state.tabs[tabId].port.postMessage(object);
    } catch (ex) {
        console.error('error calling postMessage: ', ex.message);
    }
};

const enabledProvidersFromOptions = (opts: any): Array<any> => {
    // $FlowFixMe
    return pluck(
        'providerCanonicalName',
        filter(
            (p) => p.enabled == true,
            prop('providers', opts))
    );
};
