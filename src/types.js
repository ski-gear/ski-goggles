// @flow

export type WebRequestParams = {|
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
    data: Array<WebRequestParams>
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
  transformer: (Array<WebRequestParams>) => Array<WebRequestParams>
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