import { SkiProviders, Provider } from "ski-providers";
import { values, map } from "ramda";
import { UserOptionsVersion } from "../versions";
import { UserOptions } from "src/types/Types";

export const defaultOptions = (): UserOptions => {
  return {
    version: UserOptionsVersion,
    providers: map((p: Provider) => {
      return {
        enabled: true,
        providerCanonicalName: p.canonicalName,
        providerPattern: p.pattern,
      };
    }, values(SkiProviders)),
  };
};
