import * as moment from "moment";
import { curry, filter, keys, map } from "ramda";
import { SkiProviderHelpers as ProviderHelpers } from "ski-providers";
import { ProviderCanonicalName } from "ski-providers/dist/types/Types";

import { DefaultOptions } from "../helpers/Options";
import { parse } from "../Parser";
import {
  GlobalState,
  MessageEnvelope,
  Port,
  UserOptions,
  UserProviderSetting,
  WebRequestMessageEnvelope,
} from "../types/Types";
import { getOptions, setOptions } from "./LocalStorage";

export const onInstall = curry((state: GlobalState, _details: any): void => {
  const defaults = DefaultOptions();
  setOptions(state.userOptionsKey, defaults).then(_data => {
    refreshMasterPattern(state);
  });
});

export const processWebRequest = curry((state: GlobalState, details: any): void => {
  if (!(details.tabId in state.tabs)) {
    return;
  }
  if (ProviderHelpers.matchesBroadly(details.url, state.masterPattern)) {
    let url: string = details.url;
    let tabId: string = details.tabId;
    let httpMethod: string = details.method;
    let browserRequestId: string = details.requestId;
    let requestBody: object = details.requestBody;

    let timeStamp: number = parseInt(moment().format("x"));
    let data = parse(url);
    let provider = ProviderHelpers.lookupByUrl(url);

    if (provider) {
      let eventData: WebRequestMessageEnvelope = {
        type: "webRequest",
        payload: {
          browserRequestId,
          url,
          timeStamp,
          provider: provider,
          data: provider.transformer({ 
            meta: {
              requestUrl: url
            },
            params: data
          }),
        },
      };
      sendToSkiGoggles(state, tabId, eventData);
    }
  }
});

export const refreshMasterPattern = (state: GlobalState) => {
  console.debug("Recreating masterpattern");
  getOptions(state.userOptionsKey, true).then((opts: UserOptions) => {
    const upss = opts.providers;
    state.masterPattern = ProviderHelpers.generateMasterPattern(enabledProvidersFromOptions(upss));
    console.log(state.masterPattern);
  });
};

export const onConnectCallBack = curry((state: GlobalState, port: Port): void => {
  if (port.name.indexOf("skig-") !== 0) return;
  console.debug(`Registered port: ${port.name}`);

  const tabId = getTabId(port);
  state.tabs[tabId] = {
    port: port,
  };

  // Remove port when destroyed (e.g. when devtools instance is closed)
  port.onDisconnect.addListener(port => {
    console.debug(`Disconnecting port ${port.name}`);
    delete state.tabs[getTabId(port)];
  });

  // logs messages from the port (in the background page's console!)
  port.onMessage.addListener(msg => {
    console.debug(`Message from port[${tabId}]: `, msg);
  });
});

export const broadcastToAllTabs = (state: GlobalState, envelope: MessageEnvelope): void => {
  map((tabId: string) => {
    sendToSkiGoggles(state, tabId, envelope);
  }, keys(state.tabs));
};

const getTabId = (port: Port): string => {
  return port.name.substring(port.name.indexOf("-") + 1);
};

const sendToSkiGoggles = (state: GlobalState, tabId: string, envelope: MessageEnvelope): void => {
  console.debug("sending ", envelope.type, " message to tabId: ", tabId, ": ", envelope);
  try {
    state.tabs[tabId].port.postMessage(envelope);
  } catch (ex) {
    console.error("error calling postMessage: ", ex.message);
  }
};

const enabledProvidersFromOptions = (opts: UserProviderSetting[]): ProviderCanonicalName[] => {
  const enabled = filter((ups: UserProviderSetting) => ups.enabled, opts);
  return map((ups: UserProviderSetting) => ups.providerCanonicalName, enabled);
};
