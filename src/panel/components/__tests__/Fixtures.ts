import {
  FormattedWebRequestData,
  Provider,
  ProviderCanonicalName,
} from "ski-vendors";

import { RawWebRequestData } from "ski-vendors/dist/types/Types";
import {
  WebRequestPayload,
  WebRequestPayloadSnapshot,
} from "../../../types/Types";

export const provider: Provider = {
  canonicalName: "Snowplow" as ProviderCanonicalName,
  displayName: "Snowplow",
  logo: "stuff-logo",
  pattern: /\s/,
  transformer: (rwrd: RawWebRequestData) => {
    return [
      {
        data: [],
        meta: {
          title: "",
        },
      },
    ];
  },
};

export const wrp: WebRequestPayload = {
  browserRequestId: "12345",
  data: {
    data: [
      {
        formatting: "string",
        label: "test",
        value: "test",
      },
    ],
    meta: {
      title: "Snowplow",
    },
  },
  provider,
  timeStamp: 1514790565000,
  url: "https://awesome.com?test=123",
};

export const wrps: WebRequestPayloadSnapshot = {
  browserRequestId: "12345",
  data: {
    data: [
      {
        formatting: "string",
        label: "test",
        value: "test",
      },
    ],
    meta: {
      title: "stuff",
    },
  },
  provider,
  snapshotTimeStamp: 1514790565000,
  timeStamp: 1514790565000,
  title: "Awesome",
  url: "https://awesome.com?test=123",
};
