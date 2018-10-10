"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = exports.path = exports.isArray = void 0;

var isArray = function isArray(obj) {
  return typeof Array.isArray !== 'undefined' ? Array.isArray(obj) : Object.prototype.toString.call(obj) === '[object Array]';
};

exports.isArray = isArray;

var path = function path(paths) {
  return function (value) {
    var val = value;
    var idx = 0;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      val = val[paths[idx]];
      idx += 1;
    }

    return val;
  };
};

exports.path = path;

var identity = function identity(value) {
  return value;
};

exports.identity = identity;