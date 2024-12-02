"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = listenEvent;
exports.getInitialScreens = void 0;
var _reactNative = require("react-native");
var _NativeRNExternalDisplayEvent = _interopRequireDefault(require("./NativeRNExternalDisplayEvent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var scale;
var EventEmitter;
function getScale() {
  if (scale == null) {
    scale = _reactNative.Platform.OS === 'ios' ? 1 : _reactNative.Dimensions.get('window').scale;
  }
  return scale;
}
function getEventEmitter() {
  if (EventEmitter == null) {
    if (_reactNative.Platform.OS === 'ios') {
      _NativeRNExternalDisplayEvent["default"].init();
      EventEmitter = new _reactNative.NativeEventEmitter(_NativeRNExternalDisplayEvent["default"]);
    } else {
      EventEmitter = _reactNative.DeviceEventEmitter;
    }
  }
  return EventEmitter;
}
var handleScreensChange = function handleScreensChange(info) {
  var currentScale = getScale();
  return Object.entries(info).reduce(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      screenId = _ref2[0],
      screen = _ref2[1];
    result[screenId] = _objectSpread(_objectSpread({}, screen), {}, {
      width: screen.width / currentScale,
      height: screen.height / currentScale
    });
    return result;
  }, {});
};
var getInitialScreens = exports.getInitialScreens = function getInitialScreens() {
  if (!_NativeRNExternalDisplayEvent["default"]) {
    return {};
  }
  return handleScreensChange(_NativeRNExternalDisplayEvent["default"].SCREEN_INFO);
};
function listenEvent(_ref3) {
  var onScreenConnect = _ref3.onScreenConnect,
    onScreenChange = _ref3.onScreenChange,
    onScreenDisconnect = _ref3.onScreenDisconnect;
  var emitter = getEventEmitter();
  var connect = emitter.addListener('@RNExternalDisplay_screenDidConnect', function (info) {
    return onScreenConnect(handleScreensChange(info));
  });
  var change = emitter.addListener('@RNExternalDisplay_screenDidChange', function (info) {
    return onScreenChange(handleScreensChange(info));
  });
  var disconnect = emitter.addListener('@RNExternalDisplay_screenDidDisconnect', function (info) {
    return onScreenDisconnect(handleScreensChange(info));
  });
  return {
    connect: connect,
    change: change,
    disconnect: disconnect
  };
}

////////////////////////////////////////
/*
if (Platform.OS === 'ios') {
  RNExternalDisplayEvent.init()

  scale = 1
  EventEmitter = new NativeEventEmitter(RNExternalDisplayEvent)
} else {
  ; ({ scale } = Dimensions.get('window'))
  EventEmitter = DeviceEventEmitter
}

const handleScreensChange = info =>
  Object.entries(info).reduce((result, [screenId, screen]) => {
    result[screenId] = {
      ...screen,
      width: screen.width / scale,
      height: screen.height / scale,
    }
    return result
  }, {})

export const getInitialScreens = () => {
  let info
  if (Platform.OS === 'android') {
    info = RNExternalDisplayEvent.getInitialScreens?.().SCREEN_INFO
  }
  if (
    Platform.OS === 'ios' ||
    !info // Old architecture fallback on Android
  ) {
    info = RNExternalDisplayEvent.SCREEN_INFO
  }
  if (!info) throw new Error('No initial screen info found')
  return handleScreensChange(info)
}

export default function listenEvent({
  onScreenConnect,
  onScreenChange,
  onScreenDisconnect,
}) {
  const connect = EventEmitter.addListener(
    '@RNExternalDisplay_screenDidConnect',
    info => onScreenConnect(handleScreensChange(info)),
  )

  const change = EventEmitter.addListener(
    '@RNExternalDisplay_screenDidChange',
    info => onScreenChange(handleScreensChange(info)),
  )

  const disconnect = EventEmitter.addListener(
    '@RNExternalDisplay_screenDidDisconnect',
    info => onScreenDisconnect(handleScreensChange(info)),
  )

  return {
    connect,
    change,
    disconnect,
  }
    
}
  */