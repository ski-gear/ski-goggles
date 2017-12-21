import { WebRequestData, WebRequestParam, Provider, ProviderCanonicalName } from 'ski-providers'

export type WebRequestPayload = {
    url: string,
    timeStamp: number,
    providerCanonicalName: string,
    providerLogo: string,
    providerDisplayName: string,
    data: WebRequestData
}

export type WebRequestEnvelope = {
  type: string,
  payload: WebRequestPayload
};

export type UserOptionsKey = 'skiGogglesOptions';

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

export type GlobalState = {
    chromeOptionsKey: UserOptionsKey,
    tabs: Tabs,
    masterPattern: RegExp
};
