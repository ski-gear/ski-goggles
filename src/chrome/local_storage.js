import { defaultTo } from 'ramda';

export const getOptions = (chrome: any, key: string): Promise => {
    return new Promise((resolve, _reject) => {
        chrome.storage.local.get(key, (data) => {
            resolve(defaultTo(data, []));
        });
    });
};

export const setOptions = (chrome: any, key: string, val: string): Promise => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ key: val }, (data) => {
            if (chrome.runtime.lastError) {
                reject(`Could not save ${key} to local storage.`);
            } else {
                resolve(true);
            }
        });
    });
};
