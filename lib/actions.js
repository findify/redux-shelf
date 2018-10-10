"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.success = exports.create = exports.statuses = exports.PREFIX = void 0;

var _reduxActions = require("redux-actions");

var _nanoid = _interopRequireDefault(require("nanoid"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PREFIX = '@@shelf';
exports.PREFIX = PREFIX;
var statuses = ['START', 'SUCCESS', 'ERROR'];
exports.statuses = statuses;

var getType = function getType(status) {
  return function (name) {
    return "".concat(PREFIX, "/").concat(status, " -> ").concat(name.toString());
  };
};

var createApiAction = function createApiAction(name, status) {
  return (0, _reduxActions.createAction)(getType(status)(name), _helpers.identity, function (_, request) {
    return {
      name: name,
      status: status,
      request: request,
      time: new Date().getTime()
    };
  });
};

var defaultMapper = function defaultMapper(data) {
  return (0, _helpers.isArray)(data) ? {
    entities: data
  } : {
    entity: data
  };
};

var metaMapper = function metaMapper(_, request) {
  return request;
};

var create = function create(actionName, callback) {
  var responseMapper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultMapper;

  var _name = "[".concat((0, _nanoid.default)(3), "]").concat(actionName);

  var action = (0, _reduxActions.createAction)(_name, responseMapper, metaMapper);

  var _statuses$map = statuses.map(function (status) {
    return createApiAction(_name, status);
  }),
      _statuses$map2 = _slicedToArray(_statuses$map, 3),
      start = _statuses$map2[0],
      success = _statuses$map2[1],
      error = _statuses$map2[2];

  var apiAction = function apiAction() {
    for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return function (dispatch) {
      var result = callback.apply(void 0, params);
      if (!result.then) return result;
      dispatch(start());
      return result.then(function (res) {
        dispatch(success.apply(void 0, [res].concat(params)));
        dispatch(action.apply(void 0, [res].concat(params)));
        return res;
      }).catch(function (error) {
        return dispatch(error.apply(void 0, [error].concat(params)));
      });
    };
  };

  apiAction.toString = function () {
    return _name;
  };

  return apiAction;
};

exports.create = create;
var success = getType(statuses[1]);
exports.success = success;
var error = getType(statuses[2]);
exports.error = error;