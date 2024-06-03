import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
    return (
        <>
            <Stack className="bg-primary">
                <Stack.Screen
                    name='mapViewer'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='datePicker'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
<<<<<<< HEAD
                    name='changePassword'
=======
                    name='otp'
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
<<<<<<< HEAD
                    name='driver'
=======
                    name='changePassword'
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='documentOptions'
                    options={{
                        headerShown: false
                    }}
                />
<<<<<<< HEAD
                <Stack.Screen
                    name='vehicleType'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='razorpay'
                    options={{
                        headerShown: false
                    }}
                />
=======


>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
            </Stack>
            <StatusBar backgroundColor='#000' style='light' />
        </>
    )
}

export default ScreenLayout