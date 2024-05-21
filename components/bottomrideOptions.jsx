import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../constants/images'
import { router } from 'expo-router'
import icons from '../constants/icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useLocation } from '../context/userLocationContext'
import CustomButton from './customButton'
import axios from 'axios'
import useApi from '../utils/services/baseservice'
import { useGlobalContext } from '../context/GlobalProvider'
// import {location } from "../context/userLocationContext";
const BottomRideOptions = ({distance,time,back}) => {
    console.log(distance.split(" km")[0],time)
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const { user,setUser} = useGlobalContext();
    useEffect(() => {
        ; (async () => {
            try {
                const body ={
                    "distance": 10.5,
                    "travelTime": 30
                  }
                setShowModal({
                    isVisible: false,
                    value: "",
                    type: "success"
                }) ;
                const customHeaders = {
                    "Content-Type":"multipart/form-data",
                    "Authorization": `Bearer ${user.accessToken}`,
                };
                const url = "/finder/getAfterLocation";
                const response = await post(url, body,customHeaders);
              console.log(response)
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
    }, [distance,time])
    const { location, setLocation, fromLocation, setFromLocation, toLocation, setToLocation } = useLocation();
    const [textinputValid, setTextinputValid] = useState({
        to: false,
        from: false
    })
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    // console.log("ride",location)
    const homePlace = {
        description: 'Home',
        geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
      };
      const workPlace = {
        description: 'Work',
        geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
      };
      const mapviewHandler =()=>{
        if(fromLocation != null && toLocation!=null){
            router.push("/mapViewer")
        }
        else{
            return
        }
      }
    
    
    return (
        <View className="w-full h-full px-3">
            <View className="flex-row   "><TouchableOpacity onPress={() => back()}><Image source={images.rightArrow} className="w-7 h-7 rotate-180" /></TouchableOpacity>
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
            
              
            
           {/* <TouchableOpacity onPress={() => router.push("/mapViewer")} className="px-5  border-b-[1px] border-darkgray py-1 items-center flex-row">
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
            </TouchableOpacity> */}
        </View>
    )
}

export default BottomRideOptions