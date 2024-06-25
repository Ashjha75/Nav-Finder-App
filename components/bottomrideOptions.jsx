import { View, Text, Image, TouchableOpacity, TextInput, Keyboard, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../constants/images'
import icons from '../constants/icons'
import { useLocation } from '../context/userLocationContext'
import useApi from '../utils/services/baseservice'
import { useGlobalContext } from '../context/GlobalProvider'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton from './customButton'
import Loader from './loader'
import { useToast } from 'react-native-toast-notifications'
import { router, useRouter } from 'expo-router'
const BottomRideOptions = ({ distance, time, back, reset }) => {
    const routes = useRouter();
    const toast = useToast();

    const { fromLocation, toLocation } = useLocation();
    const { post } = useApi();
    const { user, } = useGlobalContext();
    const [result, setResult] = useState(null)
    const [showModal, setShowModal] = useState({});
    const [document, setDocument] = useState({});
    const [reqbody, setReqbody] = useState()
    const showToast = () => {
        toast.show("Ride Booked Successfully", {
            type: "success",
            duration: 5000,
            position: "top",
            offset: 40,
            animationType: "zoom-in",
        });
    }
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        ; (async () => {
            try {
                const body = {
                    distance: Number(distance.split(" km")[0].replace(',', '')),
                    travelTime: Number(time)
                }
                setShowModal({
                    isVisible: false,
                    value: "",
                    type: "success"
                });
                const customHeaders = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                };
                setLoading(true);
                const url = "/finder/getAfterLocation";
                const response = await post(url, body, customHeaders);
               if(response.success){
                setResult(response.data)
                setDocument(response.data[0])
                setReqbody({
                    distance: Number(distance.split(" km")[0].replace(',', '')),
                    duration: Number(time),
                    pickupLocation: {
                        type: fromLocation.type,
                        coordinates: [fromLocation.longitude, fromLocation.latitude]
                    },
                    dropoffLocation: {
                        type: toLocation.type,
                        coordinates: [toLocation.longitude, toLocation.latitude]
                    },
                    vehicleType: response.data[0].vehicleType,
                    estimatedFare: response.data[0].totalFare,
                    paymentMethod: "credit_card",
                })
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
            finally {
                setLoading(false)
            }
        })()
    }, [distance, time])
    const handleBook = async () => {
        try {
            setLoading(true);
            const body = reqbody;
            setShowModal({
                isVisible: false,
                value: "",
                type: "success"
            });
            // showToast()
            // return
            const customHeaders = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            };
            const url = "/finder/bookRide";
            const response = await post(url, body, customHeaders);
            if (response.success) {
                reset()
                routes.push({ pathname: "/activity", params: { message: response.message } });
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
        finally {
            setLoading(false)
        }
    }
    return (
        <View className="w-full h-full px-3">
            <View className="flex-row   "><TouchableOpacity onPress={() => reset()}><Image source={images.rightArrow} className="w-7 h-7 rotate-180" /></TouchableOpacity>
                <Text className="text-textcolor text-base font-ubold w-[80%]  text-center">Prices are lower than usual</Text>
            </View>
            <View className="w-full mt-2 mb-1 h-14 justify-start gap-x-1  flex-row ">
                <TouchableOpacity>
                    <View className="h-7 bg-darkgray w-fit rounded-3xl flex-row justify-center items-center"><Image source={icons.clock} className="w-5 h-5 px-5" resizeMode="contain" />
                        <Text className="text-secondary text-sm font-bold">Pick-Up Now</Text>
                        <Image source={icons.downarrow} className="w-3 h-2 px-6" resizeMode="contain" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View className="h-7 bg-darkgray  w-fit rounded-3xl flex-row justify-center items-center"><Image source={icons.profile} className="w-3 h-3 px-5" resizeMode="contain" />
                        <Text className="text-secondary text-sm font-bold">For me</Text>
                        <Image source={icons.downarrow} className="w-3 h-2 px-6" resizeMode="contain" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                loading ? (<Loader />):
                    (<>
                        <ScrollView className="w-full h-52">
                            {
                                result && result.map((item) => {
                                    return (
                                        <TouchableOpacity key={item.vehicleType} onPress={() => {
                                            setDocument(item); setReqbody((prev) => ({
                                                ...prev,
                                                vehicleType: item.vehicleType,
                                                estimatedFare: item.totalFare,
                                            }));
                                        }} activeOpacity={0.7} className={`my-1 rounded-2xl h-[90px] flex-row justify-center items-center mx-1 border-2 ${item.vehicleType == document.vehicleType ? "border-white" : ''} `}>
                                            <Image source={images[item.image]} className={`w-24 mr-2 h-24 ${item.vehicleType == "Shuttle Bus" || item.vehicleType == "Packages" ? 'w-16 h-16' : ''}`} resizeMode='contain' />
                                            <View className="flex-col w-[46%]">
                                                <View className="flex-row justify-left items-center">
                                                    <Text className=" text-secondary text-ubold text-lg">{item.vehicleType}</Text>
                                                    <Image source={icons.user} className="w-3 h-3 ml-2" /><Text className=" text-secondary text-xs">{item.person}</Text>
                                                </View>
                                                <Text className=" text-secondary text-pregular text-sm">{item.away} mins away</Text>
                                                <Text className=" text-stone-400 text-pregular text-xs">{item.title}</Text>
                                            </View>
                                            <Text className="w-[26%]   text-white font-bold text-lg text-center">₹{item.totalFare}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                        <View className="w-full h-fit flex-row justify-center my-2 py-2 items-center">
                            <CustomButton title="Book Now" containerStyle="w-[90%] h-12 my-2" handlePress={() => handleBook()} />
                        </View>
                    </>) 
            }
        </View>
    )
}

export default BottomRideOptions