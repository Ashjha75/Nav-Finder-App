import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'


import icons from '../constants/icons'
const FormField = ({ title, value, placeholder, handleChangeText, otherStyle, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className={`space-y-2  ${otherStyle}`}>
            <Text className="text-base text-[#e0e0e0] font-pmedium">{title}</Text>
            <View className="w-full h-16 px-4  border-2 border-[#212121] rounded-2xl focus:border-[#454545] items-center flex-row">
                <TextInput
                    className="flex-1 text-white text-base font-pbold"
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChangeText}
                    placeholderTextColor="#6e7a7a"
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField