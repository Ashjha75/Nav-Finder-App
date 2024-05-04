import React, { useEffect, useState } from 'react'
import { Stack, SplashScreen } from 'expo-router'
import { useFonts } from 'expo-font'
// import { GlobalProvider } from '../context/GlobalProvider';
import * as Location from 'expo-location';
import { UserLocationContext } from '../context/userLocationContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    // access location of user
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        "Uber-Bold": require("../assets/fonts/Uber-Bold.ttf"),
        "Uber-Medium": require("../assets/fonts/Uber-Medium.ttf"),
        "Uber-Regular": require("../assets/fonts/Uber-Regular.ttf"),
    });

    useEffect(() => {

        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    if (!fontsLoaded && !error) {
        return null;
    }
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
        // <GlobalProvider>
        <UserLocationContext.Provider value={{ location, setLocation }}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <Stack>
                        <Stack.Screen name='index' options={{ headerShown: false }} />
                        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
                        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                        <Stack.Screen name='(screen)' options={{ headerShown: false }} />
                    </Stack>
                </BottomSheetModalProvider>
            </GestureHandlerRootView ></UserLocationContext.Provider>
        // </GlobalProvider>
        // stack is a container that holds multiple screens similar to react fragments
    )
}

export default RootLayout

