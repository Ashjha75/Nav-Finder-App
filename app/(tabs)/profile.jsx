import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useRef } from 'react'
import icons from '../../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import VehicleOptions from '../../components/vehicleoptions'
import ProfileCards from '../../components/profileCards'
import ProfileOptions from '../../components/profileOptions'
import BottomModal from '../../components/bottomModal'
const Profile = () => {
    const bottomSheetModalRef = useRef(null);
    const handlePress = () => {
        setShowModal(true);
        bottomSheetModalRef.current.present();
    };
    const handleClose = () => {
        bottomSheetModalRef.current.dismiss();
        setShowModal(false);
    };

    // const handleSignOut = useCallback(() => {
    //     // Handle sign out logic here
    //     bottomSheetModalRef.current.dismiss();
    // }, []);

    // const handleCancel = useCallback(() => {
    //     bottomSheetModalRef.current.dismiss();
    // }, []);
    // if (show) {
    //     bottomSheetModalRef.current.present();
    // }
    const [showModal, setShowModal] = useState(false);
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()}><Image source={icons.close} className="w-5 ml-5 mt-3 h-5" /></TouchableOpacity>
            <View className=" mt-7 h-24 px-4 flex-row justify-between items-center pb-3">
                <View className="w-[60%]"><Text className="text-3xl text-white font-bold">Ashish Jha</Text>
                    <View className="flex-row justify-between w-[55%] items-center">
                        <View className="h-7 bg-darkgray w-16 rounded-lg flex-row justify-center items-center"><Image source={icons.star} className="w-3 h-3 " resizeMode="contain" />
                            <Text className="text-secondary text-sm font-bold pl-2">5.0</Text>
                        </View>
                        <Image source={icons.driver} className="w-5 h-5" />
                    </View>
                </View>
                <View ><Image source={{ uri: "https://burst.shopifycdn.com/photos/woman-does-bridge-pose-yoga-on-path.jpg?width=925&format=pjpg&exif=0&iptc=0" }} className="w-20 h-20 rounded-full " /></View>
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
                <TouchableOpacity activeOpacity={0.5} className="my-6 ml-8  h-12 w-[30%] "><Text className=" font-umedium text-lg text-red-400" onPress={() => handlePress()} >Sign out</Text></TouchableOpacity>

            </ScrollView>
            {showModal && <TouchableOpacity onPress={() => handleClose()} className="bg-[#131313af] h-full absolute top-10 z-50 w-full"></TouchableOpacity>}
            <BottomModal ref={bottomSheetModalRef} onClose={handleClose} />
        </SafeAreaView>
    )
}

export default Profile