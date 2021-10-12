package com.spendzi;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;

public class SmsReceiver extends BroadcastReceiver {
    private static final String LOG_TAG = "SMS_BROADCAST_RECEIVER";
    private static final String LOG_SMS_CONTENT = "SMS_CONTENT";

    static final String SMS_ACTION = "android.provider.Telephony.SMS_RECEIVED";

    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent.getAction().equals(SMS_ACTION)) {
            Bundle bundle = intent.getExtras();
            if (bundle != null) {
                Object[] pdus = (Object[]) bundle.get("pdus");
                Log.d(LOG_TAG, String.valueOf(pdus.length));
                SmsMessage[] messages = new SmsMessage[pdus.length];
                for (int i = 0; i < pdus.length; i++) {
                    messages[i] = SmsMessage.createFromPdu((byte[]) pdus[i]);
                }
                Log.d(LOG_SMS_CONTENT, "MSG RECEIVED");
                Bundle messageBundle = new Bundle();
                for (SmsMessage msg : messages) {
                    messageBundle.putString("pdus", msg.getPdu().toString());
                    messageBundle.putString("caller", msg.getDisplayOriginatingAddress());
                    messageBundle.putString("content",msg.getDisplayMessageBody());
                    Log.d(LOG_SMS_CONTENT, msg.getDisplayMessageBody());
                }
                Intent service = new Intent(context,SmsDataTransfer.class);
                service.putExtras(messageBundle);
                context.startService(service);
            }
        }
    }
}
