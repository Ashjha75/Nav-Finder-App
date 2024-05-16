import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import images from '../constants/images'

const PickFile = ({ title, value, handleBlur,handleChange, error, touched, otherStyle,setFieldValue }) => {
    const [imageUri, setImageUri] = useState(null)
    const openPicker = async (selectType) => {
        try {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: selectType === 'Image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  aspect: [4, 3],
                  quality: 1,
                });
              
                if (!result.canceled) {
                    setImageUri(result.assets[0].uri)
                    setFieldValue('file',result.assets[0].uri);
                    console.log("result",result.assets[0].uri)
                }

            // Handle the result here
        } catch (error) {
            console.error("Error launching image library", error);
        }
        
    }
  return (
    <View className="mt-7  space-y-2">
    <Text className="text-base text-[#e0e0e0] font-medium">{title}</Text>
    <TouchableOpacity
     value={value}
     handleChangeText={handleChange}
     handleBlur={handleBlur}
     error={error}
     touched={touched}
    onPress={() => openPicker("Image",setFieldValue)} className="">
       
        <View className="w-full h-24 px-4  border-2 border-[#212121] rounded-2xl focus:border-[#909191] items-center justify-center flex-col">
            {
                imageUri?(
                    <Image source={{ uri:imageUri }} className="w-full  h-20 rounded-2xl " useNativeControls resizeMode="conatin" isLooping />  
                ):(
                    <>
                    <Image source={images.upload} resizeMode='contain' className="h-8 w-8" />
                    <Text className="text-sm mt-2 text-gray font-pmedium">Choose a file</Text></>
                )
            }
        </View>
    </TouchableOpacity>
    {touched && error && (
                <Text className="text-red-500 text-sm font-pregular pl-3">{error}</Text>
            )}
</View>)
}

export default PickFile