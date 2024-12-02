package com.externaldisplay;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;

import com.facebook.common.logging.FLog;
import com.facebook.react.common.ReactConstants;

import android.util.DisplayMetrics;
import android.view.Display;
import android.graphics.Rect;
import android.util.Log;

import javax.annotation.Nullable;
import java.util.Map;
import java.util.HashMap;

public class RNExternalDisplayManager extends ViewGroupManager<RNExternalDisplayView> implements ExternalDisplayHelper.Listener {
  public static final String REACT_CLASS = "RNExternalDisplay";
  private ExternalDisplayHelper helper;
  private ReactApplicationContext reactContext;
  private Map<RNExternalDisplayView, RNExternalDisplayView> views = new HashMap<RNExternalDisplayView, RNExternalDisplayView>();

  public RNExternalDisplayManager(ReactApplicationContext reactContext) {
    super();
    this.reactContext = reactContext;
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager init");

  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public RNExternalDisplayView createViewInstance(ThemedReactContext context) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager createViewInstance");

    if (this.helper == null) {
      this.helper = new ExternalDisplayHelper(reactContext, this);
    }
    RNExternalDisplayView view = new RNExternalDisplayView(context, this.helper);
    views.put(view, view);
    return view;
  }

  @Override
  public void onDropViewInstance(RNExternalDisplayView view) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager onDropViewInstance");

    views.remove(view);
    super.onDropViewInstance(view);
    view.onDropInstance();
  }

  private void checkScreen() {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager checkScreen");

    int screenId = -1;
    for (RNExternalDisplayView view : views.values()) {
      int viewScreenId = view.getScreen();
      if (viewScreenId > 0 && screenId == viewScreenId) {
        // TODO: Log to console
        FLog.e(ReactConstants.TAG, "Detected two or more RNExternalDisplayView to register the same screen id: " + screenId);
      }
      if (viewScreenId > 0) {
        screenId = viewScreenId;
      }
    }
  }

  @ReactProp(name = "screen")
  public void setScreen(RNExternalDisplayView view, @Nullable String screen) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager setScreen");

    view.setScreen(screen);
    checkScreen();
  }

  @ReactProp(name = "fallbackInMainScreen", defaultBoolean = false)
  public void setFallbackInMainScreen(RNExternalDisplayView view, boolean fallbackInMainScreen) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager setFallbackInMainScreen");

    view.setFallbackInMainScreen(fallbackInMainScreen);
  }

  private void sendEvent(String eventName, @Nullable WritableMap params) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager sendEvent:"+eventName);

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  public void onDisplayAdded(Display[] displays, int displayId) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager onDisplayAdded:"+displayId);

    sendEvent(
      "@RNExternalDisplay_screenDidConnect",
      Arguments.makeNativeMap(
        ExternalDisplayHelper.getScreenInfo(displays)
      )
    );
  }
  public void onDisplayChanged(Display[] displays, int displayId) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager onDisplayChanged:"+displayId);

    sendEvent(
      "@RNExternalDisplay_screenDidChange",
      Arguments.makeNativeMap(
        ExternalDisplayHelper.getScreenInfo(displays)
      )
    );
  }
  public void onDisplayRemoved(Display[] displays, int displayId) {
    Log.d("RNExternalDisplayEvent", "RNExternalDisplayManager onDisplayRemoved:"+displayId);

    sendEvent(
      "@RNExternalDisplay_screenDidDisconnect",
      Arguments.makeNativeMap(
        ExternalDisplayHelper.getScreenInfo(displays)
      )
    );
  }
}
