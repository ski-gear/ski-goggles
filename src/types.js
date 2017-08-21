// @flow

type InterceptedData = {};

export type InterceptedDataEnvelope = {|
  type: string,
  payload: {
    url: string,
    timeStamp: number,
    providerCanonicalName: string,
    providerLogo: string,
    providerDisplayName: string,
    data: InterceptedData
  }
|};

export type Provider = {|
  canonicalName: string,
  displayName: string,
  logo: string,
  pattern: RegExp,
  transformer: (InterceptedData) => InterceptedData
|};


