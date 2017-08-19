const panelCreated = (panel) => {
  let queuedMessages = [];
  let panelWindow;
  let tabId = chrome.devtools.inspectedWindow.tabId;
  const port = chrome.extension.connect(
    {
      name: "skig-" + tabId
    }
  );

  port.onMessage.addListener((msg) => {
    let event = new CustomEvent('newData', { detail: msg });

    if(panelWindow) {
      panelWindow.document.dispatchEvent(event);
    } else {
      queuedMessages.push(event);
    }
  });

  /**
   * Called when the devtools panel is first shown
   */
  let onPanelFirstShow;
  onPanelFirstShow = (panelWindowRef) => {
    panel.onShown.removeListener(onPanelFirstShow); // Ensure this fires only once.

    panelWindow = panelWindowRef;

    let event;
    while(
      (event = queuedMessages.shift())
    ){
      panelWindow.document.dispatchEvent(event);
    };

    // Mutate the PanelWindow to create a way for it to talk to us
    panelWindow.sendToDevtoolsPage = (msg) => port.postMessage(msg);
  };

  panel.onShown.addListener(onPanelFirstShow);
};


chrome.devtools.panels.create(
  "Ski Goggles",
  "images/ski-googles-icon.png",
  "panel.html",
  panelCreated
);
