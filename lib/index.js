"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createReducer", {
  enumerable: true,
  get: function get() {
    return _reducer.createReducer;
  }
});
Object.defineProperty(exports, "shelf", {
  enumerable: true,
  get: function get() {
    return _reducer.shelf;
  }
});
exports.actions = exports.selectors = void 0;

var selectors = _interopRequireWildcard(require("./selectors"));

exports.selectors = selectors;

var actions = _interopRequireWildcard(require("./actions"));

exports.actions = actions;

var _reducer = require("./reducer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }