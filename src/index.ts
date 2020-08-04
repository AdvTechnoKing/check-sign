declare global {
  interface URLSearchParams {
    entries(): [string, string];
  }
}
export {};
const crypto = require('crypto');

const getQueryParams = (url: string) => {
  var queryParams = {};
  var sign = '';
  let queryStrings = url.match(/\?/) ? url.split('?') : url;
  if (typeof queryStrings === 'object') {
    queryStrings = queryStrings[queryStrings.length - 1];
  }
  let urlParams = new URLSearchParams(queryStrings);
  urlParams.sort();
  const entries = urlParams.entries();
  for (const pair of entries) {
    if (pair[0].slice(0, 3) === 'vk_') {
      queryParams[pair[0]] = pair[1];
    } else if (pair[0] === 'sign') {
      sign = pair[1];
    }
  }
  return { sign, queryParams };
};

const getQueryParamsString = (queryParams: {}) => {
  return Object.keys(queryParams)
    .map((key) => key + '=' + queryParams[key])
    .join('&');
};

const chars = {
  '+': '-',
  '/': '_',
  '=': '',
};

export default ({url,key}:{url: string, key: string}) => {
  const params = getQueryParams(url);
  const paramsString = getQueryParamsString(params.queryParams);
  const rawSign = crypto.createHmac('sha256', key).update(paramsString).digest('base64');
  const sign = rawSign.replace(/\+|\/|=$/gi, (char: string) => {
    return chars[char];
  });
  return sign === params.sign;
};
