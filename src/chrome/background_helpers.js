// @flow

import { curry, map, keys } from 'ramda';
import type { WebRequestEnvelope, Tabs } from '../types.js';
import moment from 'moment';
import { parse } from '../parser.js';
import { matchesBroadly, getProvider } from '../matcher.js';

const onInit = curry((chrome: any, details: any) : void => {
    console.debug(details);
    console.debug('eventPage onInit');
    initPrefs(chrome);
});

const initPrefs = curry((chrome: any) => {
    const prefs = {
        test: 'value'
    };

    chrome.storage.local.set({'skiGoggles': prefs}, () => {
        if (chrome.runtime.lastError) {
            console.error('Error setting prefs: ', chrome.runtime.lastError);
        }
    });

    // force a (re)load of prefs, now that they may have changed
    loadPrefsFromStorage(chrome, prefs);
});

const loadPrefsFromStorage = (chrome: any, _prefs: any) => {
    chrome.storage.local.get('skiGoggles', prefData => {
        let prefs = prefData.skiGoggles;
        console.debug('prefs:', prefs);
    });
};

const processWebRequest = (getTabs: any, getMasterPattern: any, details: any) : void => {
    let tabs = getTabs();
    let masterPattern = getMasterPattern();

    if (!(details.tabId in tabs)) {
        return;
    }

    if(matchesBroadly(details.url, masterPattern)) {
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
            sendToDevToolsForTab(tabs, tabId, eventData);
        }
    }
};

const getTabId = (port: any) : string => {
    return port.name.substring(port.name.indexOf('-') + 1);
};

const sendToDevToolsForTab = (tabs: Tabs, tabId: string, object: any) => {
    console.debug('sending ', object.type, ' message to tabId: ', tabId, ': ', object);
    try {
        tabs[tabId].port.postMessage(object);
    } catch (ex) {
        console.error('error calling postMessage: ', ex.message);
    }
};

const sendToAllDevTools = (tabs: any, object: any): void => {
    map(
        (tabId) => sendToDevToolsForTab(tabs, tabId, object),
        keys(tabs)
    );
};

export {
    onInit,
    processWebRequest,
    getTabId,
    sendToAllDevTools,
    sendToDevToolsForTab,
    loadPrefsFromStorage,
};
