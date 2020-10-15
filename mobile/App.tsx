import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { useFonts } from 'expo-font';
import React from 'react';
import Router from './src/routes';

const App = () => {
  const [fontsLoaded] = useFonts({ Nunito_700Bold, Nunito_800ExtraBold, Nunito_600SemiBold });

  if (!fontsLoaded) return null;

  return <Router />;
};
export default App;
