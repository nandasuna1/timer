import { formatTime } from '@/utils/time';
import { Play, RotateCcw, Timer } from 'lucide-react-native';
import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';
import { useController } from './useController';

interface WorkoutConfig {
  runTime: number;
  walkTime: number;
  rounds: number;
}

interface IntervalConfigProps {
  onStartWorkout: (config: WorkoutConfig) => void;
}

export default function IntervalConfig({
  onStartWorkout,
}: IntervalConfigProps) {
  const {
    runMinutes,
    runSeconds,
    walkMinutes,
    walkSeconds,
    rounds,
    handleStart,
    totalTime,
    totalMinutes,
    totalSeconds,
    setRunMinutes,
    setRunSeconds,
    setWalkMinutes,
    setWalkSeconds,
    setRounds,
  } = useController({ onStartWorkout });
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Timer size={48} />
          <Text style={styles.title}>Interval Runner</Text>
        </View>
        <Text style={styles.subtitle}>Configure your running intervals</Text>
      </View>

      {/* Running Time */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Play size={20} color="green" />
          <Text style={styles.cardTitle}>Running Time</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text>Minutes</Text>
            <TextInput
              keyboardType="numeric"
              value={runMinutes.toString()}
              onChangeText={v => setRunMinutes(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Seconds</Text>
            <TextInput
              keyboardType="numeric"
              value={runSeconds.toString()}
              onChangeText={v => setRunSeconds(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
        </View>
        {/* <Text style={styles.timerPreview}>{formatTime(runMinutes, runSeconds)}</Text> */}
      </View>

      {/* Walking Time */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <RotateCcw size={20} color="blue" />
          <Text style={styles.cardTitle}>Walking Time</Text>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputGroup}>
            <Text>Minutes</Text>
            <TextInput
              keyboardType="numeric"
              value={walkMinutes.toString()}
              onChangeText={v => setWalkMinutes(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Seconds</Text>
            <TextInput
              keyboardType="numeric"
              value={walkSeconds.toString()}
              onChangeText={v => setWalkSeconds(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
        </View>
        {/* <Text style={styles.timerPreview}>{formatTime(walkMinutes, walkSeconds)}</Text> */}
      </View>

      {/* Rounds */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Number of Rounds</Text>
        <TextInput
          keyboardType="numeric"
          value={rounds.toString()}
          onChangeText={v => setRounds(parseInt(v) || 0)}
          style={[styles.input, { alignSelf: 'center', fontSize: 20 }]}
        />
      </View>

      {/* Total Time */}
      <View style={styles.summary}>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>
          Total Workout Time
        </Text>
        <Text style={styles.totalTime}>
          {formatTime(totalMinutes, totalSeconds)}
        </Text>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        onPress={handleStart}
        style={[styles.button, totalTime === 0 && styles.buttonDisabled]}
        disabled={totalTime === 0}
      >
        <Play size={20} color="white" />
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}


