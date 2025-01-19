import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Stack } from 'expo-router';
import { useFonts } from "expo-font";
import { Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerContent from '../../components/Drawer';
import {AntDesign, Octicons } from '@expo/vector-icons';

const RootLayout = () => {
  const [loaded] = useFonts({
    Quicksand: require("../../../assets/font/Quicksand-Regular.ttf"),
    QuicksandBold: require("../../../assets/font/Quicksand-Bold.ttf"),
    QuicksandMedium: require("../../../assets/font/Quicksand-Medium.ttf"),
    QuicksandLight: require("../../../assets/font/Quicksand-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Drawer drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
                name="index"
                options={{
                drawerLabel: ({ focused }) => (
                <Text
                    style={{
                    fontFamily: 'QuicksandBold',
                    fontSize: 15,
                    color: focused ? '#6a5be2' : 'gray',
                    }}
                    > Quiz</Text>
                    ),
                    title: 'QUIZBOLT',
                    drawerActiveTintColor: '#6a5be2',
                    headerStyle: {
                    backgroundColor: '#6a5be2',
                    elevation: 0
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                    fontFamily: 'QuicksandBold',
                    fontSize: 20,
                    },
                    headerTitleAlign: 'center',
                    drawerIcon: ({ focused }) => (
                    <Octicons
                        name="light-bulb"
                        size={20}
                        color={focused ? '#6a5be2' : 'gray'}
                        marginTop={6}
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
