const onInit = (chrome, details) => {
  console.debug(details);
  console.debug('eventPage onInit');
  initPrefs(chrome);
};

const initPrefs = (chrome) => {
  const prefs = {
    test: 'value'
  };

  chrome.storage.local.set({"skiGoggles": prefs}, () => {
    if (!!chrome.runtime.lastError) {
      console.error("Error setting prefs: ", chrome.runtime.lastError);
    }
  });

  // force a (re)load of prefs, now that they may have changed
  loadPrefsFromStorage(chrome, prefs);
};

const loadPrefsFromStorage = (chrome, prefs) => {
  chrome.storage.local.get("skiGoggles", prefData => {
    prefs = prefData.skiGoggles;
    console.debug('prefs:', prefData);
  });
};

const getCurrentPattern = (prefSet) => {
  let patterns = [];
  const providerPatterns = [/sp\.eventus\-test/];
  patterns = providerPatterns;

  return new RegExp(patterns.join("|")).source;
};

const beforeRequestCallback = (tabs, details) => {
  if (!(details.tabId in tabs)) {
    return;
  }

  sendToAllDevTools(tabs, {
    type: "webRequest",
    payload: { url: details.url}
  });
};

const getTabId = (port) => {
  return port.name.substring(port.name.indexOf("-") + 1);
};

const sendToDevToolsForTab = (tabs, tabId, object) => {
  console.debug("sending ", object.type, " message to tabId: ", tabId, ": ", object);
  try {
    tabs[tabId].port.postMessage(object);
  } catch (ex) {
    console.error("error calling postMessage: ", ex.message);
  }
};

const sendToAllDevTools = (tabs, object) => {
  Object.keys(tabs).forEach(tabId => {
    sendToDevToolsForTab(tabs, tabId, object);
  });
};

export {
  onInit,
  getCurrentPattern,
  beforeRequestCallback,
  getTabId,
  sendToAllDevTools,
  sendToDevToolsForTab

}
