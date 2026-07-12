import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/theme/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="workout/[sessionId]" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="program/new" options={{ presentation: 'modal' }} />
          <Stack.Screen name="program/[id]" />
          <Stack.Screen name="exercise/new" options={{ presentation: 'modal' }} />
          <Stack.Screen name="exercise/[id]" />
          <Stack.Screen name="training-max" />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
