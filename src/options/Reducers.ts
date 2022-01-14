import { assoc, map } from "ramda";
import { combineReducers } from "redux";
import { ProviderCanonicalName } from "ski-vendors";

import { DefaultOptions } from "../helpers/Options";
import { UserProviderSetting } from "./../types/Types";
import { Action, DisableProvider, EnableProvider } from "./Actions";
import { DISABLE_PROVIDER, ENABLE_PROVIDER, RESET_ALL_PROVIDER_OPTIONS } from "./Actions";

type UserProviderSettings = UserProviderSetting[];

const DefaultUserProviderSettings = (): UserProviderSettings => DefaultOptions().providers;

const toggleProvider = (
  ups: UserProviderSettings,
  provider: ProviderCanonicalName,
  state: boolean,
): UserProviderSettings => {
  return map(up => {
    if (up.providerCanonicalName === provider) {
      return assoc("enabled", state, up);
    } else {
      return up;
    }
  }, ups);
};

const providers = (
  state: UserProviderSettings = DefaultUserProviderSettings(),
  action: Action,
): UserProviderSettings => {
  switch (action.type) {
    case RESET_ALL_PROVIDER_OPTIONS:
      return DefaultUserProviderSettings();
    case ENABLE_PROVIDER:
      const eAction = action as EnableProvider;
      return toggleProvider(state, eAction.provider, true);
    case DISABLE_PROVIDER:
      const dAction = action as DisableProvider;
      return toggleProvider(state, dAction.provider, false);
    default:
      return state;
  }
};

export const options = combineReducers({
  providers,
});
