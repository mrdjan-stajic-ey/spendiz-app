package com.spendzi;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class SmsDataTransfer extends HeadlessJsTaskService {
    private static final String SMS_LOG = "SMS_TRANSFER_LOG";

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        if (extras != null) {
            Log.v(SMS_LOG, "HeadlessJs data 200");
            return new HeadlessJsTaskConfig(
                    "SmsTransfer",
                    Arguments.fromBundle(extras),
                    5000,
                    true
            );
        }
        return null;
    }
}
