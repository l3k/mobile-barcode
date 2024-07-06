import '@src/styles/unistyles'
import {
  useFonts,
  Montserrat_900Black,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_500Medium,
  Montserrat_400Regular,
  Montserrat_300Light,
  Montserrat_100Thin
} from '@expo-google-fonts/montserrat';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

import { Routes } from '@src/routes';
import { DataProvider } from '@src/hooks/data';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_900Black,
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_100Thin
  });

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DataProvider>
        <StatusBar translucent={true} style='light' />
        <Routes />
      </DataProvider>
      <FlashMessage position="center" />
    </GestureHandlerRootView>
  );
}

