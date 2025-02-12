// Import the React library to enable the use of React components
import React from 'react';

// Import the Stack component from expo-router for navigation between screens
import { Stack } from 'expo-router';

// Import useFonts hook from expo-font to load custom fonts
import { useFonts } from "expo-font";

// Import SafeAreaProvider to ensure content is rendered within safe screen areas
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Define the RootLayout functional component
const RootLayout = () => {

  // Load custom fonts and store the loading state in 'loaded'
  const [loaded] = useFonts({
    Quicksand: require("../../assets/font/Quicksand-Regular.ttf"), // Load Quicksand Regular font
    QuicksandBold: require("../../assets/font/Quicksand-Bold.ttf"), // Load Quicksand Bold font
    QuicksandMedium: require("../../assets/font/Quicksand-Medium.ttf"), // Load Quicksand Medium font
    QuicksandLight: require("../../assets/font/Quicksand-Light.ttf"), // Load Quicksand Light font
  });

  // If fonts are not yet loaded, return null to prevent rendering until they are ready
  if (!loaded) {
    return null; 
  }

  return (
    // SafeAreaProvider ensures content is displayed within safe screen boundaries
    <SafeAreaProvider>
      <Stack
        screenOptions={{        
          animation: 'slide_from_right',
        }}
      >
     
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen 
          name="dashboard" 
          options={{ 
            title: 'Dashboard', 
            headerShown: false 
          }} 
        />
      </Stack>
    </SafeAreaProvider>       
  )
}

// Export the RootLayout component as the default export
export default RootLayout;
