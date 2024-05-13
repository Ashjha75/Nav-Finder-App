import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
const AuthLayout = () => {
    return (
        <>

            <Stack className="bg-primary">
                <Stack.Screen
                    name='sign-in'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='sign-up'
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='onboarding'
                    options={{
                        headerShown: false
                    }}
                />
            </Stack>
            <StatusBar backgroundColor='#000' style='light' />
        </>
    )
}

export default AuthLayout
