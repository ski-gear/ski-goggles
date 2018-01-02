import { RunTimeMessage, RunTimeMessageSubject, DiffData } from "../types/Types";
import { WebRequestData } from "ski-providers";
import { DiffPatcher, Delta } from "jsondiffpatch";
import { format as HtmlFormat } from "jsondiffpatch/src/formatters/html";

const Differ = new DiffPatcher;

export const SendRuntimeMessage = (chromeId: string, subject: RunTimeMessageSubject, payload: any): void => {
  const msg: RunTimeMessage = { subject, payload };
  chrome.runtime.sendMessage(chromeId, msg);
};

export const generateDiff = (current: {}, snapshot: {}): DiffData => {
  const delta = Differ.diff(current, snapshot);
  if(delta){
    return {
      raw: delta,
      formatted: HtmlFormat(delta, undefined)
    }
  }
  else {
    return {
      raw: undefined,
      formatted: undefined
    }
  }
}

export const generateImageUrl = (fragment: string): string => {
  return 'images/providers/' + fragment;
}
