import * as Notifications from "expo-notifications";
import { useRouter } from 'expo-router';
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
    <IntervalConfig onStartWorkout={handleStartWorkout} />
  );
}
