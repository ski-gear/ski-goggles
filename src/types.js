// @flow

type InterceptedData = {};

export type InterceptedDataEnvelope = {|
  type: string,
  payload: {
    url: string,
    timeStamp: number,
    data: InterceptedData
  }
|};

export type Provider = {|
  canonicalName: string,
  logo: string,
  pattern: RegExp,
  transformer: (InterceptedData) => InterceptedData
|};


