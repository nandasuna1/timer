import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const audioSource = import('../../assets/sounds/alarm.mp3')


export default function App() {
  const [seconds, setSeconds] = useState(60); // tempo inicial: 1 minuto
  const [initialTime, setInitialTime] = useState(60); // tempo inicial: 1 minuto
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(0);
  const player = useAudioPlayer(audioSource)


  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setSeconds(initialTime);
    setIsRunning(false);
  }, [initialTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            triggerAlert();
            return 0;
          } 
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, resetTimer]);



  const handleChangeTimer = (text: string) => {
    const value = parseInt(text);
    if (isNaN(value)) {
      setInitialTime(0);
      setSeconds(0);
    } else {
      setInitialTime(value);
      setSeconds(value);
    }
  };

  const triggerAlert = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    try {
      player.play()
    } catch (error) {
      console.error('Erro ao tocar o som:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={seconds.toString()}
        onChangeText={handleChangeTimer}
      />
      </View>
      <View style={styles.buttonContainer}>
      <Button
        title={isRunning ? 'Pause' : 'Start'}
        onPress={() => setIsRunning((prev) => !prev)}
      />
      <Button title="Reset" onPress={resetTimer} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    marginBottom: 20,
  },
  input: {
    fontSize: 48,
    textAlign: 'center',
    color: '#09f'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  timerContainer: {
    marginBottom: 20,
    width: 300,
    height: 300,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    borderWidth: 10,
    borderColor: '#09f',
  },
});
