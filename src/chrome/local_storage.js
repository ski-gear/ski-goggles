import { defaultTo, assoc } from 'ramda';

export const getOptions = (chrome: any, key: string): Promise => {
    return new Promise((resolve, _reject) => {
        chrome.storage.sync.get(key, (data) => {
            resolve(defaultTo({}, data[key]));
        });
    });
};

export const setOptions = (chrome: any, key: string, val: string): Promise => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.set(assoc(key, val, {}), (_data) => {
            if (chrome.runtime.lastError) {
                reject(`Could not save ${key} to local storage.`);
            } else {
                resolve(true);
            }
        });
    });
};
