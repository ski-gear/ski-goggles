// @flow

import type { WebRequestEnvelope } from '../types.js';
import { map, empty } from 'ramda';

const panelCreated = (panel: chrome$ExtensionPanel) => {
    let queuedMessages: Array<CustomEvent> = [];
    let panelWindow: window;
    let tabId: number = chrome.devtools.inspectedWindow.tabId;
    // $FlowFixMe
    const port: chrome$Port = chrome.runtime.connect({name: `skig-${tabId.toString()}`});

    port.onMessage.addListener((msg: WebRequestEnvelope) : void => {
        let event: CustomEvent = new CustomEvent('newData', { detail: msg });

        if(panelWindow) {
            panelWindow.document.dispatchEvent(event);
        } else {
            queuedMessages.push(event);
        }
    });

    /**
   * Called when the devtools panel is first shown
   */
    const onPanelFirstShow = (panelWindowRef: window) : void => {
        panel.onShown.removeListener(onPanelFirstShow); // Ensure this fires only once.

        map(
            (event) => panelWindowRef.document.dispatchEvent(event),
            queuedMessages
        );

        queuedMessages = empty(queuedMessages);
        // set the global reference
        panelWindow = panelWindowRef;
    };

    panel.onShown.addListener(onPanelFirstShow);
};


chrome.devtools.panels.create(
    'Ski Goggles',
    'images/ski-googles-icon.png',
    'panel.html',
    panelCreated
);
