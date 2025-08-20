import { Phase, WorkoutConfig } from "@/types/workout";
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from "react";
import { Platform, Vibration } from "react-native";
import { registerForPushNotificationsAsync, schedulePushNotification } from "./utils";

interface IProps {
    config: WorkoutConfig;
    onEndWorkout: () => void;
}

export const useController = ({config, onEndWorkout}: IProps) => {
    const [currentRound, setCurrentRound] = useState(1);
    const [currentPhase, setCurrentPhase] = useState<Phase>(Phase.RUN);
    const [timeRemaining, setTimeRemaining] = useState(config.runTime);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
  
  
    useEffect(() => {
      registerForPushNotificationsAsync()
      .then(
        // token => token && setExpoPushToken(token),
      );
  
      if (Platform.OS === 'android') {
        Notifications.getNotificationChannelsAsync()
      }
    }, []);
  
    const intervalRef = useRef<number | null>(null);
  
    const currentPhaseTime =
      currentPhase === Phase.RUN ? config.runTime : config.walkTime;
    const progress = (currentPhaseTime - timeRemaining) / currentPhaseTime;
  
  
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
      setCurrentPhase(Phase.RUN);
      setTimeRemaining(config.runTime);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  
    useEffect(() => {
      if (isRunning && timeRemaining > 0) {
        intervalRef.current = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              Vibration.vibrate();
              schedulePushNotification(currentPhase === Phase.RUN);
              if (currentPhase === Phase.RUN) {
                setCurrentPhase(Phase.WALK);
                return config.walkTime;
              } else {
                if (currentRound < config.rounds) {
                  setCurrentRound(r => r + 1);
                  setCurrentPhase(Phase.RUN);
                  return config.runTime;
                } else {
                  setCurrentPhase(Phase.COMPLETE);
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
  
    return {
        currentRound,
        currentPhase,
        formatTime,
        timeRemaining,
        progress,
        isRunning,
        isPaused,
        resetWorkout,
        startTimer,
        pauseTimer,
        stopWorkout,
    }
}