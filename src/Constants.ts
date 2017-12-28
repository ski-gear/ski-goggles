import { RunTimeMessage, RunTimeMessageSubject, PostMessageType } from "./types/Types";
import { ProviderCanonicalName } from "ski-providers";

export const GIT_ISSUES_URL: string = "https://github.com/ski-gear/ski-goggles/issues";
export const OPEN_OPTIONS_TAB: RunTimeMessageSubject = "open-options-tab";
export const OPEN_ISSUES_PAGE: RunTimeMessageSubject = "open-issues-page";
export const SAVE_SNAPSHOT: RunTimeMessageSubject = "save-snapshot";
export const MaxRequestsDisplayed = 30;
export const PreferredProviders: ProviderCanonicalName[] = ["Snowplow"];

export const NewWebRequestPostMessage: PostMessageType = "newWebRequest";
export const NewSnapshotPostMessage: PostMessageType = "newSnapshot";
export const ChromeIdPostMessage: PostMessageType = "chromeId";
