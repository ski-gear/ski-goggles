const URL = require('url');
import querystring from 'querystring';

const parse = (url) => {
  const parsed = new URL.parse(url);
  return querystring.parse(parsed.query);
};

export { parse };
