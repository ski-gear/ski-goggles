import { toPairs, map, defaultTo } from "ramda";
import * as querystring from "querystring";
import { parse as UrlParse } from 'url';
import { WebRequestParam } from "ski-providers";

export const parse = (url: string): WebRequestParam[] => {
  const parsed = UrlParse(url);
  const parsedQuery = defaultTo("", parsed.query) as string;
  return map(createWebRequestParam, toPairs(querystring.parse(parsedQuery)));
};

const createWebRequestParam = (tuple: [string, string]): WebRequestParam => {
  return { label: tuple[0], value: tuple[1], valueType: "string" };
};
