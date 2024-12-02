"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _reactNative = require("react-native");
_reactNative.NativeModules.RNExternalDisplayEvent = {
  init: function init() {},
  SCREEN_INFO: {},
  addListener: function addListener() {},
  removeListener: function removeListener() {},
  getConstants: function getConstants() {
    return {
      SCREEN_INFO: {}
    };
  }
};
var _default = exports["default"] = _reactNative.View;