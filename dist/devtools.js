chrome.devtools.panels.create(
  "Ski Goggles",
  "images/ski-googles-icon.png",
  "index.html",
  panelCreated
);

var panelCreated = function(panel) {
  var queuedMessages = [];
  var panelWindow;
  var tabId = chrome.devtools.inspectedWindow.tabId;
  var port = chrome.extension.connect(
    {
      name: "skig-" + tabId
    }
  );

  port.onMessage.addListener(function(msg) {
    alert(msg);
    if(panelWindow) {
      panelWindow.Skig.log(msg);
    } else {
      queuedMessages.push(msg);
    }
  });

  /**
   * Called when the devtools panel is first shown
   */
  panel.onShown.addListener(function runOnce(tempWindow) {
    panel.onShown.removeListener(runOnce); // Run once only
    panelWindow = tempWindow;

    // Release queued messages
    var msg;
    while(
      (msg = queuedMessages.shift())
    ){
      panelWindow.Skig.log(msg);
    };

    // Inject a reply mechanism into the Panel
    panelWindow.Skig.sendMesasge = function(msg) {
      port.postMessage(msg);
    };
  });
};

