import { Action, EnableProvider, DisableProvider } from "./Actions";
import { UserProviderSetting, ProviderCanonicalName } from "./../types/Types";

import { SkiProviders as Providers } from "ski-providers";
import { combineReducers } from "redux";
import { values, map, assoc } from "ramda";
import { RESET_ALL_PROVIDER_OPTIONS, ENABLE_PROVIDER, DISABLE_PROVIDER } from "./Actions";

type UserProviderSettings = UserProviderSetting[];

export const DefaultUserProviderSettings = (): UserProviderSettings => {
  return map(p => ({ providerCanonicalName: p.canonicalName, enabled: true }), values(Providers));
};

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
      const eAction = action as EnableProvider
      return toggleProvider(state, eAction.provider, true);
    case DISABLE_PROVIDER:
      const dAction = action as DisableProvider
      return toggleProvider(state, dAction.provider, false);
    default:
      return state;
  }
};

export const options = combineReducers({
  providers,
});
