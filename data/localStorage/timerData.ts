import { Phase, WorkoutConfig } from "@/types/workout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "interval-runner@timer_data";

export interface TimerStructure extends WorkoutConfig {
  currentPhase: Phase
  currentRound: number
  secondsRemainingInCurrentPhase: number
} 

export const getCurrentTimerState = async () => {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return parsed;
  } else {
    return null;
  }
}

export const setCurrentTimerState = async (state: TimerStructure) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const clearTimerState = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
}