// @flow

import * as helpers from './background_helpers.js';
import { generateMasterPattern } from '../matcher.js';
import { curry } from 'ramda';

let prefs = {};
const getPrefs = () => prefs;

type Tab = {|
  port: string,
  loading: boolean
|};

let tabs: Array<Tab> = [];
const getTabs = () => tabs;

let masterPattern = generateMasterPattern();
const getMasterPattern = () => masterPattern;

const installCallback = helpers.onInit(chrome);
// $FlowFixMe
chrome.runtime.onInstalled.addListener(installCallback);

chrome.runtime.onStartup.addListener(() => {
    helpers.loadPrefsFromStorage(chrome, prefs);
    console.debug('on statup');
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if ('skiGoggles' in changes) {
        const newPrefs = changes['skiGoggles'].newValue;
        console.debug('Received updated prefs', newPrefs);

        prefs = newPrefs;

        helpers.sendToAllDevTools(tabs, {
            'type': 'prefs',
            'payload': prefs
        });
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
        port: port,
        loading: true
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

    /**
   * Monitor for page load/complete events in tabs
   */
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tabId in tabs) {
            if (changeInfo.status == 'loading') {
                tabs[tabId].loading = true;
            } else {
                // give a little breathing room before marking the load as complete
                window.setTimeout(() => {
                    tabs[tabId].loading = false;
                }, 500);
            }
        }
    });
});
