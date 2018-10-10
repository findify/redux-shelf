"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeParams = exports.get = exports.getItem = exports.getList = exports.hasError = exports.isFetching = void 0;

var _reselect = require("reselect");

var _actions = require("./actions");

var _helpers = require("./helpers");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _statuses = _slicedToArray(_actions.statuses, 3),
    start = _statuses[0],
    success = _statuses[1],
    error = _statuses[2];

var getStatus = function getStatus(name) {
  return function (s) {
    return s.shelf[name] && s.shelf[name].status;
  };
};

var isFetching = function isFetching(action) {
  var name = action.toString();
  return (0, _reselect.createSelector)(getStatus(name), function (status) {
    return status === start;
  });
};

exports.isFetching = isFetching;

var hasError = function hasError(action) {
  var name = action.toString();
  return (0, _reselect.createSelector)(getStatus(name), function (status) {
    return status && status === error;
  });
};

exports.hasError = hasError;

var getList = function getList(reducerName) {
  return (0, _reselect.createSelector)(function (s) {
    return s[reducerName].entities;
  }, function (list) {
    return list;
  });
};

exports.getList = getList;

var getItem = function getItem(reducerName) {
  var _reducerName$split = reducerName.split('.'),
      _reducerName$split2 = _slicedToArray(_reducerName$split, 2),
      name = _reducerName$split2[0],
      field = _reducerName$split2[1];

  return (0, _reselect.createSelector)(function (s) {
    return s[name][field || 'entity'];
  }, function (item) {
    return item;
  });
};

exports.getItem = getItem;

var get = function get() {
  for (var _len = arguments.length, deep = new Array(_len), _key = 0; _key < _len; _key++) {
    deep[_key] = arguments[_key];
  }

  return (0, _reselect.createSelector)((0, _helpers.path)(deep), _helpers.identity);
};

exports.get = get;
var routeParams = (0, _reselect.createSelector)(function (s) {
  return s.match && s.match.params;
}, function (params) {
  return params;
});
exports.routeParams = routeParams;