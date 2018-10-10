"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shelf = exports.createReducer = void 0;

var _reduxActions = require("redux-actions");

var _helpers = require("./helpers");

var _actions = require("./actions");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var applyState = function applyState(s, _ref) {
  var payload = _ref.payload;
  return _objectSpread({}, s, payload);
};

var emptyObject = {};
var emptyArray = {};

var createReducer = function createReducer(actions) {
  var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : emptyObject;
  var initialState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : emptyObject;
  return (0, _reduxActions.handleActions)(_objectSpread({}, actions && _defineProperty({}, _reduxActions.combineActions.apply(void 0, _toConsumableArray((0, _helpers.isArray)(actions) ? actions : Object.keys(actions).map(function (k) {
    return actions[k];
  }))), applyState), reducer), initialState);
};

exports.createReducer = createReducer;

var shelf = function shelf() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref3.type,
      meta = _ref3.meta,
      payload = _ref3.payload;

  if (!type.includes(_actions.PREFIX)) return state;
  return _objectSpread({}, state, _defineProperty({}, meta.name, _objectSpread({}, meta, {
    payload: payload
  })));
};

exports.shelf = shelf;