import { WorkoutConfig } from '@/types/workout';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from "react-native";

export async function schedulePushNotification(isRun: boolean) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: isRun ? 'RUN!' : 'WALK!',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
}
  
export async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('myNotificationChannel', {
        name: 'A channel is needed for the permissions prompt to appear',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId) {
          throw new Error('Project ID not found');
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e) {
        token = `${e}`;
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
}

export async function setupNotifications() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Enable notifications for the timer to work!");
    }
  
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("timer", {
        name: "Timer",
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }
}
  
export async function scheduleNotification(seconds: number, message?: string) {
  await Notifications.scheduleNotificationAsync({
    content: { title: "⏱ Timer", body: message ?? "Time!", sound: true },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
    },
  });
}

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const scheduleNotificationInBatch = async ({rounds, runTime, walkTime}: WorkoutConfig) => {
  for (let i = 0; i < rounds; i++) {
    const timeToRun = (runTime * (i + 1)) + (walkTime * i);
    await scheduleNotification(timeToRun);
    await scheduleNotification(timeToRun + walkTime);
  }
}