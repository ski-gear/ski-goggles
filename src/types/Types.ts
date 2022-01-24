import { Delta } from "jsondiffpatch";
import {
  FormattedWebRequestData,
  Provider,
  ProviderCanonicalName,
} from "ski-vendors";

export type PostMessageType = "newWebRequest" | "newSnapshot" | "chromeId";

export interface WebRequestPayload {
  browserRequestId: string;
  url: string;
  timeStamp: number;
  provider: Provider;
  data: FormattedWebRequestData;
}

export type WebRequestPayloadSnapshot = WebRequestPayload & {
  title: string;
  snapshotTimeStamp: number;
};

interface PostMessageEnvelope {
  type: string;
  payload: {};
}

export type WebRequestMessageEnvelope = PostMessageEnvelope & {
  type: "webRequest";
  payload: WebRequestPayload;
};

export type SnapshotMessageEnvelope = PostMessageEnvelope & {
  type: "snapshots";
  payload: WebRequestPayloadSnapshot[];
};

export type MessageEnvelope =
  | WebRequestMessageEnvelope
  | SnapshotMessageEnvelope;

export interface UserProviderSetting {
  enabled: boolean;
  providerCanonicalName: ProviderCanonicalName;
  providerPattern?: RegExp;
}

export interface UserOptions {
  version: string;
  providers: UserProviderSetting[];
}

export type Port = chrome.runtime.Port;

export interface Tab {
  port: Port;
}

export interface Tabs {
  [key: string]: Tab;
}

export type Version = string;

export type UserOptionsKey = "skiGogglesOptions";
export type SnapShotKey = "skiGogglesSnapshots";

export interface GlobalState {
  userOptionsKey: UserOptionsKey;
  snapShotKey: SnapShotKey;
  tabs: Tabs;
  masterPattern: RegExp;
}

export type RunTimeMessageSubject =
  | "open-options-tab"
  | "open-issues-page"
  | "add-snapshot"
  | "remove-snapshot";
export interface RunTimeMessage {
  subject: RunTimeMessageSubject;
  payload: any;
}

export type SnapshotRunTimeMessage = RunTimeMessage & {
  payload: WebRequestPayload;
};

export interface PanelMetaData {
  chromeId: string;
}

export interface PanelState {
  metaData: PanelMetaData;
  webRequests: WebRequestPayload[];
  snapshots: WebRequestPayload[];
}

export interface DiffData {
  raw: Delta | undefined;
  formatted: string | undefined;
}
