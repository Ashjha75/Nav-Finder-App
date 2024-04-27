import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { Link } from 'expo-router'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    return (
        <SafeAreaView className="bg-black h-full w-full flex-col justify-center ">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                {/* <View className=" flex-row px-4 items-center mt-4 justify-between">
                    <Text className="text-white font-medium text-4xl  ">NavFinder</Text>
                    <Image source={images.logo} className=" w-[30px] bg-white  h-[30px] rounded-lg" resizeMode="contain" />
                </View> */}
                <View className="flex  justify-center min-h-[85vh]">
                    <View className="mt-10 px-5">
                        <Text className="text-white font-medium text-5xl  ">SignIn</Text>
                        {/* <Text className="text-[#e0e0e0] font-pregular text-lg mt-2 pl-1 ">Experience Seamless Rides: Sign In to Your Account</Text> */}
                    </View>
                    <View className="mt-5 px-5">
                        <FormField
                            title="Email"
                            placeholder="Email Address"
                            value={form.email}
                            handleChangeText={(e) => setForm({ ...form, email: e })}
                            otherStyle="mt-7"
                            keyboardType="email-address"
                        />
                        <FormField
                            title="Password"
                            value={form.password}
                            handleChangeText={(e) => setForm({ ...form, password: e })}
                            otherStyle="mt-7"
                            keyboardType="password"
                        />
                        <CustomButton title="Sign In" containerStyle="mt-10" />
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-gray-100 font-pregular">Don't have an account? <Link href="/sign-up" className="text-secondary underline">Sign Up</Link></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn