import { defaultTo, assoc } from "ramda";

export const getOptions = (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, data => {
      resolve(defaultTo({}, data[key]));
    });
  });
};

export const setOptions = (key: string, val: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(assoc(key, val, {}), () => {
      if (chrome.runtime.lastError) {
        reject(`Could not save ${key} to local storage.`);
      } else {
        resolve(true);
      }
    });
  });
};
