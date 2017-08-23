// @flow

export type InterceptedDatum = {|
  label: string,
  value: string,
  valueType: "string" | "json"
|};

export type InterceptedDataEnvelope = {|
  type: string,
  payload: {
    url: string,
    timeStamp: number,
    providerCanonicalName: string,
    providerLogo: string,
    providerDisplayName: string,
    data: Array<InterceptedDatum>
  }
|};

export type Provider = {|
  canonicalName: string,
  displayName: string,
  logo: string,
  pattern: RegExp,
  transformer: (Array<InterceptedDatum>) => Array<InterceptedDatum>
|};
