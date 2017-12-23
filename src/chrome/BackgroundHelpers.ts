import { curry, map, prop, filter } from "ramda";
import { WebRequestEnvelope, GlobalState, UserProviderSetting, UserOptions, Port } from "../types/Types";
import * as moment from "moment";
import { parse } from "../Parser";
import { SkiProviderHelpers as ProviderHelpers } from "ski-providers";
import { defaultOptions } from "../options/Helpers";
import { setOptions, getOptions } from "./LocalStorage";
import { ProviderCanonicalName } from "ski-providers/dist/types/Types";
import { DefaultUserProviderSettings } from "./../options/Reducers";

export const onInstall = curry((state: GlobalState, _details: any): void => {
  const defaults = defaultOptions();
  setOptions(state.chromeOptionsKey, defaults).then(_data => {
    console.log("Initial Defaults set");
    refreshMasterPattern(state);
  });
});

export const processWebRequest = curry((state: GlobalState, details: any): void => {
  if (!(details.tabId in state.tabs)) {
    return;
  }
  console.log(details.url, state.masterPattern);
  if (ProviderHelpers.matchesBroadly(details.url, state.masterPattern)) {
    console.log("yes");
    console.log(details);
    let url: string = details.url;
    let tabId: string = details.tabId;
    let browserRequestId: string = details.requestId;
    let timeStamp: number = parseInt(moment().format("x"));
    let data = parse(url);
    let provider = ProviderHelpers.lookupByUrl(url);

    if (provider) {
      let eventData: WebRequestEnvelope = {
        type: "webRequest",
        payload: {
          browserRequestId, 
          url,
          timeStamp,
          providerDisplayName: provider.displayName,
          providerCanonicalName: provider.canonicalName,
          providerLogo: provider.logo,
          data: provider.transformer({ params: data }),
        },
      };
      sendToSkiGoggles(state, tabId, eventData);
    }
  }
});

export const refreshMasterPattern = (state: GlobalState) => {
  console.debug("Recreating masterpattern");
  getOptions(state.chromeOptionsKey).then((opts: UserOptions) => {
    const upss = opts.providers;
    state.masterPattern = ProviderHelpers.generateMasterPattern(enabledProvidersFromOptions(upss));
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

const getTabId = (port: Port): string => {
  return port.name.substring(port.name.indexOf("-") + 1);
};

const sendToSkiGoggles = (state: GlobalState, tabId: string, object: any) => {
  console.debug("sending ", object.type, " message to tabId: ", tabId, ": ", object);
  try {
    state.tabs[tabId].port.postMessage(object);
  } catch (ex) {
    console.error("error calling postMessage: ", ex.message);
  }
};

const enabledProvidersFromOptions = (opts: UserProviderSetting[]): ProviderCanonicalName[] => {
  const enabled = filter((ups: UserProviderSetting) => ups.enabled, opts);
  return map((ups: UserProviderSetting) => ups.providerCanonicalName, enabled);
};
