import messaging from '@react-native-firebase/messaging';

const NotificationHandlerErrors = {
  BACKGROUND_FAILED: 'Notification in background subscribe failed',
  FCM_NOTIF_FAILED: 'Notification in foreground subscribe failed',
  DEVICE_REGISTRATION_FAILED: 'Firebase device registration failed',
};

class NotificationHandler {
  constructor() {}

  public setBackgroundMessageHandler(): void {
    try {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });
    } catch (error) {
      console.error(NotificationHandlerErrors.BACKGROUND_FAILED, error);
    }
  }
  public setForegroundMessageHanled(): any {
    try {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });
      return unsubscribe;
    } catch (error) {
      console.error(NotificationHandlerErrors.FCM_NOTIF_FAILED, error);
    }
  }

  public getFCMToken(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        resolve(token);
      } catch (error) {
        reject(NotificationHandlerErrors.DEVICE_REGISTRATION_FAILED);
      }
    });
  }
}

const NotificationHandlerInstance = new NotificationHandler();

export default NotificationHandlerInstance;
