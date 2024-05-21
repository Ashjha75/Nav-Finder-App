import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../constants/images'
import { router } from 'expo-router'
import icons from '../constants/icons'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useLocation } from '../context/userLocationContext'
import CustomButton from './customButton'
import axios from 'axios'
import BottomRideOptions from './bottomrideOptions'
// import {location } from "../context/userLocationContext";
const RideInputs = () => {
    const { location, setLocation, fromLocation, setFromLocation, toLocation, setToLocation } = useLocation();
    const [textinputValid, setTextinputValid] = useState({
        to: false,
        from: false
    })
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [RideBook, setRideBook] = useState(null);
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
      
      useEffect(() => {
        // Add event listeners for keyboard show and hide events
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardOpen(true);
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardOpen(false);
          }
        );
        
        // Clean up the event listeners when the component unmounts
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);
      const getDistanceAndDuration = async (fromLocation, toLocation) => {
        const from = `${fromLocation.latitude},${fromLocation.longitude}`;
        const to = `${toLocation.latitude},${toLocation.longitude}`;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${from}&destinations=${to}&key=YOUR_API_KEY`);
        const data = response.data;
        const distance = data.rows[0].elements[0].distance.text;
        const duration = data.rows[0].elements[0].duration.text;
        const durationInSeconds = data.rows[0].elements[0].duration.value;
        const durationInMinutes = Math.round(durationInSeconds / 60);
        setRideBook({
            distance: distance,
            time:durationInMinutes,
            show:true
        })
      };
      const backToRideInput = (newState) => {
        setRideBook({
            distance: distance,
            time:durationInMinutes,
            show:false
        })
      };
    return (
        <>
      {
        (!RideBook)?  <View className="w-full h-full px-3">
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
        <View className="flex-row mb-4 w-full -mt-1 pb-1 justify-center items-center border-b-[1px] border-darkgray">
            <View className="flex-row gap-x-5 justify-start items-center w-[50%] "><Image source={icons.home} className="w-4 h-4 " /><Text className="text-white font-umedium text-base ">Add Home</Text></View>
            <View className="flex-row w-[50%] justify-center items-center  gap-x-6"><Image source={images.briefcase} className="w-4 h-4 " /><Text className="text-white font-umedium text-base ">Add Work</Text></View>
        </View>
           <>
            <GooglePlacesAutocomplete
                placeholder='
                ⚪  Pickup Location'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setTextinputValid({
                        to: true
                    })
                    console.log(textinputValid)
                    setFromLocation({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
                }}
                query={{
                    key: 'YOUR_API_KEY',
                    language: 'en',
                    components: 'country:in',
                }}
                minLength={3}
                debounce={500}
                fetchDetails={true}
                enablePoweredByContainer={false}
                returnKeyType={'search'}
                predefinedPlaces={[homePlace, workPlace]}
                autoFocus={true}
                defaultValue={location}
                textInputProps={{ placeholderTextColor: '#fff' }}
                styles={{
                   
                    textInputContainer: {
                        backgroundColor: '#000',
                        height: 40,
                        marginBottom: 10,
                        paddingBottom: 10,
                    },
                    textInput: {
                        height: 40,
                        color: '#fff',
                        fontSize: 16,
                        backgroundColor: '#000',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 12,
                        placeholderTextColor: '#fff',
                    },
                    listView: {
                        marginTop:-5,
                        position: 'absolute',
                        top: 60,
                        zIndex:1,
                        backgroundColor: '#000',
                        width:'100%'
                    },
                    description:{
                        color:'#fff'
                    },
                    row: {
                        backgroundColor: '#000', // This controls the background color of the dropdown items
                      },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
            <GooglePlacesAutocomplete
                placeholder=' ◻️   Destination'
                onPress={(data, details = null) => {
                    setToLocation({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng});
                    setTextinputValid({
                        from: true
                    })
                    console.log(textinputValid)
                }}
                query={{
                    key: 'YOUR_API_KEY',
                    language: 'en',
                    components: 'country:in',
                }}
                minLength={3}
                debounce={500}
                fetchDetails={true}
                enablePoweredByContainer={false}
                returnKeyType={'search'}
                textInputProps={{ placeholderTextColor: '#fff' }}
                styles={{
                    container: {
                        position: 'absolute',
                        top: 205,
                        left: 10,
                        width: '100%',
                        zIndex:0,
                        marginHorizontal:5,
                        width:"98.7%"
                    },
                    textInputContainer: {
                        backgroundColor: '#000',
                        height: 40,
                        marginBottom: 10,
                        paddingBottom: 10,
                    },
                    placeholderTextColor:{
                        color:"#fff"
                    },
                    textInput: {
                        height: 40,
                        color: '#fff',
                        fontSize: 16,
                        backgroundColor: '#000',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 12,
                        placeholderTextColor: '#fff',
                    },
                    listView: {
                        marginTop:-5,
                        position: 'absolute',
                        top: 60,
                        zIndex:10,
                        backgroundColor: '#000',
                        width:'100%',
                        marginBottom:20
                    },
                    description:{
                        color:'#fff'
                    },
                    row: {
                        backgroundColor: '#000', // This controls the background color of the dropdown items
                      },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}
            />
            {
                !keyboardOpen ? <View className=" -z-50">
                <CustomButton title="Confirm Destination" containerStyle={`my-5  mx-auto w-[95%] ${(fromLocation != null && toLocation!=null)?"bg-[#666]":"bg-yellow-500"}`} handlePress={()=> {
                    if (fromLocation && toLocation) {
                        getDistanceAndDuration(fromLocation, toLocation);
                      }
                }} />
            </View>:null
            }
            
            </>
        
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
    </View>:""
      }
        {(fromLocation != null && toLocation!=null && (RideBook && RideBook.show)) ? <BottomRideOptions distance={RideBook?RideBook.distance:null} time={RideBook?RideBook.time:null} back={backToRideInput}/> : null}</>
    )
}

export default RideInputs