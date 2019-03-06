package com.example.tucheng.zhangshangxiu;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebBackForwardList;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainTwoActivity extends Activity {
    WebView webView;
    private static Boolean isQuit = false;
    private long mExitTime = 0;
    private List<String> list = new ArrayList();
    public static final MediaType MEDIA_TYPE_MARKDOWN
            = MediaType.parse("text/x-markdown; charset=utf-8");
    private static String BaseURL;
    private static  boolean isInit=false;


    private String[] logins = new String[2];
    Timer timer = new Timer();
    Handler handler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            webView.loadUrl(BaseURL+"/src/index.html#/home");
        }
    };

    Handler myHandler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            findViewById(R.id.image_tv).setVisibility(View.GONE);
            findViewById(R.id.web).setVisibility(View.VISIBLE);
        }
    };
    private final OkHttpClient client = new OkHttpClient();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE|
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        setContentView(R.layout.activity_main);
        webView = (WebView) findViewById(R.id.web);
        init(webView);
        initClient(webView);
        try {
            run();
        } catch (Exception e) {
            Toast.makeText(this,""+e.getMessage(),Toast.LENGTH_LONG).show();
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(3000);
                    myHandler.sendEmptyMessage(1001);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @Override
    protected void onResume() {
        super.onResume();

    }

    public void run() throws RuntimeException, IOException {



        Request request = new Request.Builder()
                .url("http://47.75.90.219:8080/PhoneWeb/").addHeader("App", getAppVersionName(this))
                .post(RequestBody.create(MEDIA_TYPE_MARKDOWN, ""))
                .build();


        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

                Headers responseHeaders = response.headers();
                for (int i = 0; i < responseHeaders.size(); i++) {
                    System.out.println(responseHeaders.name(i) + ": " + responseHeaders.value(i));
                }
                AppVersion appVersion=null;
                if (!response.isSuccessful()) throw new RuntimeException("获取失败");
                String str = response.body().string();
                if (!TextUtils.isEmpty(str)) {
                    appVersion = JSON.parseObject(str, AppVersion.class);
                    BaseURL=appVersion.getHost();
                    Log.i("david", "----> "+BaseURL+"/src/index.html#/home");
                }
                if(!appVersion.isKeep()){
                    throw new RuntimeException("服务器不允许此App登录");
                }

                handler.sendEmptyMessage(1);


            }});

    }
    private void initClient(final WebView webView) {


//步骤3. 复写shouldOverrideUrlLoading()方法，使得打开网页时不调用系统浏览器， 而是在本WebView中显示
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if(url.contains("login")&&!isInit){
                    logins[0]="login";
                    isInit = true;
                }
                if(url.contains("home")){
                    if ("login".equals(logins[0])&&isInit) {
                        webView.clearHistory(); // 清除
                        logins=new String[2];
                    }
                }
                view.loadUrl(url);



                return true;
            }
        });
    }

    private void init(WebView webView) {
        //声明WebSettings子类
        WebSettings webSettings = webView.getSettings();

//如果访问的页面中要与Javascript交互，则webview必须设置支持Javascript
        webSettings.setJavaScriptEnabled(true);


//设置自适应屏幕，两者合用
        webSettings.setUseWideViewPort(true); //将图片调整到适合webview的大小
        webSettings.setLoadWithOverviewMode(true); // 缩放至屏幕的大小

//缩放操作
        webSettings.setSupportZoom(false); //支持缩放，默认为true。是下面那个的前提。
        webSettings.setBuiltInZoomControls(false); //设置内置的缩放控件。若为false，则该WebView不可缩放
        webSettings.setDisplayZoomControls(true); //隐藏原生的缩放控件

//其他细节操作
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT); //关闭webview中缓存
        webSettings.setAllowFileAccess(true); //设置可以访问文件
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true); //支持通过JS打开新窗口
        webSettings.setLoadsImagesAutomatically(true); //支持自动加载图片
        webSettings.setDefaultTextEncodingName("utf-8");//设置编码格式

        //优先使用缓存:
        webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        //缓存模式如下：
        //LOAD_CACHE_ONLY: 不使用网络，只读取本地缓存数据
        //LOAD_DEFAULT: （默认）根据cache-control决定是否从网络上取数据。
        //LOAD_NO_CACHE: 不使用缓存，只从网络获取数据.
        //LOAD_CACHE_ELSE_NETWORK，只要本地有，无论是否过期，或者no-cache，都使用缓存中的数据。



        if (NetStatusUtil.isNetworkAvailable(getApplicationContext())) {
            webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);//根据cache-control决定是否从网络上取数据。
        } else {
            webSettings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);//没网，则从本地获取，即离线加载
        }

        webSettings.setDomStorageEnabled(true); // 开启 DOM storage API 功能
        webSettings.setDatabaseEnabled(true);   //开启 database storage API 功能
        webSettings.setAppCacheEnabled(true);//开启 Application Caches 功能

        String cacheDirPath = getFilesDir().getAbsolutePath() +"/cache";
        webSettings.setAppCachePath(cacheDirPath); //设置  Application Caches 缓存目录

    }

    //点击返回上一页面而不是退出浏览器
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

    if(webView.getUrl().contains("login")){
        System.exit(0);// 否则退出程序
        return true;
    }
    if(!webView.getUrl().contains("home")){
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        }
    }
    if (keyCode == KeyEvent.KEYCODE_BACK) {
          if ((System.currentTimeMillis() - mExitTime) > 2000) {//
              // 如果两次按键时间间隔大于2000毫秒，则不退出
              Toast.makeText(this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
              mExitTime = System.currentTimeMillis();// 更新mExitTime
          } else {
              System.exit(0);// 否则退出程序
          }
          return true;
      }

        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        if (webView != null) {
            webView.loadDataWithBaseURL(null, "", "text/html", "utf-8", null);
            webView.clearHistory();
            ((ViewGroup) webView.getParent()).removeView(webView);
            webView.destroy();
           webView = null;
        }
        super.onDestroy();
    }

    public String getAppVersionName(Context context) {
        String versionName = "";
        int versionCode = 0;
        try {
            // ---get the package info---
            PackageManager pm = context.getPackageManager();
            PackageInfo pi = pm.getPackageInfo(context.getPackageName(), 0);
            versionName = pi.versionName;
            versionCode = pi.versionCode;
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (versionName == null || versionName.length() <= 0) {
            versionName = "";
        }

        return versionName;
    }
    private void showUpdateDialog(Context context) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setIcon(android.R.drawable.ic_dialog_info);
        builder.setTitle("有新版本");
        builder.setMessage("确认更新");
        builder.setCancelable(false);

        builder.setPositiveButton("确定", new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which) {
                if (Environment.getExternalStorageState().equals(
                        Environment.MEDIA_MOUNTED)) {
                    downFile("下载地址");
                } else {
                    Toast.makeText(MainTwoActivity.this, "SD卡不可用，请插入SD卡",
                            Toast.LENGTH_SHORT).show();
                }
            }
        });
        builder.setNegativeButton("取消", new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int which) {
            }

        });
        builder.create().show();
    }

    private boolean isNeedUpdate() {

        String v = "3.1.1"; // 最新版本的版本号
        Log.i("update",v);
        Toast.makeText(MainTwoActivity.this, v, Toast.LENGTH_SHORT).show();
        if (v.equals(getVersion())) {
            return false;
        } else {
            return true;
        }
    }

    // 获取当前版本的版本号
    private String getVersion() {
        try {
            PackageManager packageManager = getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo(
                    getPackageName(), 0);

            Log.d("TAK","packageInfo.versionName"+packageInfo.versionName);
            return packageInfo.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            return "版本号未知";

        }
    }
    ProgressDialog pBar;
    void downFile(final String url) {
        Log.d("TSK","url"+url);
        pBar = new ProgressDialog(MainTwoActivity.this);    //进度条，在下载的时候实时更新进度，提高用户友好度
        pBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        pBar.setTitle("正在下载");
        pBar.setMessage("请稍候...");
        pBar.setProgress(0);
        pBar.show();
        new Thread(new Runnable() {
            @Override
            public void run() {

                String videoUrl = "http://47.75.90.219:8080/PhoneWeb/";
                String saveDir ="/src/index.html#/home";
                NetUtil.getInstance().download2(videoUrl, saveDir, new NetUtil.OnDownloadListener() {
                    @Override
                    public void onDownloadSuccess(String path) {
                        down();
                    }

                    @Override
                    public void onDownloading(int progress) {
                        //pBar.setMax((int) total);
                        pBar.setProgress(progress);
                    }

                    @Override
                    public void onDownloadFailed() {

                    }
                });
            }
        }).start();
    }



    void down() {
        myHandler.post(new Runnable() {
            public void run() {
                pBar.cancel();
                update();
            }
        });
    }

    void update() {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(Uri.fromFile(new File(Environment
                        .getExternalStorageDirectory()+"/abc", "abc.apk")),
                "application/vnd.android.package-archive");
        startActivity(intent);
    }



}
