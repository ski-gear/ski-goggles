import * as querystring from 'querystring';
import { defaultTo, map, toPairs } from 'ramda';
import { WebRequestParam } from 'ski-providers';
import { parse as UrlParse } from 'url';

export const parse = (url: string): WebRequestParam[] => {
  const parsed = UrlParse(url);
  const parsedQuery = defaultTo("", parsed.query) as string;
  return map(createWebRequestParam, toPairs(querystring.parse(parsedQuery)));
};

const createWebRequestParam = (tuple: [string, string]): WebRequestParam => {
  return { label: tuple[0], value: tuple[1], valueType: "string" };
};
