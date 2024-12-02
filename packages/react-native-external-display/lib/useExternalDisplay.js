"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExternalDisplay = void 0;
var _react = require("react");
var _screens = require("./screens");
var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));
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
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; } /**
 * @format
 * 
 */
var useExternalDisplay = exports.useExternalDisplay = function useExternalDisplay() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _onScreenConnect = _ref.onScreenConnect,
    _onScreenChange = _ref.onScreenChange,
    _onScreenDisconnect = _ref.onScreenDisconnect;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    screens = _useState2[0],
    setScreens = _useState2[1];
  (0, _react.useEffect)(function () {
    var _listenEvent = (0, _EventEmitter["default"])({
        onScreenConnect: function onScreenConnect(info) {
          console.log('onScreenConnect event received:', info);
          setScreens(_objectSpread({}, info));
          if (_onScreenConnect) _onScreenConnect(info);
        },
        onScreenChange: function onScreenChange(info) {
          console.log('onScreenChange event received:', info);
          setScreens(_objectSpread({}, info));
          if (_onScreenChange) _onScreenChange(info);
        },
        onScreenDisconnect: function onScreenDisconnect(info) {
          console.log('onScreenDisconnect event received:', info);
          setScreens(_objectSpread({}, info));
          if (_onScreenDisconnect) _onScreenDisconnect(info);
        }
      }),
      connect = _listenEvent.connect,
      change = _listenEvent.change,
      disconnect = _listenEvent.disconnect;

    // Fetch initial screens after event listeners are set up
    var initialScreens = (0, _screens.getScreens)();
    console.log('Initial screens:', initialScreens);
    setScreens(_objectSpread({}, initialScreens));
    return function () {
      connect.remove();
      change.remove();
      disconnect.remove();
    };
  }, []);
  return screens;
};

//////////////
/*
export const useExternalDisplay = ({
  onScreenConnect,
  onScreenChange,
  onScreenDisconnect,
}?: ExternalDisplayOptions = {}) => {
  const [screens, setScreens] = useState(getScreens())

  useEffect(() => {
    const { connect, change, disconnect } = listenEvent({
      onScreenConnect: info => {
        setScreens(info)
        if (onScreenConnect) onScreenConnect(info)
      },
      onScreenChange: info => {
        setScreens(info)
        if (onScreenChange) onScreenChange(info)
      },
      onScreenDisconnect: info => {
        setScreens(info)
        if (onScreenDisconnect) onScreenDisconnect(info)
      },
    })
    return () => {
      connect.remove()
      change.remove()
      disconnect.remove()
    }
  }, [])

  return screens
}
*/