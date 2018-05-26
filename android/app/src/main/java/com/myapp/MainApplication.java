package com.myapp;

import android.app.Application;
import com.facebook.react.ReactApplication;
import com.rnnestedscrollview.RNNestedScrollViewPackage;
import com.iou90.autoheightwebview.AutoHeightWebViewPackage;
import com.wog.videoplayer.VideoPlayerPackage;
import com.masteratul.downloadmanager.ReactNativeDownloadManagerPackage;
import com.rnfs.RNFSPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.evollu.react.fcm.FIRMessagingPackage;
import java.util.Arrays;
import java.util.List;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.burnweb.rnwebview.RNWebViewPackage;
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNWebViewPackage(),
            new RNNestedScrollViewPackage(),
            new AutoHeightWebViewPackage(),
            new VideoPlayerPackage(),
            new ReactNativeDownloadManagerPackage(),
            new RNFSPackage(),
            new RNAdMobPackage(),
            new FIRMessagingPackage(),
            new LinearGradientPackage(),
            new OrientationPackage(),
            new KCKeepAwakePackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNFetchBlobPackage()  
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
