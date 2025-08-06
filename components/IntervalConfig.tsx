import { Play, RotateCcw, Timer } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface WorkoutConfig {
  runTime: number;
  walkTime: number;
  rounds: number;
}

interface IntervalConfigProps {
  onStartWorkout: (config: WorkoutConfig) => void;
}

export default function IntervalConfig({ onStartWorkout }: IntervalConfigProps) {
  const [runMinutes, setRunMinutes] = useState(1);
  const [runSeconds, setRunSeconds] = useState(0);
  const [walkMinutes, setWalkMinutes] = useState(0);
  const [walkSeconds, setWalkSeconds] = useState(30);
  const [rounds, setRounds] = useState(5);

  const handleStart = () => {
    const config: WorkoutConfig = {
      runTime: runMinutes * 60 + runSeconds,
      walkTime: walkMinutes * 60 + walkSeconds,
      rounds,
    };
    onStartWorkout(config);
  };

  const formatTime = (minutes: number, seconds: number) =>
    `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const totalTime =
    (runMinutes * 60 + runSeconds + walkMinutes * 60 + walkSeconds) * rounds;
  const totalMinutes = Math.floor(totalTime / 60);
  const totalSeconds = totalTime % 60;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Timer size={48}  />
        <Text style={styles.title}>Interval Runner</Text>
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
              onChangeText={(v) => setRunMinutes(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Seconds</Text>
            <TextInput
              keyboardType="numeric"
              value={runSeconds.toString()}
              onChangeText={(v) => setRunSeconds(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
        </View>
        <Text style={styles.timerPreview}>{formatTime(runMinutes, runSeconds)}</Text>
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
              onChangeText={(v) => setWalkMinutes(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text>Seconds</Text>
            <TextInput
              keyboardType="numeric"
              value={walkSeconds.toString()}
              onChangeText={(v) => setWalkSeconds(parseInt(v) || 0)}
              style={styles.input}
              maxLength={2}
            />
          </View>
        </View>
        <Text style={styles.timerPreview}>{formatTime(walkMinutes, walkSeconds)}</Text>
      </View>

      {/* Rounds */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Number of Rounds</Text>
        <TextInput
          keyboardType="numeric"
          value={rounds.toString()}
          onChangeText={(v) => setRounds(parseInt(v) || 1)}
          style={[styles.input, { alignSelf: 'center', fontSize: 20 }]}
        />
      </View>

      {/* Total Time */}
      <View style={styles.summary}>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>Total Workout Time</Text>
        <Text style={styles.totalTime}>{formatTime(totalMinutes, totalSeconds)}</Text>
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#6b7280',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputGroup: {
    flex: 1,
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  timerPreview: {
    marginTop: 12,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'monospace',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 8,
  },
  summary: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
  },
  totalTime: {
    fontSize: 22,
    fontFamily: 'monospace',
    marginTop: 4,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
