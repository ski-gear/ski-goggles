import { RunTimeMessage, RunTimeMessageSubject } from "../types/Types";
import { WebRequestData } from "ski-providers";
import { DiffPatcher, Delta } from "jsondiffpatch";
import { format as HtmlFormat } from "jsondiffpatch/src/formatters/html";

const Differ = new DiffPatcher;

export const SendRuntimeMessage = (chromeId: string, subject: RunTimeMessageSubject, payload: any): void => {
  const msg: RunTimeMessage = { subject, payload };
  chrome.runtime.sendMessage(chromeId, msg);
};

export const generateDiff = (current: {}, snapshot: {}): string | undefined => {
  console.log(current, snapshot);
  const delta = Differ.diff(current, snapshot);
  if(delta){
    return HtmlFormat(delta, undefined);
  }
}
