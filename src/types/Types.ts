export type WebRequestData = {
  meta?: {
    title: string
  },
  params: WebRequestParam[]
};

export type WebRequestParam = {
  label: string,
  value: string,
  valueType: "string" | "json",
  category?: string | null;
};

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

export type Provider = {
  canonicalName: ProviderCanonicalName,
  displayName: string,
  logo: string,
  pattern: RegExp,
  transformer: (wrd: WebRequestData) => WebRequestData
};

export type ProviderCanonicalName = 'Snowplow' | 'AdobeAnalyticsAppMeasurement' | 'Nielsen' | 'Krux' | 'Rubicon' | 'GoogleAnalytics';

export type UserOptionsKey = 'skiGogglesOptions';

export type UserProviderSetting = {
    enabled: boolean,
    providerCanonicalName: ProviderCanonicalName,
    providerPattern?: RegExp
};

export type UserOptions = {
    version: number,
    providers: UserProviderSetting[]
};


export type Tab = {
  port: any
};

export type Tabs = { [key: string]: Tab }

export type Version = string;

export type GlobalState = {
    chrome: any,
    chromeOptionsKey: UserOptionsKey,
    tabs: Tabs,
    masterPattern: RegExp
};
