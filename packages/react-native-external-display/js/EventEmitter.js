import {
  NativeEventEmitter,
  DeviceEventEmitter,
  Platform,
  Dimensions,
} from 'react-native'
import RNExternalDisplayEvent from './NativeRNExternalDisplayEvent'

let scale
let EventEmitter



function getScale() {
  if (scale == null) {
    scale = Platform.OS === 'ios' ? 1 : Dimensions.get('window').scale;
  }
  return scale;
}

function getEventEmitter() {
  if (EventEmitter == null) {
    if (Platform.OS === 'ios') {
      RNExternalDisplayEvent.init();
      EventEmitter = new NativeEventEmitter(RNExternalDisplayEvent);
    } else {
      EventEmitter = DeviceEventEmitter;
    }
  }
  return EventEmitter;
}

const handleScreensChange = (info) => {
  const currentScale = getScale();
  return Object.entries(info).reduce((result, [screenId, screen]) => {
    result[screenId] = {
      ...screen,
      width: screen.width / currentScale,
      height: screen.height / currentScale,
    };
    return result;
  }, {});
};

export const getInitialScreens = () => {
  if (!RNExternalDisplayEvent) {
    return {};
  }
  return handleScreensChange(RNExternalDisplayEvent.SCREEN_INFO);
};

export default function listenEvent({ onScreenConnect, onScreenChange, onScreenDisconnect }) {
  const emitter = getEventEmitter();

  const connect = emitter.addListener('@RNExternalDisplay_screenDidConnect', (info) =>
    onScreenConnect(handleScreensChange(info))
  );

  const change = emitter.addListener('@RNExternalDisplay_screenDidChange', (info) =>
    onScreenChange(handleScreensChange(info))
  );

  const disconnect = emitter.addListener('@RNExternalDisplay_screenDidDisconnect', (info) =>
    onScreenDisconnect(handleScreensChange(info))
  );

  return {
    connect,
    change,
    disconnect,
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
