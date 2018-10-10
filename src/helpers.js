export const isArray = obj => typeof Array.isArray !== 'undefined'
  ? Array.isArray(obj)
  : Object.prototype.toString.call(obj) === '[object Array]';

export const path = paths => value => {
  let val = value;
  let idx = 0;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    val = val[paths[idx]];
    idx += 1;
  }
  return val;
};

export const identity = value => value;
