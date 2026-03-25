import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { initDatabase } from '@/database/schema';

// Initialise les tables SQLite au démarrage (safe, ne recrée pas si déjà existantes)
initDatabase();

export const unstable_settings = {
  anchor: '(tabs)',
};

// WorkoutProvider englobe toute l'app pour que la séance en cours
// soit accessible depuis n'importe quel écran
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <WorkoutProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="exercises" options={{ title: 'Exercices' }} />
          <Stack.Screen name="workout" options={{ title: 'Séance en cours' }} />
          <Stack.Screen name="workout-detail" options={{ title: 'Détail séance' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </WorkoutProvider>
  );
}
