import * as Notifications from "expo-notifications";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import IntervalConfig from '../components/IntervalConfig';
import { WorkoutConfig } from '../types/workout';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});


export default function HomeScreen() {
  const router = useRouter();
  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("timer-channel", {
        name: "Timer Notifications",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250], // vibração customizada
        lightColor: "#FF231F7C",
      });
    }
  }, []);

  const handleStartWorkout = (config: WorkoutConfig) => {
    router.push({
      pathname: '/timer',
      params: {
        runTime: config.runTime.toString(),
        walkTime: config.walkTime.toString(),
        rounds: config.rounds.toString(),
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <IntervalConfig onStartWorkout={handleStartWorkout} />
    </View>
  );
}
