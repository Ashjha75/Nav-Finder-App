import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import profileOptions from '../constants/profileOptions'
import icons from '../constants/icons';
import { router } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import CustomModal from './customModal';

const ProfileOptions = () => {
    const [isPressed, setIsPressed] = useState({});
    const { user } = useGlobalContext();
  const [showModal, setShowModal] = useState({});
    const handlePressIn = (item) => {
        setIsPressed(prevState => ({ ...prevState, [item.id]: true }));
        if (item.link != '') {
            if (user.isDriver && item.id == 2)
                {
                setShowModal(prevState => ({
                    ...prevState,
                    isVisible: true,
                    value: "You are already a driver",
                    type: "info",
                    isConfirm: false,
                    cancel: () => {
                        setShowModal((prev) => ({ ...prev, isVisible: false }));
                    }
                  }));
                }
                else
                router.push(item.link)
        }
    };
    const handlePressOut = (id) => {
        setIsPressed(prevState => ({ ...prevState, [id]: false }));
    };
    return (
        <>
            {
                profileOptions.map((item) => {
                    return (
                        <TouchableOpacity key={item.id} TouchableOpacity activeOpacity={1} onPressIn={() => handlePressIn(item)}
                            onPressOut={() => handlePressOut(item.id)} className={`flex-row w-full pl-4 h-14 items-center ${isPressed[item.id] ? "bg-darkgray" : ""}`}>
                            <Image source={icons[item.image]} className="ml-2 w-5 h-5" />
                            <Text className="text-white ml-8 text-base font-umedium ">{item.name}</Text>
                        </TouchableOpacity >
                    )
                })
            }
            {showModal.isVisible && <CustomModal data={showModal} />}
        </>
        
    )
}

export default ProfileOptions