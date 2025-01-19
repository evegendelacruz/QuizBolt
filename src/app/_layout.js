import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {

  const [loaded] = useFonts({
    Quicksand: require("../../assets/font/Quicksand-Regular.ttf"),
    QuicksandBold: require("../../assets/font/Quicksand-Bold.ttf"),
    QuicksandMedium: require("../../assets/font/Quicksand-Medium.ttf"),
    QuicksandLight: require("../../assets/font/Quicksand-Light.ttf"),
  });
  

  if (!loaded) {
    return null; 
  }

  return (
        <SafeAreaProvider>
          <Stack
            screenOptions={{        
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="dashboard" 
              options={{ 
                title: 'Dashboard', 
                headerShown: false
              }} 
            />
          </Stack>
        </SafeAreaProvider>       
  )
}

export default RootLayout