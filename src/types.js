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
  valueType: "string" | "json"
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
  canonicalName: string,
  displayName: string,
  logo: string,
  pattern: RegExp,
  transformer: (WebRequestData) => WebRequestData
|};

export type Tab = {|
  port: any,
  loading: boolean
|};

export type Tabs = { [string]: Tab }

export type ProviderStat = {
  logo: string,
  canonicalName: string,
  value: number
};