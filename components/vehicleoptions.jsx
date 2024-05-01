import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import images from '../constants/images'

const VehicleOptions = ({ vehicleType, prmoapplied, title, iconCss, profile }) => (
    <TouchableOpacity onPress={() => console.log('Navigate to /home')} activeOpacity={0.7} >
        <View className={`mt-10 bg-[#333] ${profile ? "w-24" : "w-20"} h-[90px]  rounded-md mx-1 justify-center items-center`}>
            {prmoapplied ? (
                <Text className="text-secondary bg-[#378350e1] absolute -top-4 w-14 text-sm h-6 rounded-3xl text-center">Promo</Text>
            ) : null}
            <Image source={images[vehicleType]} className={`${iconCss} mx-5 mb-5`} resizeMode="contain" />
            <Text className="absolute bottom-1 font-ubold text-[#e5e5e5] ">{title}</Text>
        </View>
    </TouchableOpacity>
);

export default VehicleOptions;