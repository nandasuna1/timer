import { Stack } from 'expo-router';

export default function ConfigLayout() {
  return (
    <Stack>
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
}
