import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "interval-runner@activity_time_stamp";

export const getCurrentTimeStamp = async () => {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    return parsed;
  } else {
    return null;
  }
}

export const setCurrentTimeStamp = async (state: number) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export const clearTimeStamp = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
}