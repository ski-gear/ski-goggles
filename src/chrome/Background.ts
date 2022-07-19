import { filter, isEmpty, prop, takeLast, uniqBy } from "ramda";
import when from "when-switch";

import { ADD_SNAPSHOT, GIT_ISSUES_URL, OPEN_ISSUES_PAGE, OPEN_OPTIONS_TAB, REMOVE_SNAPSHOT } from "../Constants";
import { GlobalState, RunTimeMessage, SnapshotMessageEnvelope, WebRequestPayloadSnapshot } from "../types/Types";
import {
  broadcastToAllTabs,
  onConnectCallBack,
  onInstall,
  processWebRequest,
  refreshMasterPattern,
} from "./BackgroundHelpers";
import { getOptions, setOptions } from "./LocalStorage";

const state: GlobalState = {
  masterPattern: /(?:)/,
  snapShotKey: "skiGogglesSnapshots",
  tabs: {},
  userOptionsKey: "skiGogglesOptions",
};

chrome.runtime.onInstalled.addListener(onInstall(state));

chrome.runtime.onStartup.addListener(() => {
  console.debug("Ski Goggles: onStartUp...");
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

chrome.runtime.onMessage.addListener((msg: RunTimeMessage, sender: chrome.runtime.MessageSender, sendResponse): void => {
  when(msg.subject)
    .is(OPEN_OPTIONS_TAB, () => {
      chrome.runtime.openOptionsPage(console.log);
    })
    .is(OPEN_ISSUES_PAGE, () => {
      chrome.tabs.create({ url: GIT_ISSUES_URL });
    })
    .is(ADD_SNAPSHOT, () => {
      const snapshot = msg.payload as WebRequestPayloadSnapshot;
      getOptions(state.snapShotKey).then((data: WebRequestPayloadSnapshot[]) => {
        const groomedData = isEmpty(data) ? [] : data;
        const snapshots = addSnapshot(groomedData, snapshot);
        setOptions(state.snapShotKey, snapshots).then((_: any) => {
          const snapshotMessage: SnapshotMessageEnvelope = {
            payload: snapshots,
            type: "snapshots",
          };
          broadcastToAllTabs(state, snapshotMessage);
        });
      });
    })
    .is(REMOVE_SNAPSHOT, () => {
      const snapshot = msg.payload as WebRequestPayloadSnapshot;
      getOptions(state.snapShotKey).then((data: WebRequestPayloadSnapshot[]) => {
        const groomedData = isEmpty(data) ? [] : data;
        const snapshots = removeSnapshot(groomedData, snapshot);
        setOptions(state.snapShotKey, snapshots).then((_: any) => {
          const snapshotMessage: SnapshotMessageEnvelope = {
            payload: snapshots,
            type: "snapshots",
          };
          broadcastToAllTabs(state, snapshotMessage);
        });
      });
    });
  sendResponse({farewell: "goodbye"});
});

const addSnapshot = (
  state: WebRequestPayloadSnapshot[],
  row: WebRequestPayloadSnapshot,
): WebRequestPayloadSnapshot[] => {
  const added = [...state, row];
  const uniq = uniqBy(prop("browserRequestId"), added) as WebRequestPayloadSnapshot[];
  return takeLast(10, uniq);
};

const removeSnapshot = (
  state: WebRequestPayloadSnapshot[],
  row: WebRequestPayloadSnapshot,
): WebRequestPayloadSnapshot[] => {
  return filter((wrps: WebRequestPayloadSnapshot) => wrps.browserRequestId !== row.browserRequestId, state);
};