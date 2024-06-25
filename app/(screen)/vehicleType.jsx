import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { router } from 'expo-router'
import CustomButton from '../../components/customButton'
import icons from '../../constants/icons'
import images from '../../constants/images'
import { useGlobalContext } from '../../context/GlobalProvider'
import useApi from '../../utils/services/baseservice'
import Loader from '../../components/loader'
import { ScrollView } from 'react-native-gesture-handler'
// import {location } from "../context/userLocationContext";
const VehicleType = () => {

    const { post, } = useApi();
    const { user, } = useGlobalContext();
    const [result, setResult] = useState(null)
    const [showModal, setShowModal] = useState({});
    const [document, setDocument] = useState({});
    const [reqbody, setReqbody] = useState()
    const toast = useToast();
    const showToast = () => {
        toast.show('Vehicle Updated', {
          type: 'success',
          placement: '',
          duration: 4000,
          offsetTop:1000,
          animationType: 'slide-in',
        });
      };
    useEffect(() => {
        ; (async () => {
            try {
                setShowModal({
                    isVisible: false,
                    value: "",
                    type: "success"
                });
                const body = {
                    "lookups": [
                        "vehicleTypes"
                    ]
                }
                setShowModal({
                    isVisible: false,
                    value: "",
                    type: "success"
                })
                const url = "/lookups";
                const response = await post(url, body);
                setResult(response.data)
                setReqbody((prev) => ({
                    ...prev,
                    vehicleType: response.data.vehicleTypes[0].vehicleType,
                }))
                setDocument(response.data.vehicleTypes[0])
                return;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {

                    setShowModal({
                        isVisible: true,
                        value: error.response.data.message,
                        type: 'error',
                    });
                } else {
                    // Handle cases where response or its properties are undefined
                    console.log("Unexpected error format:", error);
                }
            }
        })()
    }, [])
    const handleBook = async () => {
        try {
            const body = reqbody;
            if (!body) {
                return;
            }
            setShowModal({
                isVisible: false,
                value: "",
                type: "success"
            });
            const customHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
                "access-Medium": `Bearer ${user.accessMedium}`,
            };
            const url = "/driver/driverVehicleType";
            const response = await post(url, body, customHeaders);
            if (response.success) {
                showToast()
                router.push("/documentOptions");
            }
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {

                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
                    type: 'error',
                });
            } else {
                // Handle cases where response or its properties are undefined
                console.log("Unexpected error format:", error);
            }
        }
    }
    return (
        <SafeAreaView className="w-full h-full mt-3  bg-primary   px-3">
            <ScrollView>
                <View className="flex justify-center mt-2 mb-4">
                    <View className="flex-row px-4 items-center mt-8 justify-between">
                        <Text className="text-secondary font-medium text-2xl">Your Vehicle</Text>
                        <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                    </View>
                    <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter the type of vehicle you will drive. This will be used to match you with appropriate rides.</Text>
                </View>
                {
                    result ?
                        (< >
                            {
                                result.vehicleTypes.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.id} onPress={() => {
                                            setDocument(item); setReqbody((prev) => ({
                                                ...prev,
                                                vehicleType: item.vehicleType,
                                            }));
                                        }} activeOpacity={0.7} className={`my-1 rounded-2xl h-[90px] flex-row justify-center items-center mx-1 border-2 ${item.id == document.id ? "border-white" : ''} `}>
                                            <View className="w-[40%]">
                                                <Image source={images[item.image]} className={`w-28  h-28 ${item.vehicleType == "Bus" ? 'ml-4 w-16 h-16' : ''}`} resizeMode='contain' />
                                            </View>
                                            <View className="flex-col w-[60%]">
                                                <View className="flex-row justify-left items-center">
                                                    <Text className=" text-secondary text-ubold text-lg">{item.vehicleType}</Text>

                                                </View>
                                                <Text className=" text-stone-400 text-pregular text-sm">{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>

                                    )
                                })
                            }

                            <CustomButton title="Book Now" containerStyle="w-full mt-2  h-14" handlePress={() => handleBook()} />
                        </>) : (<Loader />)
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default VehicleType