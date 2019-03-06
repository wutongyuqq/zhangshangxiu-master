package com.example.tucheng.zhangshangxiu;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.WindowManager;
import android.webkit.WebView;

import java.util.ArrayList;
import java.util.List;
import java.util.Timer;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;

/**
 * Created by Administrator on 2018/6/10 0010.
 */

public class SplashActivity extends Activity {
    private Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE |
                WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
        setContentView(R.layout.splash_main);
        context = this;
        new Thread(new Runnable() {
            @Override
            public void run() {
                try{
                    Thread.sleep(1500);
                    Intent intent = new Intent(context,MainActivity.class);
                    startActivity(intent);
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
