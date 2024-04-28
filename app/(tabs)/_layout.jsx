import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '../../constants/icons'

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image source={icon}
                resizeMode='contain'
                tintColor={color}
                className="w-6 h-6"
            />
            <Text className={`text-xs ${focused ? 'font-psemibold' : 'font-pregular'}`} style={{ color: color }}>{name}</Text>
        </View>
    )
}
const TabsLayout = () => {
    return (
        <>
            <Tabs screenOptions={{
                tabBarShowLabel: false, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "#8c8c8c",
                tabBarStyle: {
                    backgroundColor: "#000000",
                    borderTopWidth: 0.7,
                    borderTopColor: "#383838",
                    height: 60,
                }

            }}>
                <Tabs.Screen name="home" options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />)
                }} />
                <Tabs.Screen name="services" options={{
                    title: 'Services',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.service}
                            color={color}
                            name="Services"
                            focused={focused}
                        />)
                }} />
                <Tabs.Screen name="activity" options={{
                    title: 'Activity',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.activity}
                            color={color}
                            name="Activity"
                            focused={focused}
                        />)
                }} />
                <Tabs.Screen name="profile" options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profile"
                            focused={focused}
                        />)
                }} />
            </Tabs>
        </>
    )
}

export default TabsLayout;