import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import profileOptions from '../constants/profileOptions'
import icons from '../constants/icons';

const ProfileOptions = () => {
    const [isPressed, setIsPressed] = useState({});
    const handlePressIn = (id) => {
        setIsPressed(prevState => ({ ...prevState, [id]: true }));
    };
    const handlePressOut = (id) => {
        setIsPressed(prevState => ({ ...prevState, [id]: false }));
    };
    return (
        <>
            {
                profileOptions.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} TouchableOpacity activeOpacity={1} onPressIn={() => handlePressIn(item.id)}
                            onPressOut={() => handlePressOut(item.id)} className={`flex-row w-full pl-4 h-14 items-center ${isPressed[item.id] ? "bg-darkgray" : ""}`}>
                            <Image source={icons[item.image]} className="ml-2 w-5 h-5" />
                            <Text className="text-white ml-8 text-base font-umedium ">{item.name}</Text>
                        </TouchableOpacity >
                    )
                })
            }
        </>
    )
}

export default ProfileOptions