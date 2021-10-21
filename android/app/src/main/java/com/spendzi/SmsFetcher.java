package com.spendzi;

import android.database.Cursor;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


import java.util.ArrayList;
import java.util.List;

public class SmsFetcher extends ReactContextBaseJavaModule {
    static final String NATIVE_MODULE_NAME = "SmsFetcher";
    static final String SMS_FETCH_FAILED = "SMS_FETCH_FAILED";

    SmsFetcher(ReactApplicationContext context){
        super(context);
    }

    @ReactMethod
    public void getSmsInbox(Promise nativePromise) {
        WritableArray result = new WritableNativeArray();
        try {

            Uri uriSmsLocation =  Uri.parse("content://sms/inbox");
            Cursor cur = getReactApplicationContext().getContentResolver().query(uriSmsLocation,null,null,null,null);
            while (cur.moveToNext()){
                String sender = cur.getString(cur.getColumnIndex("address"));
                String body = cur.getString(cur.getColumnIndexOrThrow(("body")));
                Log.d("SMS_COLUMNS" , cur.getColumnNames().toString());
                WritableMap smsMap = new WritableNativeMap();
                smsMap.putString("sender", sender.toString());
                smsMap.putString("body", body.toString());
                result.pushMap(smsMap);
            }
            nativePromise.resolve(result);
        } catch (Exception e) {
            nativePromise.reject(SMS_FETCH_FAILED, e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return NATIVE_MODULE_NAME;
    }
}
