// @flow

import { curry, pluck, prop, filter } from 'ramda';

import type { Tabs, UserOptionsKey } from '../types.js';

import { generateMasterPattern } from '../matcher.js';
import * as helpers from './background_helpers.js';
import { getOptions } from './local_storage';

const chromeOptionsKey: UserOptionsKey = 'skiGogglesOptions';
let prefs = {};

let tabs: Tabs = {};

const getTabs = () => tabs;

let masterPattern: RegExp = /(?:)/;
const recreateMasterPattern = () => {
    console.debug('Recreating masterpattern');
    getOptions(chrome, chromeOptionsKey).then(
        (opts) => {
            masterPattern = generateMasterPattern(
                enabledProvidersFromOptions(opts)
            );
        }
    );
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

const getMasterPattern = () => {
    return masterPattern;
};

const installCallback = helpers.onInstall(chrome, chromeOptionsKey);
// $FlowFixMe
chrome.runtime.onInstalled.addListener(installCallback);

chrome.runtime.onStartup.addListener(() => {
    console.debug('starting up..');
    recreateMasterPattern();
});


chrome.storage.onChanged.addListener((changes, _namespace) => {
    if (chromeOptionsKey in changes) {
        recreateMasterPattern();
    }
});

chrome.runtime.onMessage.addListener((msg) => {
    if(msg == 'open-options-tab'){
        chrome.runtime.openOptionsPage(console.log);
    }
});

// $FlowFixMe
const beforeRequestCallback = curry(helpers.processWebRequest)(getTabs)(getMasterPattern);

// $FlowFixMe
chrome.webRequest.onBeforeRequest.addListener(
    beforeRequestCallback, {
        urls: ['<all_urls>']
    }, ['requestBody']
);

// $FlowFixMe
chrome.runtime.onConnect.addListener((port) => {
    if (port.name.indexOf('skig-') !== 0) return;
    console.debug('Registered port ', port.name, '; id ', port.portId_);

    const tabId = helpers.getTabId(port);
    tabs[tabId] = {
        port: port
    };

    // respond immediately with prefs data
    helpers.sendToDevToolsForTab(tabs, tabId, {
        'type': 'prefs',
        'payload': prefs
    });

    // Remove port when destroyed (e.g. when devtools instance is closed)
    port.onDisconnect.addListener(port => {
        console.debug('Disconnecting port ', port.name);
        delete tabs[helpers.getTabId(port)];
    });

    // logs messages from the port (in the background page's console!)
    port.onMessage.addListener(msg => {
        console.debug(`Message from port[${tabId}]: `, msg);
    });
});
