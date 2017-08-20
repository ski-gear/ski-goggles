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
