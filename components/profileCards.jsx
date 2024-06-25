import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '../constants/images'
import profileCard from '../constants/profileCard'
const ProfileCards = () => {
    return (
        <>
            {profileCard.map((item) => {
                return (<TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    className="rounded-xl my-2 bg-darkgray overflow-hidden flex-row justify-between items-center h-24"
                >
                    <View className="w-[70%] ml-3">
                        <Text className=" mb-1 text-white text-lg font-ubold">{item.title}</Text>
                        <View className="flex-row items-center">
                            <Text className="text-[#e4e4e4] font-pregular text-xs">{item.subtitle}</Text>
                        </View>
                    </View>
                    <View className="w-[38%] ml-1 bg-[#333333e8] h-24  pl-3 py-4">
                        <Image source={images[item.imagePath]} className="w-16 h-16" resizeMode="cover" />
                    </View>
                </TouchableOpacity>)
            })}
        </>
    )
}

export default ProfileCards