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
        if(fromLocation.type === toLocation.type){
            alert("Pickup and destination cannot be the same")
            return;
        }
        const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${from}&destinations=${to}&key=AIzaSyC2GqpvPKsmomitPqiMK3XX9yA7hQynS_g`);
        const data = response.data;
        const distance = data.rows[0].elements[0].distance.text;
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
      const resetRide=()=>{
        setRideBook(null)
        setToLocation(null)
        setFromLocation(null)
      }
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
                    setTextinputValid({
                        to: true
                    })
                    setFromLocation({type:data.description,latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})
                }}
                query={{
                    key: 'AIzaSyC2GqpvPKsmomitPqiMK3XX9yA7hQynS_g',
                    language: 'en',
                    components: 'country:in',
                }}
                minLength={3}
                debounce={500}
                fetchDetails={true}
                enablePoweredByContainer={false}
                returnKeyType={'search'}
                autoFocus={true}
                defaultValue={location}
                textInputProps={{ placeholderTextColor: '#fff' }}
                styles={{
                   
                    textInputContainer: {
                        backgroundColor: '#000',
                        height: 60,
                        marginBottom: 30,
                        paddingBottom: 30,
                    },
                    textInput: {
                        height: 60,
                        color: '#fff',
                        fontSize: 20,
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
                    setToLocation({type:data.description,latitude:details.geometry.location.lat,longitude:details.geometry.location.lng});
                    setTextinputValid({
                        from: true
                    })
                }}
                query={{
                    key: 'AIzaSyC2GqpvPKsmomitPqiMK3XX9yA7hQynS_g',
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
                        top: 230,
                        left: 10,
                        width: '100%',
                        zIndex:0,
                        marginHorizontal:5,
                        width:"98.7%"
                    },
                    textInputContainer: {
                        backgroundColor: '#000',
                        height: 60,
                        marginBottom: 10,
                        paddingBottom: 10,
                    },
                    placeholderTextColor:{
                        color:"#fff"
                    },
                    textInput: {
                        height: 60,
                        color: '#fff',
                        fontSize: 20,
                        backgroundColor: '#000',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 12,
                        padding:20,
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
                <CustomButton title="Confirm Destination" containerStyle={`my-10  mx-auto w-[95%] ${(fromLocation != null && toLocation!=null)?"":"bg-[#666]"}`} handlePress={()=> {
                    if (fromLocation && toLocation) {
                        getDistanceAndDuration(fromLocation, toLocation);
                      }
                }} />
            </View>:null
            }
            
            </>
   
    </View>:""
      }
        {(fromLocation != null && toLocation!=null && (RideBook && RideBook.show)) ? <BottomRideOptions distance={RideBook?RideBook.distance:null} time={RideBook?RideBook.time:null} back={backToRideInput} reset={resetRide}/> : null}</>
    )
}

export default RideInputs