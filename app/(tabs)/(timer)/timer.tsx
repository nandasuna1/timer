import { useLocalSearchParams, useRouter } from 'expo-router';
import { IntervalTimer } from '../../../components/IntervalTimer';

export default function TimerScreen() {
  const router = useRouter();
  const { runTime, walkTime, rounds } = useLocalSearchParams();

  const config = {
    runTime: Number(runTime),
    walkTime: Number(walkTime),
    rounds: Number(rounds),
  };

  const handleBackToConfig = () => router.back();

  return (
    <IntervalTimer
      config={config}
      onBackToConfig={handleBackToConfig}
    />
  );
}
