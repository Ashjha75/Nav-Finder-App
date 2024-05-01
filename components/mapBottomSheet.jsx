import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import icons from '../constants/icons';
import CustomButton from './customButton';
import RideInputs from './rideInputs';

const MapBottomSheet = ({ onSnapPointChange }) => {
    const [fullSnap, setFullSnap] = useState(true);
    // callbacks
    const handleSheetChanges = useCallback((index) => {
        if (index == 0) setFullSnap(false); else setFullSnap(true)
        onSnapPointChange(index);
    }, [onSnapPointChange]);
    // renders
    const bottomSheetRef = useRef(null)
    const handleButtonClick = useCallback(() => {
        bottomSheetRef.current.snapToIndex(1);
    }, []);

    const snapPoints = useMemo(() => ['35%', '90%'], []);
    return (

        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            onChange={handleSheetChanges}
            backgroundStyle={{ backgroundColor: "black", color: "white" }}
            handleIndicatorStyle={{ backgroundColor: "#424242", width: "12%" }}
        >
            <BottomSheetView style={styles.contentContainer}>
                {
                    fullSnap ? <RideInputs /> : (<>
                        <View className="w-full mb-5 p-0 h-16  flex justify-center items-center border-b-[.3px] border-[#525151]">
                            <Text className="text-white font-bold text-2xl">Set your destination</Text>
                            <Text className="text-slate-200 text-bases">Drag the map to move the pin</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.9} className="w-[92%] rounded-md flex-row justify-center items-center bg-darkgray px-5 mx-auto " onPress={handleButtonClick}>
                            <Image source={icons.square} className="w-4 h-4 right-5" resizeMode='contain' />
                            <View className="  text-white  w-[80%] h-12 flex justify-center  font-ubold text-xl  px-4"><Text className="text-[#bdbdbd]  font-ubold text-lg ">Search</Text></View>
                            <Image source={icons.search} className="w-4 h-4 left-6" resizeMode='contain' />
                        </TouchableOpacity>
                        <CustomButton title="Confirm Destination" containerStyle="mt-5 w-[92%]" /></>)
                }

            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        color: 'white',
    },
});

export default MapBottomSheet;