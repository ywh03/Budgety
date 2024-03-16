import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { useColorScheme } from '@/components/useColorScheme';
import { createTables } from './db/db';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    'ags-r': require('../assets/fonts/AlegreyaSans-Regular.ttf'),
    'ags-b': require('../assets/fonts/AlegreyaSans-Bold.ttf'),
    ...FontAwesome.font,
  });

  const initDatabaseCallback = useCallback(async () => {
    try {
      console.log("Attempting to connect to database...");
      db = SQLite.openDatabase("Budgety.db");
      console.log("Connected to database!")
      await createTables(db);
    } catch (err) {
      console.log(err);
      throw Error("Could not connect to database");
    }
  }, [])

  useEffect(() => {
    initDatabaseCallback();
  }, [])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="debug"  options={{ headerShown: false, presentation: "modal" }} />
        </Stack>
      </Provider>
    </ThemeProvider>
  );
}

export { db };