import { Delta, DiffPatcher } from "jsondiffpatch";
import { format as HtmlFormat } from "jsondiffpatch/src/formatters/html";
import { DiffData, RunTimeMessage, RunTimeMessageSubject } from "../types/Types";

const Differ = new DiffPatcher();

export const SendRuntimeMessage = (chromeId: string, subject: RunTimeMessageSubject, payload: any): void => {
  const msg: RunTimeMessage = { subject, payload };
  chrome.runtime.sendMessage(chromeId, msg);
};

export const generateDiff = (current: {}, snapshot: {}): DiffData => {
  const delta = Differ.diff(current, snapshot);
  if (delta) {
    return {
      formatted: HtmlFormat(delta, undefined),
      raw: delta,
    };
  } else {
    return {
      formatted: undefined,
      raw: undefined,
    };
  }
};

export const generateImageUrl = (fragment: string): string => {
  return "images/providers/" + fragment;
};
