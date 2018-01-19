import { contains, map, values } from "ramda";
import { Provider, SkiProviders } from "ski-providers";

import { PreferredProviders } from "../Constants";
import { UserOptions, UserProviderSetting } from "../types/Types";
import { UserOptionsVersion } from "../Versions";

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
