(function() {
  var prefs,
      tabs = {},
      that = this;

  /**
   * Installation callback
   */
  function onInit() {
    console.debug('eventPage onInit');
    initPrefs();
  }
  chrome.runtime.onInstalled.addListener(onInit);


  /**
   * Store preferences (on extension installation)
   */
  function initPrefs() {
    var prefs = {
      test: 'value'
    };

    chrome.storage.local.set({
      "skiGoggles": prefs
    }, function() {
      if (!!chrome.runtime.lastError) {
        console.error("Error setting prefs: ", chrome.runtime.lastError);
      }
    });

    // force a (re)load of prefs, now that they may have changed
    loadPrefsFromStorage("initPrefs");
  };


  /**
   * Browser startup callback
   */
  chrome.runtime.onStartup.addListener(function() {
    loadPrefsFromStorage("onStartup");
    console.log('on statup');
  });


  /**
   * Grab prefs data from storage
   */
  function loadPrefsFromStorage(whence) {
    chrome.storage.local.get("skiGoggles", function(prefData) {
      that.prefs = prefData.skiGoggles;
      console.log('prefs:', prefData);
    });
  }


  /**
   * Receive updates when prefs change and broadcast them out
   */
  chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("skiGoggles" in changes) {
      var newPrefs = changes["skiGoggles"].newValue;
      console.log("Received updated prefs", newPrefs);

      // update local (eventPage.js) prefs
      that.prefs = newPrefs;

      // send new prefs to all connected devtools panels
      sendToAllDevTools({
        "type": "prefs",
        "payload": that.prefs
      });
    }
  });

  function test(tab){
    // console.log('callback', tab.url);
  }

  /**
   * Return a pattern that matches the currently enabled providers
   */
  function getCurrentPattern(prefSet) {
    var that = this,
    patterns = [],
    providerPatterns = [/sp\.eventus\-test/];
    patterns = providerPatterns;

    return new RegExp(patterns.join("|")).source;
  }

  var beforeRequestCallback = function(details) {
    // ignore chrome:// requests and non-metrics URLs
    // if (details.tabId == -1 || !shouldProcess(details.url)) return;

    if (!(details.tabId in tabs)) {
      /* disable this error message -- too numerous!
         console.error( "Request for unknown tabId ", details.tabId ); */
      return;
    }

    sendToAllDevTools({
      type: "data",
      payload: { url: details.url}
    });
  };


  chrome.webRequest.onBeforeRequest.addListener(
    beforeRequestCallback,
    { urls: ["<all_urls>"] },
    ['requestBody']
  );


  function getTabId(port) {
    return port.name.substring(port.name.indexOf("-") + 1);
  }

  chrome.extension.onConnect.addListener(function(port) {
    if (port.name.indexOf("skig-") !== 0) return;
    console.debug("Registered port ", port.name, "; id ", port.portId_);

    var tabId = getTabId(port);
    tabs[tabId] = {};
    tabs[tabId].port = port;

    // respond immediately with prefs data
    sendToDevToolsForTab(tabId, {
      "type": "prefs",
      "payload": this.prefs
    });

    // Remove port when destroyed (e.g. when devtools instance is closed)
    port.onDisconnect.addListener(function(port) {
      console.debug("Disconnecting port ", port.name);
      delete tabs[getTabId(port)];
    });

    // logs messages from the port (in the background page's console!)
    port.onMessage.addListener(function(msg) {
      console.log("Message from port[" + tabId + "]: ", msg);
    });

    /**
     * Monitor for page load/complete events in tabs
     */
    chrome.tabs.onUpdated.addListener(function(_tabId, changeInfo, tab) {
      if (_tabId in tabs) {
        if (changeInfo.status == "loading") {
          tabs[_tabId].loading = true;
        } else {
          // give a little breathing room before marking the load as complete
          window.setTimeout(function() {
            tabs[_tabId].loading = false;
          }, 500);
        }
      }
    });
  });


  function sendToDevToolsForTab(tabId, object) {
    console.debug("sending ", object.type, " message to tabId: ", tabId, ": ", object);
    try {
      tabs[tabId].port.postMessage(object);
    } catch (ex) {
      console.error("error calling postMessage: ", ex.message);
    }
  }

  function sendToAllDevTools(object) {
    Object.keys(tabs).forEach(function(tabId) {
      sendToDevToolsForTab(tabId, object);
    });
  }

  // public
  return {};

}());
