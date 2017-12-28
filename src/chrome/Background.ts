import { GlobalState, RunTimeMessage, WebRequestPayload } from "../types/Types";
import { onInstall, refreshMasterPattern, processWebRequest, onConnectCallBack } from "./BackgroundHelpers";
import when from "when-switch";
import { OPEN_OPTIONS_TAB, OPEN_ISSUES_PAGE, GIT_ISSUES_URL, SAVE_SNAPSHOT } from "../Constants";
import { setOptions, getOptions } from "./LocalStorage";
import { takeLast, uniqBy, prop, assoc, filter, isEmpty } from "ramda";
import { snapshots } from "src/panel/reducers/Snapshots";

let state: GlobalState = {
  masterPattern: /(?:)/,
  tabs: {},
  userOptionsKey: "skiGogglesOptions",
  snapShotKey: "skiGogglesSnapshots",
};

chrome.runtime.onInstalled.addListener(onInstall(state));

chrome.runtime.onStartup.addListener(() => {
  console.debug("starting up..");
  refreshMasterPattern(state);
});

chrome.storage.onChanged.addListener((changes: any, _namespace: any) => {
  if (state.userOptionsKey in changes) {
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
  when(msg.subject)
    .is(OPEN_OPTIONS_TAB, () => {
      chrome.runtime.openOptionsPage(console.log);
    })
    .is(OPEN_ISSUES_PAGE, () => {
      chrome.tabs.create({ url: GIT_ISSUES_URL });
    })
    .is(SAVE_SNAPSHOT, () => {
      const snapshot = msg.payload as WebRequestPayload
      getOptions(state.snapShotKey).then(
        (data: WebRequestPayload[]) => {
          const groomedData = isEmpty(data) ? [] : data;
          const snapshots = addSnapshot(groomedData, snapshot)
          console.log('Saving', snapshots);
          setOptions(state.snapShotKey, snapshots);
        }
      )
    });
});

const addSnapshot = (state: WebRequestPayload[], row: WebRequestPayload): WebRequestPayload[] => {
  const added = [...state, row];
  const uniq = uniqBy(prop("browserRequestId"), added) as WebRequestPayload[];
  return takeLast(10, uniq);
};

const removeSnapshot = (state: WebRequestPayload[], row: WebRequestPayload): WebRequestPayload[] => {
  return filter((wrp: WebRequestPayload) => wrp.browserRequestId != row.browserRequestId, state);
};
