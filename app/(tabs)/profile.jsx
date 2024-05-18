import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import icons from '../../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  router } from 'expo-router'
import VehicleOptions from '../../components/vehicleoptions'
import ProfileCards from '../../components/profileCards'
import ProfileOptions from '../../components/profileOptions'
import CustomModal from '../../components/customModal'
import useApi from '../../utils/services/baseservice'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as SecureStore from 'expo-secure-store';
import Loader from '../../components/loader'
const Profile = () => {
    const { post } = useApi();
    const { user} = useGlobalContext();
    const [showModal, setShowModal] = useState(false);
    const signOutUser = async () => {
        try {
            const url = "/auth/logout";
            const customHeaders = {
                Authorization: `Bearer ${user.accessToken}`,
            };
            const response = await post(url, {}, customHeaders);
            if (response.success) {
                await SecureStore.deleteItemAsync('accessToken');
                console.log(await SecureStore.getItemAsync('accessToken'))
                router.replace('/sign-in')
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
                    type: 'error',
                    cancel: () => {
                        setShowModal((prev) => ({ ...prev, isVisible: false }));
                    }
                });
            } else {
                // Handle cases where response or its properties are undefined
                console.log("Unexpected error format:", error);
            }
        }
    }
    const handlePress = () => {
        setShowModal({
            isVisible: true,
            value: "Do you want to sign out?",
            type: 'info',
            confirm: () => {
                setShowModal((prev) => ({ ...prev, isVisible: false }));
                signOutUser();
            },
            cancel: () => {
                setShowModal((prev) => ({ ...prev, isVisible: false }));
            },
            showConfirm:true
        });
    };
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            {(user ) ? <><TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}><Image source={icons.close} className="w-5 ml-5 mt-3 h-5" /></TouchableOpacity>
                <View className=" mt-7 h-24 px-4 flex-row justify-between items-center pb-3">
                    <View className="w-[60%]"><Text className="text-3xl text-white font-bold">{user.firstName + ' ' + user.lastName}</Text>
                        <Text className="text-lg text-textcolor font-ubold">{user.userName}</Text>
                        <View className="flex-row justify-between w-[55%] items-center">
                            <View className="h-7 bg-darkgray w-16 rounded-lg flex-row justify-center items-center"><Image source={icons.star} className="w-3 h-3 " resizeMode="contain" />
                                <Text className="text-secondary text-sm font-bold pl-2">5.0</Text>
                            </View>
                            {user?.isDriver ? <Image source={icons.driver} className="w-5 h-5" /> : null}
                        </View>
                    </View>
                    <View ><Image source={{ uri: user?.avatar.url }} className="w-20 h-20 rounded-full " /></View>
                </View>
                <ScrollView>

                    <View className="flex-row justify-evenly items-center">
                        <VehicleOptions vehicleType="lifesaver" prmoapplied={false} title="Help" iconCss="w-9 h-20" profile={true} />
                        <VehicleOptions vehicleType="wallet" prmoapplied={false} title="Payment" iconCss="w-9 h-20" profile={true} />
                        <VehicleOptions vehicleType="activity" prmoapplied={false} title="Activity" iconCss="w-8 h-12" profile={true} /></View>

                    <View className="mt-7 mb-4 px-4 border-[1px] border-b-darkgray">
                        <ProfileCards />
                    </View>
                    <View>
                        <ProfileOptions />
                    </View>
                    <TouchableOpacity activeOpacity={0.7} className="my-6 ml-8   h-12 w-[30%] " onPress={() => handlePress()}><Text className=" font-umedium text-lg text-red-400"  >Sign out</Text></TouchableOpacity>

                </ScrollView>
                {showModal.isVisible && <CustomModal data={showModal} title="Sign-out" />}</> : <Loader />}

        </SafeAreaView>
    )
}

export default Profile