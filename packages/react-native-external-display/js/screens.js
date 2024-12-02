/**
 * @format
 * @flow strict-local
 */




// screens.js
import { getInitialScreens } from './EventEmitter';

export type Screen = {
  id: string,
  width: number,
  height: number,
  mirrored?: boolean,
};

export type ScreenInfo = {
  [screenId: string]: Screen,
};

export const getScreens = (): ScreenInfo => {
  // Fetch the initial screens when this function is called
  return {
    "70":{
      "id":"69",
      "width":1920,
      "height":1080
    }
  }
  return getInitialScreens();
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