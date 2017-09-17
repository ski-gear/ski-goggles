// @flow
import type { GlobalState } from '../types.js';

import { onInstall, refreshMasterPattern, processWebRequest, onConnectCallBack } from './background_helpers.js';

let state: GlobalState = {
    chrome,
    masterPattern: /(?:)/,
    tabs: {},
    chromeOptionsKey: 'skiGogglesOptions'
};

state.chrome.runtime.onInstalled.addListener(onInstall(state));

state.chrome.runtime.onStartup.addListener(() => {
    console.debug('starting up..');
    refreshMasterPattern(state);
});


state.chrome.storage.onChanged.addListener((changes, _namespace) => {
    if (state.chromeOptionsKey in changes) {
        refreshMasterPattern(state);
    }
});

state.chrome.webRequest.onBeforeRequest.addListener(
    processWebRequest(state), {
        urls: ['<all_urls>']
    }, ['requestBody']
);

state.chrome.runtime.onConnect.addListener(onConnectCallBack(state));

state.chrome.runtime.onMessage.addListener((msg) => {
    if(msg == 'open-options-tab'){
        chrome.runtime.openOptionsPage(console.log);
    }
});
