import { empty, map } from "ramda";
import when from "when-switch";

import {
  ChromeIdPostMessage,
  NewSnapshotPostMessage,
  NewWebRequestPostMessage,
} from "../Constants";
import { MessageEnvelope, Port } from "../types/Types";

type ExtensionPanel = chrome.devtools.panels.ExtensionPanel;
type ChromeWindow = chrome.windows.Window & Window;

const panelCreated = (panel: ExtensionPanel) => {
  let queuedMessages: CustomEvent[] = [];
  let panelWindow: Window;

  const port: Port = chrome.runtime.connect({
    name: `skig-${ chrome.devtools.inspectedWindow.tabId }`,
  });

  port.onMessage.addListener((msg: MessageEnvelope): void => {
    const event: CustomEvent = getAppropriateEvent(msg);

    if (panelWindow) {
      panelWindow.document.dispatchEvent(event);
    } else {
      queuedMessages.push(event);
    }
  });

  /**
   * Called when the devtools panel is first shown
   */
  const onPanelFirstShow = (panelWindowRef: ChromeWindow): void => {
    panel.onShown.removeListener(onPanelFirstShow); // Ensure this fires only once.
  
    panelWindow = panelWindowRef; // Set the global reference

    map(
      (event) => panelWindowRef.document.dispatchEvent(event),
      queuedMessages,
    );

    queuedMessages = empty(queuedMessages);

    // Set the Chrome extension ID for future communications.
    const chromeIdPayload = {
      chromeId: chrome.runtime.id,
    };
    const chromeIdEvent: CustomEvent = new CustomEvent(ChromeIdPostMessage, {
      detail: chromeIdPayload,
    });
    panelWindowRef.document.dispatchEvent(chromeIdEvent);
  };

  panel.onShown.addListener(onPanelFirstShow);
};

const getAppropriateEvent = (me: MessageEnvelope): CustomEvent => {
  const eventType = when(me.type)
    .is("snapshots", NewSnapshotPostMessage)
    .is("webRequest", NewWebRequestPostMessage)
    .else("blackHole");

  return new CustomEvent(eventType, { detail: me });
};

const iconImage = "images/ski-goggles-icon.png";

let tabName = process.env.NODE_ENV === "dev" ? "Ski Goggles Dev" : "Ski Goggles";

chrome.devtools.panels.create(tabName, iconImage, "panel.html", panelCreated);
