import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import { useLocalSearchParams } from 'expo-router'
import CustomModal from '../../components/customModal'
import { useGlobalContext } from '../../context/GlobalProvider'
import useApi from '../../utils/services/baseservice'
import Loader from '../../components/loader'

const Activity = () => {
    const { user } = useGlobalContext();
    const { get } = useApi()
    const params = useLocalSearchParams();
    const [showModal, setShowModal] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (params.message) {
            setShowModal({
                isVisible: true,
                value: params.message,
                type: 'success',
                cancel: () => {
                    setShowModal((prev) => ({ ...prev, isVisible: false }));
                },
            })
        }
        ; (async () => {
            try {
                setLoading(true);
                const url = "finder/getRides";
                const customHeaders = {
                    "Authorization": `Bearer ${user.accessToken}`,
                };
                const response = await get(url, {}, customHeaders);
                if (response.success) {
                    console.log(response.data)
                    setResult(response.data)
                } return
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    setShowModal({
                        isVisible: true,
                        value: error.response.data.message,
                        type: 'error',
                        cancel: () => {
                            setShowModal((prev) => ({ ...prev, isVisible: false }));
                        },
                    });
                } else {
                    // Handle cases where response or its properties are undefined
                    setShowModal({
                        isVisible: true,
                        value: error.message,
                        type: 'error',
                        showConfirm: false,
                        cancel: () => {
                            setShowModal((prev) => ({ ...prev, isVisible: false }));
                        },
                    })
                    console.log("Unexpected error format:", error);
                }
            } finally {
                setLoading(false); // Set loading to false when the form submission is done
            }
        })()

    }, [params.message])

    return (
        <SafeAreaView className="w-full h-full bg-primary px-3">
            {
                loading ? <Loader /> : (<>
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
                        {(result && result.length == 0) ? <Text className="mt-7 text-xl font-umedium text-white">You don't have any recent activity.</Text>:<View>
                            
                            {result.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        key={index}
                                        className={`border-2  border-darkgray rounded-lg overflow-hidden flex-row justify-between items-center `}
                                    >
                                        <View className="w-[70%] ml-3 my-2">
                                            <Text className="w-[95%]  text-white text-lg font-ubold">{item.title}</Text>
                                            <View className="flex-row items-center">
                                                <Text className="text-white font-pregular text-sm">{item.date}</Text>
                                            </View>
                                        </View>
                                        <View className="w-[30%] ">
                                            <Image source={images.uberP} className="w-20 h-20" resizeMode="contain" />
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                            
                            </View>}
                    </ScrollView>
                </>)
            }
            {showModal.isVisible && <CustomModal data={showModal} />}
        </SafeAreaView>
    )
}

export default Activity