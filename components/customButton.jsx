import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import images from '../constants/images'

const CustomButton = ({ title, handlePress, containerStyle, textStyles, isLoading, showImage }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[56px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`} disabled={isLoading}>
            <View className="flex-row justify-center items-center gap-2">
                <Text className={`text-black  text-lg font-ubold  ${textStyles}`}>{title}</Text>
                {showImage ? <Image source={images.rightArrow2} className="w-[25px] h-[25px] " resizeMode="contain" /> : null}
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton