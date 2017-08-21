// @flow

import * as Providers from '../providers';
import { map, join, path, values } from 'ramda';
import type { InterceptedDataEnvelope } from '../types.js';
import moment from 'moment';
import { parse } from '../parser.js';

const onInit = (chrome: any, details: any) => {
  console.debug(details);
  console.debug('eventPage onInit');
  initPrefs(chrome);
};

const initPrefs = (chrome: any) => {
  const prefs = {
    test: 'value'
  };

  chrome.storage.local.set({"skiGoggles": prefs}, () => {
    if (!!chrome.runtime.lastError) {
      console.error("Error setting prefs: ", chrome.runtime.lastError);
    }
  });

  // force a (re)load of prefs, now that they may have changed
  loadPrefsFromStorage(chrome, prefs);
};

const loadPrefsFromStorage = (chrome: any, prefs: any) => {
  chrome.storage.local.get("skiGoggles", prefData => {
    prefs = prefData.skiGoggles;
    console.debug('prefs:', prefData);
  });
};

const getCurrentPattern = (prefSet: any) => {
  let patterns = [];
  const providerPatterns = [/sp\.eventus\-test/];
  patterns = providerPatterns;

  return new RegExp(patterns.join("|")).source;
};

const beforeRequestCallback = (getTabs: any, getMasterPattern: any, details: any) => {
  let tabs = getTabs();
  let masterPattern = getMasterPattern();

  if (!(details.tabId in tabs)) {
    return;
  }

  if(matchesBroadly(details.url, masterPattern)) {
    let url: string = details.url;
    let timeStamp: number = moment().format('x');
    let data = parse(url);

    let eventData: InterceptedDataEnvelope = {
      type: 'webRequest',
      payload: {
        url: url,
        providerDisplayName: 'Snowplow',
        providerCanonicalName: 'Snowplow',
        providerLogo: 'snowplow.png',
        timeStamp: timeStamp,
        data: data
      }
    }

    sendToAllDevTools(tabs, eventData);
  }
};

const matchesBroadly = (url: string, regexPattern: RegExp): bool => {
  return !!(url.match(regexPattern));
};

const generateMasterPattern = () => {
  let pattern = join(
    '|',
    map(
      path(['pattern', 'source']),
      values(Providers)
    )
  );

  return new RegExp(pattern);
};

const getTabId = (port: any) : string => {
  return port.name.substring(port.name.indexOf("-") + 1);
};

const sendToDevToolsForTab = (tabs: any, tabId: any , object: any) => {
  console.debug("sending ", object.type, " message to tabId: ", tabId, ": ", object);
  try {
    tabs[tabId].port.postMessage(object);
  } catch (ex) {
    console.error("error calling postMessage: ", ex.message);
  }
};

const sendToAllDevTools = (tabs: any, object: any) => {
  Object.keys(tabs).forEach(tabId => {
    sendToDevToolsForTab(tabs, tabId, object);
  });
};

export {
  onInit,
  getCurrentPattern,
  beforeRequestCallback,
  getTabId,
  sendToAllDevTools,
  sendToDevToolsForTab,
  loadPrefsFromStorage,
  generateMasterPattern,
  matchesBroadly
}
