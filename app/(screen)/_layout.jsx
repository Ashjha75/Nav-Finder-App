import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const ScreenLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name='mapViewer'
                    options={{
                        headerShown: false
                    }}
                />

            </Stack>
            <StatusBar backgroundColor='#161622' style='light' />
        </>
    )
}

export default ScreenLayout