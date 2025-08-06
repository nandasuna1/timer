import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { IntervalTimer } from '../components/IntervalTimer';

export default function TimerScreen() {
  const router = useRouter();
  const { runTime, walkTime, rounds } = useLocalSearchParams();

  const config = {
    runTime: Number(runTime),
    walkTime: Number(walkTime),
    rounds: Number(rounds),
  };

  const handleEndWorkout = () => router.replace('/');
  const handleBackToConfig = () => router.back();

  return (
    <View style={{ flex: 1 }}>
      <IntervalTimer
        config={config}
        onEndWorkout={handleEndWorkout}
        onBackToConfig={handleBackToConfig}
      />
    </View>
  );
}
