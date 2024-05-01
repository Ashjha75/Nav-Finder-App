import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import images from '../constants/images'
import { router } from 'expo-router'
import icons from '../constants/icons'

const RideInputs = () => {
    return (
        <View className="w-full h-full px-3">
            <View className="flex-row   "><TouchableOpacity onPress={() => router.back()}><Image source={images.rightArrow} className="w-7 h-7 rotate-180" /></TouchableOpacity>
                <Text className="text-white text-2xl font-ubold w-[80%]  text-center">Plan your trip</Text>
            </View>
            <View className="w-full mt-2 mb-1 h-14 justify-start gap-x-1  flex-row ">
                <TouchableOpacity>
                    <View className="h-9 bg-darkgray w-fit rounded-3xl flex-row justify-center items-center"><Image source={icons.clock} className="w-5 h-5 px-5" resizeMode="contain" />
                        <Text className="text-secondary text-sm font-bold">Pick-Up Now</Text>
                        <Image source={icons.downarrow} className="w-3 h-3 px-6" resizeMode="contain" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="h-9 bg-darkgray  w-fit rounded-3xl flex-row justify-center items-center"><Image source={icons.profile} className="w-3 h-3 px-5" resizeMode="contain" />
                        <Text className="text-secondary text-sm font-bold">For me</Text>
                        <Image source={icons.downarrow} className="w-3 h-3 px-6" resizeMode="contain" />
                    </View>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-start gap-x-4 items-center">
                <View className=" h-20 border-2 flex-row border-white w-[80%] rounded-xl">
                    <View className=" w-[20%] h-full flex justify-center items-center ">
                        <Image source={icons.circle} className="w-4 h-4 " />
                        <View className="bg-white h-5 w-1"></View>
                        <Image source={icons.square} className="w-4 h-4 " />
                    </View>
                    <View className="w-[80%]"><TextInput className="font-ubold text-white w-full h-[49%] px-2" placeholder='Where To?' placeholderTextColor="#424242" /><View className="w-full h-[1px] bg-darkgray"></View>
                        <TextInput className="font-ubold text-white w-full h-[49%] px-2" placeholder='Where To?' placeholderTextColor="#424242" /></View>
                    <View></View>
                </View>
                <TouchableOpacity>
                    <Image source={icons.plus} className="w-9 h-9 " />
                </TouchableOpacity>
            </View>
            <View className="flex-row py-1 w-full mt-3 justify-center items-center border-b-[1px] border-darkgray">
                <View className="flex-row gap-x-5 justify-start items-center w-[50%] "><Image source={icons.home} className="w-4 h-4 " /><Text className="text-white font-umedium text-base ">Add Home</Text></View>
                <View className="flex-row w-[50%] justify-center items-center  gap-x-6"><Image source={images.briefcase} className="w-4 h-4 " /><Text className="text-white font-umedium text-base ">Add Work</Text></View>
            </View>
            <TouchableOpacity onPress={() => router.push("/mapViewer")} className="px-5  border-b-[1px] border-darkgray py-1 items-center flex-row">
                <View className=" w-7 h-7 rounded-full justify-center items-center flex-row">
                    <Image source={icons.location} className="w-5 h-5 " resizeMode="contain" />
                </View>
                <View className="mx-3">
                    <Text className="text-sm font-ubold text-white">Ghaziabad</Text>
                    <Text className="text-xs text-zinc-300">Uttar Pradesh</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/mapViewer")} className="px-5  border-b-[1px] border-darkgray py-1 items-center flex-row">
                <View className=" w-7 h-7 rounded-full justify-center items-center flex-row">
                    <Image source={icons.location} className="w-5 h-5 " resizeMode="contain" />
                </View>
                <View className="mx-3">
                    <Text className="text-sm font-ubold text-white">Delhi</Text>
                    <Text className="text-xs text-zinc-300">Dilshad Garden</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RideInputs