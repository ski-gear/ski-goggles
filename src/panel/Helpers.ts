import { RunTimeMessage, RunTimeMessageSubject } from "../types/Types";

export const SendRuntimeMessage = (chromeId: string, subject: RunTimeMessageSubject, payload: any): void => {
  const msg: RunTimeMessage = { subject, payload };
  chrome.runtime.sendMessage(chromeId, msg);
};
