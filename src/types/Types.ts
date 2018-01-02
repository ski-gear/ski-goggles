import { WebRequestData, WebRequestParam, Provider, ProviderCanonicalName } from 'ski-providers'
import { Delta } from 'jsondiffpatch';

export type PostMessageType = "newWebRequest" | "newSnapshot" | "chromeId";

export type WebRequestPayload = {
    browserRequestId: string,
    url: string,
    timeStamp: number,
    provider: Provider,
    data: WebRequestData
}

export type WebRequestPayloadSnapshot = WebRequestPayload & {
  title: string;
  snapshotTimeStamp: number;
}

interface PostMessageEnvelope {
  type: string,
  payload: {}
};

export type WebRequestMessageEnvelope = PostMessageEnvelope & {
  type: "webRequest";
  payload: WebRequestPayload;
};

export type SnapshotMessageEnvelope = PostMessageEnvelope & {
  type: "snapshots";
  payload: WebRequestPayloadSnapshot[];
};

export type MessageEnvelope = WebRequestMessageEnvelope | SnapshotMessageEnvelope;

export type UserProviderSetting = {
    enabled: boolean,
    providerCanonicalName: ProviderCanonicalName,
    providerPattern?: RegExp
};

export type UserOptions = {
    version: string,
    providers: UserProviderSetting[]
};

export type Port = chrome.runtime.Port;

export type Tab = {
  port: Port
};

export type Tabs = { [key: string]: Tab }

export type Version = string;

export type UserOptionsKey = 'skiGogglesOptions';
export type SnapShotKey = 'skiGogglesSnapshots';

export type GlobalState = {
    userOptionsKey: UserOptionsKey,
    snapShotKey: SnapShotKey,
    tabs: Tabs,
    masterPattern: RegExp
};

export type RunTimeMessageSubject = "open-options-tab" | "open-issues-page" | "add-snapshot" | "remove-snapshot";
export interface RunTimeMessage {
  subject: RunTimeMessageSubject
  payload: any
}

export type SnapshotRunTimeMessage = RunTimeMessage & {
  payload: WebRequestPayload
};

export type PanelMetaData = {
  chromeId: string
};

export type PanelState = {
  metaData: PanelMetaData;
  webRequests: WebRequestPayload[];
  snapshots: WebRequestPayload[];
}

export type DiffData = {
  raw: Delta | undefined;
  formatted: string | undefined;
}
