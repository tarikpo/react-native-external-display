package com.externaldisplay;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.Presentation;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewGroup.LayoutParams;
import android.widget.LinearLayout;
import android.hardware.display.DisplayManager;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;

@TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
class ExternalDisplayScreen extends Presentation {
  ExternalDisplayScreen(Context ctx, Display display) {
    super(ctx, display);
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen init");

  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen onCreate");

    super.onCreate(savedInstanceState);
  }
}

@TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
class ExternalDisplayHelper implements DisplayManager.DisplayListener {
  
  public static Map<String, Object> getScreenInfo(Display[] displays) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen getScreenInfo");

    HashMap<String, Object> info = new HashMap<String, Object>();
    for (Display display : displays) {
      int displayId = display.getDisplayId();
      if (
        display.getDisplayId() == Display.DEFAULT_DISPLAY ||
        (display.getFlags() & Display.FLAG_PRESENTATION) == 0
      ) {
        continue;
      }
      HashMap<String, Object> data = new HashMap<String, Object>();
      DisplayMetrics displayMetrics = new DisplayMetrics();
      display.getMetrics(displayMetrics);
      data.put("id", displayId);
      data.put("width",  displayMetrics.widthPixels);
      data.put("height", displayMetrics.heightPixels);
      info.put(String.valueOf(display.getDisplayId()), data);
    }
    return info;
  }

  public interface Listener {
    void onDisplayAdded(Display[] displays, int displayId);
    void onDisplayChanged(Display[] displays, int displayId);
    void onDisplayRemoved(Display[] displays, int displayId);
  }

  private Listener listener = null;
  private DisplayManager dm = null;
  private Display displays = null;

  public ExternalDisplayHelper(Context context, Listener listener) {
    this.listener = listener;

    dm = (DisplayManager) context.getSystemService(Context.DISPLAY_SERVICE);
    dm.registerDisplayListener(this, null);
  }

  public Display getDisplay(int displayId) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen getDisplay");

    return dm.getDisplay(displayId);
  }

  public Display[] getDisplays() {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen getDisplays");

    return dm.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION);
  }

  @Override
  public void onDisplayAdded(int displayId) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen onDisplayAdded");

    listener.onDisplayAdded(getDisplays(), displayId);
  }

  @Override
  public void onDisplayChanged(int displayId) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen onDisplayChanged");

    listener.onDisplayChanged(getDisplays(), displayId);
  }

  @Override
  public void onDisplayRemoved(int displayId) {
    Log.d("RNExternalDisplayEvent", "ExternalDisplayScreen onDisplayRemoved");

    listener.onDisplayRemoved(getDisplays(), displayId);
  }
}
