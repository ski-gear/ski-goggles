// @flow

export type WebRequestData = {|
  meta?: {
    title: string
  },
  params: Array<WebRequestParam>
|};

export type WebRequestParam = {|
  label: string,
  value: string,
  valueType: "string" | "json",
  category?: string | null;
|};

export type WebRequestPayload = {|
    url: string,
    timeStamp: number,
    providerCanonicalName: string,
    providerLogo: string,
    providerDisplayName: string,
    data: WebRequestData
|}

export type WebRequestEnvelope = {|
  type: string,
  payload: WebRequestPayload
|};

export type Provider = {|
  canonicalName: ProviderCanonicalName,
  displayName: string,
  logo: string,
  pattern: RegExp,
  transformer: (WebRequestData) => WebRequestData
|};

export type ProviderCanonicalName = 'Snowplow' | 'AdobeAnalyticsAppMeasurement' | 'Nielsen' | 'Krux' | 'Rubicon';

export type UserOptionsKey = 'skiGogglesOptions';

export type UserProviderSetting = {|
    enabled: Boolean,
    providerCanonicalName: ProviderCanonicalName,
    providerPattern?: RegExp
|};

export type UserOptions = {|
    version: number,
    providers: Array<UserProviderSetting>
|};


export type Tab = {|
  port: any
|};

export type Tabs = { [string]: Tab }

export type Version = number;

export type GlobalState = {|
    chrome: any,
    chromeOptionsKey: UserOptionsKey,
    tabs: Tabs,
    masterPattern: RegExp
|};
