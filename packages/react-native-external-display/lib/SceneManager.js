"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _NativeRNExternalDisplayEvent = _interopRequireDefault(require("./NativeRNExternalDisplayEvent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var sceneTypes = {
  EXTERNAL_DISPLAY: '@RNExternalDisplay_externalDisplay',
  CREATED_SCENE: '@RNExternalDisplay_createdScene'
};
var _default = exports["default"] = {
  types: sceneTypes,
  isAvailable: function isAvailable() {
    return !!_NativeRNExternalDisplayEvent["default"].SUPPORT_MULTIPLE_SCENES;
  },
  requestScene: function requestScene(options) {
    var _RNExternalDisplayEve;
    return (_RNExternalDisplayEve = _NativeRNExternalDisplayEvent["default"].requestScene) === null || _RNExternalDisplayEve === void 0 ? void 0 : _RNExternalDisplayEve.call(_NativeRNExternalDisplayEvent["default"], options);
  },
  closeScene: function closeScene(sceneId) {
    var _RNExternalDisplayEve2;
    return (_RNExternalDisplayEve2 = _NativeRNExternalDisplayEvent["default"].closeScene) === null || _RNExternalDisplayEve2 === void 0 ? void 0 : _RNExternalDisplayEve2.call(_NativeRNExternalDisplayEvent["default"], sceneId);
  },
  isMainSceneActive: function isMainSceneActive() {
    var _RNExternalDisplayEve3;
    return (_RNExternalDisplayEve3 = _NativeRNExternalDisplayEvent["default"].isMainSceneActive) === null || _RNExternalDisplayEve3 === void 0 ? void 0 : _RNExternalDisplayEve3.call(_NativeRNExternalDisplayEvent["default"]);
  },
  resumeMainScene: function resumeMainScene() {
    var _RNExternalDisplayEve4;
    return (_RNExternalDisplayEve4 = _NativeRNExternalDisplayEvent["default"].resumeMainScene) === null || _RNExternalDisplayEve4 === void 0 ? void 0 : _RNExternalDisplayEve4.call(_NativeRNExternalDisplayEvent["default"]);
  }
};