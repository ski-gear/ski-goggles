import * as querystring from "querystring";
import { defaultTo, map, toPairs } from "ramda";
import { parse as UrlParse } from "url";

export const parse = (url: string): object => {
  const parsed = UrlParse(url);
  const parsedQuery = defaultTo("", parsed.query) as string;
  return querystring.parse(parsedQuery);
};
