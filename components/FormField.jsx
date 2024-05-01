import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'

import icons from '../constants/icons'
import { useState } from 'react';

const FormField = ({ title, value, placeholder, handleChangeText, handleBlur, error, touched, secureTextEntry, otherStyle, ...props }) => {
    const isPassword = title === 'Password';
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2  ${otherStyle}`}>
            <Text className="text-base text-[#e0e0e0] font-pmedium">{title}</Text>
            <View className="w-full h-16 px-4  border-2 border-[#212121] rounded-2xl focus:border-[#909191] items-center flex-row">
                <TextInput
                    className="flex-1 text-white text-base font-pbold"
                    value={value}
                    onChangeText={handleChangeText}
                    onBlur={() => handleBlur(title)}
                    placeholder={placeholder}
                    secureTextEntry={isPassword && !showPassword}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' />
                    </TouchableOpacity>
                )}
            </View>
            {touched && error && (
                <Text className="text-red-500 text-sm font-pregular pl-3">{error}</Text>
            )}
        </View>
    )
}

export default FormField