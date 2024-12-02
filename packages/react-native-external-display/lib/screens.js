"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScreens = void 0;
var _EventEmitter = require("./EventEmitter");
/**
 * @format
 * 
 */

// screens.js

var getScreens = exports.getScreens = function getScreens() {
  // Fetch the initial screens when this function is called
  return (0, _EventEmitter.getInitialScreens)();
};

/*
import listenEvent, { getInitialScreens } from './EventEmitter'

let screenInfo = getInitialScreens()

listenEvent({
  onScreenConnect: info => (screenInfo = info),
  onScreenChange: info => (screenInfo = info),
  onScreenDisconnect: info => (screenInfo = info),
})

export type Screen = {
  id: string,
  width: number,
  height: number,
  mirrored?: boolean,
}
export type ScreenInfo = {
  [screenId: string]: Screen,
}

export const getScreens = (): ScreenInfo => screenInfo
*/