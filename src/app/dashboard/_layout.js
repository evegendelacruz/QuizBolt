// Import necessary libraries from React and React Native
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Provides gesture handling capabilities for the app
import { Drawer } from 'expo-router/drawer'; // Import Drawer component for navigation
import { Stack } from 'expo-router'; // Import Stack for screen navigation (not used in this file)
import { useFonts } from "expo-font"; // Hook to load custom fonts
import { Text } from 'react-native'; // Import Text component from React Native for rendering text
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Ensures content is displayed within safe areas of the screen
import DrawerContent from '../../components/Drawer'; // Import custom drawer content component
import { AntDesign, Octicons } from '@expo/vector-icons'; // Import icon components from Expo vector icons library

// Define the RootLayout component
const RootLayout = () => {
  // Load custom fonts and store the loading status in the 'loaded' variable
  const [loaded] = useFonts({
    Quicksand: require("../../../assets/font/Quicksand-Regular.ttf"), // Load Quicksand Regular font
    QuicksandBold: require("../../../assets/font/Quicksand-Bold.ttf"), // Load Quicksand Bold font
    QuicksandMedium: require("../../../assets/font/Quicksand-Medium.ttf"), // Load Quicksand Medium font
    QuicksandLight: require("../../../assets/font/Quicksand-Light.ttf"), // Load Quicksand Light font
  });

  // If the fonts are not loaded yet, return null (prevents rendering until fonts are available)
  if (!loaded) {
    return null;
  }

  return (
    // Wrap the entire layout inside GestureHandlerRootView to enable gesture handling
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen
            name="index" // Name of the screen
            options={{
              // Customize the label shown in the drawer
              drawerLabel: ({ focused }) => (
                <Text
                  style={{
                    fontFamily: 'QuicksandBold', // Apply custom font
                    fontSize: 15, // Set font size
                    color: focused ? '#6a5be2' : 'gray', // Change color when focused
                  }}
                >
                  Quiz
                </Text>
              ),
              title: 'QUIZBOLT', // Set the title of the screen
              drawerActiveTintColor: '#6a5be2', // Active drawer item color
              headerStyle: {
                backgroundColor: '#6a5be2', // Set header background color
                elevation: 0, // Remove shadow from the header
              },
              headerTintColor: 'white', // Set header text color
              headerTitleStyle: {
                fontFamily: 'QuicksandBold', // Apply custom font to the header title
                fontSize: 20, // Set header title font size
              },
              headerTitleAlign: 'center', // Center the header title
              // Define the icon displayed in the drawer
              drawerIcon: ({ focused }) => (
                    <Octicons
                        name="light-bulb" // Use light bulb icon from Octicons
                        size={20}
                        color={focused ? '#6a5be2' : 'gray'} // Change icon color when focused
                        marginTop={6} // Adjust icon position
                    />
                    ),
                }}
                />
        </Drawer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
