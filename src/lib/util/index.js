export const getMsgsToArray = (messages) => {
  if (messages) return messages.split('|');
  return [];
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
}

export const getQueryStringFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  const paramsObject = {};
  params.forEach((value, key) => {
    try {
      paramsObject[key] = JSON.parse(value);
    } catch (e) {
      paramsObject[key] = value;
    }
  });
  return paramsObject;
};

export const createQueryStringForURL = (url, params = {}) => {
  let urlStr = url;
  Object.entries(params).forEach(([key, value]) => {
    let queryStrValue = value;
    if (value && (isObject(value) || Array.isArray(value))) queryStrValue = JSON.stringify(value);
    if (urlStr.includes('?')) urlStr += `&${key}=${queryStrValue}`;
    else urlStr += `?${key}=${queryStrValue}`;
  });
  return urlStr;
};