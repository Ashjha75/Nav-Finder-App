import { View, Text, SafeAreaView, Image, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../constants/images'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import CustomButton from '../../components/customButton'
import { useGlobalContext } from '../../context/GlobalProvider'
import useApi from '../../utils/services/baseservice'
import Loader from '../../components/loader'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import CustomModal from '../../components/customModal'

const Driver = () => {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { user, setUser } = useGlobalContext();
  const [values, setValues] = useState(null)
  const [showModal, setShowModal] = useState({});
  const { post, loading } = useApi();

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
  const preferedPlace = async () => {
    try {
      if (!values) {
        return;
      }
      setShowModal({
        isVisible: false,
        value: "",
        type: "success"
      })
      const url = "/driver/preferedLocation";
      const customHeaders = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.accessToken}`,
      };
      const response = await post(url, values, customHeaders);
      if (response.success) {
        setShowModal({
          isVisible: true,
          value: response.message,
          type: 'success',
          showConfirm: false
        });
        // await SecureStore.setItemAsync('accessMedium',response.data);
        setUser(prev => ({ ...prev, accessMedium: response.data }));
        router.push("/vehicleType")

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
    <SafeAreaView className="bg-primary h-full w-full px-4 mt-3">
      {loading ? <Loader /> : (
        <>
          <View className="flex justify-center mt-2 mb-4">
            <View className="flex-row px-4 items-center mt-8 justify-between">
              <Text className="text-secondary font-medium text-2xl">Driver Preferred Place</Text>
              <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

            </View>
            <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter your preferred location. This will be used to match you with rides in your area.</Text>
          </View>
          <Text className=" px-4 mt-8 mb-1 text-textcolor text-lg font-ubold">Preferred Place</Text>
          <GooglePlacesAutocomplete
            placeholder='
                   ⚪  Pickup Location'
            onPress={(data, details = null) => {
              setValues({
                preferredPlace: data.description,
                location: [details.geometry.location.lat, details.geometry.location.lng]
              })
              // 'details' is provided when fetchDetails = true
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
            autoFocus={true}
            textInputProps={{ placeholderTextColor: '#fff' }}
            styles={{
              container: {
                flex: 1,
                width: '100%',
                height: 60,
              },

              textInputContainer: {
                backgroundColor: '#000',
                height: 60,
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
                marginTop: -5,
                position: 'absolute',
                top: 60,
                zIndex: 1,
                backgroundColor: '#000',
                width: '100%',
              },
              description: {
                color: '#fff'
              },
              row: {
                backgroundColor: '#000', // This controls the background color of the dropdown items
              },

            }}
          />
          {!keyboardOpen && <><CustomButton title="Confirm Destination" containerStyle="absolute bottom-40 ml-4 w-full" handlePress={() => preferedPlace()} /><CustomButton title="Cancel" containerStyle="absolute bottom-20 ml-4 w-full bg-[#1e5546] " textStyles="text-white" handlePress={() => router.back()} /></>}

        </>)}
      {showModal.isVisible && <CustomModal data={showModal} />}
    </SafeAreaView>
  )
}

export default Driver