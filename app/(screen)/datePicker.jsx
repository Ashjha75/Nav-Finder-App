import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const DatePicker = () => {
    return (
        <SafeAreaView className="bg-primary h-full w-full px-3">
            <View>
                <Text className="mt-10 text-3xl text-white">DatePicker</Text>
            </View>
        </SafeAreaView>
    )
}

export default DatePicker