import { Phase, WorkoutConfig } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';



interface IntervalTimerProps {
  config: WorkoutConfig;
  onEndWorkout: () => void;
  onBackToConfig: () => void;
}

export function IntervalTimer({ config, onEndWorkout, onBackToConfig }: IntervalTimerProps) {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPhase, setCurrentPhase] = useState<Phase>('run');
  const [timeRemaining, setTimeRemaining] = useState(config.runTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const currentPhaseTime = currentPhase === 'run' ? config.runTime : config.walkTime;
  const progress = ((currentPhaseTime - timeRemaining) / currentPhaseTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const stopWorkout = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    onEndWorkout();
  };

  const resetWorkout = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentRound(1);
    setCurrentPhase('run');
    setTimeRemaining(config.runTime);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            Vibration.vibrate();
            if (currentPhase === 'run') {
              setCurrentPhase('walk');
              return config.walkTime;
            } else {
              if (currentRound < config.rounds) {
                setCurrentRound((r) => r + 1);
                setCurrentPhase('run');
                return config.runTime;
              } else {
                setCurrentPhase('complete');
                setIsRunning(false);
                return 0;
              }
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeRemaining, currentPhase, currentRound, config]);

  if (currentPhase === 'complete') {
    return (
      <View style={styles.completedContainer}>
        <Text style={styles.completeText}>Workout Complete!</Text>
        <Text>You completed {config.rounds} rounds.</Text>

        <TouchableOpacity style={styles.buttonOutline} onPress={resetWorkout}>
          <Ionicons name="refresh" size={20} color="#000" />
          <Text style={styles.buttonText}>Start Again</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onBackToConfig}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={[styles.buttonText, { color: '#fff' }]}>New Workout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackToConfig} style={{display: 'flex', flexDirection: 'row', gap: 5}} > 
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back to Config</Text>
      </TouchableOpacity>

      <Text style={styles.roundText}>Round {currentRound} of {config.rounds}</Text>
      <Text style={[styles.phaseText, currentPhase === 'run' ? styles.run : styles.walk]}>
        {currentPhase === 'run' ? 'RUN!' : 'WALK'}
      </Text>

      <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>

      <ProgressBar progress={progress} color={currentPhase === 'run' ? 'green' : 'blue'} style={styles.progress} />

      <View style={styles.controls}>
        <TouchableOpacity onPress={resetWorkout} style={styles.buttonOutline}>
          <Ionicons name="refresh" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={isRunning ? pauseTimer : startTimer} style={styles.button}>
          <Ionicons name={isRunning ? 'pause-outline' : 'play-outline'} size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={stopWorkout} style={styles.stopButton}>
          <Ionicons name="stop-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {isPaused && <Text style={styles.pausedText}>Workout Paused</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    marginTop: 20,
    backgroundColor: '#f9fafb',
  },
  roundText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 4,
  },
  phaseText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  run: { color: 'green' },
  walk: { color: 'blue' },
  timerText: {
    textAlign: 'center',
    fontSize: 64,
    fontVariant: ['tabular-nums'],
    marginBottom: 16,
  },
  progress: {
    height: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOutline: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#da2929',
    borderColor: '#da2929',
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
  },
  completeText: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  backText: {
    fontSize: 16,
    marginBottom: 24,
  },
  pausedText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gray'
  },
  completedContainer: {
    padding: 24,
    flex: 1,
    marginTop: 20,
    gap: 20,
    textAlign: 'center',
    backgroundColor: '#f9fafb',

  }
});
