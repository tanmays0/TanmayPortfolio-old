/**
 * Root component: useState theme + NavigationContainer.
 * Assignments 1–6 build on this shell.
 */
import { useCallback, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashOverlay } from './src/components/SplashOverlay';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';
import { darkColors, lightColors } from './src/theme/colors';

function App() {
  // Assignment requirement: dark/light mode driven by useState.
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider isDark={isDark} toggleTheme={toggleTheme}>
        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
        <View style={{ flex: 1 }}>
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
          <SplashOverlay />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
