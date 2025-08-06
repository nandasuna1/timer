import { useRouter } from 'expo-router';
import { View } from 'react-native';
import IntervalConfig from '../components/IntervalConfig';
import { WorkoutConfig } from '../types/workout';

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
    <View style={{ flex: 1 }}>
      <IntervalConfig onStartWorkout={handleStartWorkout} />
    </View>
  );
}
