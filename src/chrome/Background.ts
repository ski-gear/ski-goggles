import { GlobalState } from "../types/Types";
import { onInstall, refreshMasterPattern, processWebRequest, onConnectCallBack } from "./BackgroundHelpers";

let state: GlobalState = {
  masterPattern: /(?:)/,
  tabs: {},
  chromeOptionsKey: "skiGogglesOptions",
};

chrome.runtime.onInstalled.addListener(onInstall(state));

chrome.runtime.onStartup.addListener(() => {
  console.debug("starting up..");
  refreshMasterPattern(state);
});

chrome.storage.onChanged.addListener((changes: any, _namespace: any) => {
  if (state.chromeOptionsKey in changes) {
    refreshMasterPattern(state);
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  processWebRequest(state),
  {
    urls: ["<all_urls>"],
  },
  ["requestBody"],
);

chrome.runtime.onConnect.addListener(onConnectCallBack(state));

chrome.runtime.onMessage.addListener((msg: string) => {
  if (msg == "open-options-tab") {
    chrome.runtime.openOptionsPage(console.log);
  }
});
