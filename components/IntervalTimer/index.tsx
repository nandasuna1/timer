import { Phase, WorkoutConfig } from '@/types/workout';
import { Ionicons } from '@expo/vector-icons';

import * as Notifications from 'expo-notifications';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { styles } from './style';
import { useController } from './useController';

interface IntervalTimerProps {
  config: WorkoutConfig;
  onEndWorkout: () => void;
  onBackToConfig: () => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function IntervalTimer({
  config,
  onEndWorkout,
  onBackToConfig,
}: IntervalTimerProps) {

  const {
    currentRound,
    currentPhase,
    formatTime,
    secondsRemainingInCurrentPhase,
    progress,
    isRunning,
    isPaused,
    resetWorkout,
    startTimer,
    pauseTimer,
    stopWorkout,
  } = useController({config, onEndWorkout});

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
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            New Workout
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackToConfig}
        style={{ display: 'flex', flexDirection: 'row', gap: 5 }}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back to Config</Text>
      </TouchableOpacity>

      <Text style={styles.roundText}>
        Round {currentRound} of {config.rounds}
      </Text>
      <Text
        style={[
          styles.phaseText,
          currentPhase === Phase.RUN ? styles.run : styles.walk,
        ]}
      >
        {currentPhase === Phase.RUN ? 'RUN!' : 'WALK'}
      </Text>

      <Text style={styles.timerText}>{formatTime(secondsRemainingInCurrentPhase)}</Text>

      <ProgressBar
        progress={progress}
        color={currentPhase === Phase.RUN ? 'green' : 'blue'}
        style={styles.progress}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={resetWorkout} style={styles.buttonOutline}>
          <Ionicons name="refresh" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={isRunning ? pauseTimer : startTimer}
          style={styles.button}
        >
          <Ionicons
            name={isRunning ? 'pause-outline' : 'play-outline'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={stopWorkout} style={styles.stopButton}>
          <Ionicons name="stop-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {isPaused && <Text style={styles.pausedText}>Workout Paused</Text>}
    </View>
  );
}


