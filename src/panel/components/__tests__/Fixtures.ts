import { Provider, ProviderCanonicalName, FormattedWebRequestData } from "ski-providers";

import { WebRequestPayload, WebRequestPayloadSnapshot } from "../../../types/Types";
import { RawWebRequestData } from "ski-providers/dist/types/Types";

export const provider: Provider = {
  canonicalName: "Snowplow" as ProviderCanonicalName,
  displayName: "Snowplow",
  logo: "stuff-logo",
  pattern: /\s/,
  transformer: (rwrd: RawWebRequestData) => {
    return {
      meta: {
        title: ""
      },
      data: []
    }
  },
};

export const wrp: WebRequestPayload = {
  browserRequestId: "12345",
  url: "https://awesome.com?test=123",
  timeStamp: 1514790565000,
  provider,
  data: {
    meta: {
      title: "Snowplow",
    },
    data: [
      {
        label: "test",
        value: "test",
        formatting: "string",
      },
    ],
  },
};

export const wrps: WebRequestPayloadSnapshot = {
  title: "Awesome",
  browserRequestId: "12345",
  url: "https://awesome.com?test=123",
  timeStamp: 1514790565000,
  snapshotTimeStamp: 1514790565000,
  provider,
  data: {
    meta: {
      title: "stuff",
    },
    data: [
      {
        label: "test",
        value: "test",
        formatting: "string",
      },
    ],
  },
};
