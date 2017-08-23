// @flow
import type { InterceptedDataEnvelope } from '../types.js';
import { map, empty } from 'ramda';

const panelCreated = (panel: chrome$ExtensionPanel) => {
  let queuedMessages: Array<CustomEvent> = [];
  let panelWindow: window;
  let tabId: number = chrome.devtools.inspectedWindow.tabId;
  const port: chrome$Port = chrome.runtime.connect("skig-" + tabId);

  port.onMessage.addListener((msg: InterceptedDataEnvelope) : void => {
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
    )

    queuedMessages = empty(queuedMessages);
  };

  panel.onShown.addListener(onPanelFirstShow);
};


chrome.devtools.panels.create(
  "Ski Goggles",
  "images/ski-googles-icon.png",
  "panel.html",
  panelCreated
);
