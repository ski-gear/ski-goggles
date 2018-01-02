import { SkiProviders, Provider, SkiProviderHelpers, ProviderCanonicalName } from "ski-providers";
import { values, map, contains } from "ramda";
import { UserOptionsVersion } from "../Versions";
import { UserOptions, UserProviderSetting } from "../types/Types";
import { PreferredProviders } from "../Constants";

export const DefaultOptions = (): UserOptions => {
  return {
    version: UserOptionsVersion,
    providers: preferredProviders(),
  };
};

const preferredProviders = (): UserProviderSetting[] => {
  return map((p: Provider) => {
    return {
      enabled: contains(p.canonicalName, PreferredProviders),
      providerCanonicalName: p.canonicalName,
      providerPattern: p.pattern,
    };
  }, values(SkiProviders));
};
