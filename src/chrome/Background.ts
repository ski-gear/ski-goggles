import { GlobalState, RunTimeMessage } from "../types/Types";
import { onInstall, refreshMasterPattern, processWebRequest, onConnectCallBack } from "./BackgroundHelpers";
import when from "when-switch";
import { OPEN_OPTIONS_TAB, OPEN_ISSUES_PAGE, GIT_ISSUES_URL } from "../Constants";

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

chrome.runtime.onMessage.addListener((msg: RunTimeMessage): void => {
  when(msg)
    .is(OPEN_OPTIONS_TAB, () => {
      chrome.runtime.openOptionsPage(console.log);
    })
    .is(OPEN_ISSUES_PAGE, () => {
      chrome.tabs.create({ url: GIT_ISSUES_URL });
    });
});
