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
                    name='changePassword'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='driver'
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
                <Stack.Screen
                    name='vehicleType'
                    options={{
                        headerShown: false
                    }}
                />
                


            </Stack>
            <StatusBar backgroundColor='#000' style='light' />
        </>
    )
}

export default ScreenLayout