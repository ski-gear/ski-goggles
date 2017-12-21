import { WebRequestEnvelope, Port } from "../types/Types";
import { map, empty } from "ramda";

type ExtensionPanel = chrome.devtools.panels.ExtensionPanel;
type ChromeWindow = chrome.windows.Window & Window;

const panelCreated = (panel: ExtensionPanel) => {
  let queuedMessages: CustomEvent[] = [];
  let panelWindow: Window;
  let tabId: number = chrome.devtools.inspectedWindow.tabId;
  const port: Port = chrome.runtime.connect({ name: `skig-${tabId.toString()}` });

  port.onMessage.addListener((msg: WebRequestEnvelope): void => {
    let event: CustomEvent = new CustomEvent("newData", { detail: msg });

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

    map(event => panelWindowRef.document.dispatchEvent(event), queuedMessages);

    queuedMessages = empty(queuedMessages);

    // Set the Chrome extension ID for future communications.
    const chromeIdPayload = {
      chromeId: chrome.runtime.id,
    };
    const chromeIdEvent: CustomEvent = new CustomEvent("chromeId", { detail: chromeIdPayload });
    panelWindowRef.document.dispatchEvent(chromeIdEvent);
    // set the global reference
    panelWindow = panelWindowRef;
  };

  panel.onShown.addListener(onPanelFirstShow);
};

chrome.devtools.panels.create("Ski Goggles", "images/ski-googles-icon.png", "panel.html", panelCreated);
