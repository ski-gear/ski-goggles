import { defaultTo, assoc } from "ramda";

export const getOptions = (key: string, sync: boolean = false): Promise<any> => {
  const storage = sync ? chrome.storage.sync : chrome.storage.local;

  return new Promise((resolve, reject) => {
    storage.get(key, data => {
      resolve(defaultTo({}, data[key]));
    });
  });
};

export const setOptions = (key: string, val: any, sync: boolean = false): Promise<boolean> => {
  const storage = sync ? chrome.storage.sync : chrome.storage.local;

  return new Promise((resolve, reject) => {
    storage.set(assoc(key, val, {}), () => {
      if (chrome.runtime.lastError) {
        reject(`Could not save ${key} to local storage.`);
      } else {
        resolve(true);
      }
    });
  });
};
