import { SettingsProvider } from '@/contexts/SettingsContext';
import { KeyboardWrapper } from '@/wrappers/KeyboardWrapper';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function AppWrapper({ children }: PropsWithChildren) {
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <KeyboardWrapper>{children}</KeyboardWrapper>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppWrapper>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <SettingsProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
            </Stack>
            <StatusBar style="auto" />
          </SettingsProvider>
        </ThemeProvider>
      </AppWrapper>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
});
