import {WebRequestPayload, WebRequestPayloadSnapshot} from '../../../types/Types';
import { Provider, ProviderCanonicalName, WebRequestData } from "ski-providers";

export const provider: Provider = {
  canonicalName: "Snowplow" as ProviderCanonicalName,
  displayName: "snowplow",
  logo: "stuff-logo",
  pattern: /\s/,
  transformer: (wrd: WebRequestData) => wrd,
};

export const wrp: WebRequestPayload = {
  browserRequestId: "12345",
  url: "https://awesome.com?test=123",
  timeStamp: 1514790565000,
  provider,
  data: {
    params: []
  }
};

export const wrps: WebRequestPayloadSnapshot = {
  title: "Awesome",
  browserRequestId: "12345",
  url: "https://awesome.com?test=123",
  timeStamp: 1514790565000,
  snapshottimestamp: 1514790565000,
  provider,
  data: {
    params: []
  }
};
