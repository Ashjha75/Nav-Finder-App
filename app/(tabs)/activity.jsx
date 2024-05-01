import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'

const Activity = () => {
    return (
        <SafeAreaView className="w-full h-full bg-primary px-3">
            <ScrollView>
                <View className="w-full h-10 mt-5 "><Text className="text-3xl  font-bold text-white">Activity</Text></View>
                <View >
                    <Text className="text-xl mt-4 mb-2 text-white font-ubold">Upcoming</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        className={`border-2  border-darkgray rounded-lg overflow-hidden flex-row justify-between items-center `}
                    >
                        <View className="w-[70%] ml-3 my-2">
                            <Text className="w-[95%]  text-white text-lg font-ubold">You have no upcoming trips</Text>
                            <View className="flex-row items-center">
                                <Text className="text-white font-pregular text-sm">reserve your trip <Image source={images.rightArrow} className="w-5 h-5" /></Text>
                            </View>
                        </View>
                        <View className="w-[30%] ">
                            <Image source={images.uberP} className="w-20 h-20" resizeMode="contain" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-between mt-5 items-center">
                    <Text className="text-xl  mb-2 text-white font-ubold">Past</Text>
                    <TouchableOpacity className="bg-darkgray w-9 h-9 flex justify-center items-center rounded-full"><Image source={images.bars} className="w-5 h-4" resizeMode='contain' /></TouchableOpacity>
                </View>
                <Text className="mt-7 text-xl font-umedium text-white">You don't have any recent activity.</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Activity