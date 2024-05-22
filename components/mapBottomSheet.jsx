import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import icons from '../constants/icons';
import CustomButton from './customButton';
import RideInputs from './rideInputs';

const MapBottomSheet = ({ onSnapPointChange }) => {
    // callbacks
   
    // renders
    const bottomSheetRef = useRef(null)
    

    const snapPoints = useMemo(() => ['20%', '80%'], []);
    return (

        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            backgroundStyle={{ backgroundColor: "black", color: "white" }}
            handleIndicatorStyle={{ backgroundColor: "#424242", width: "12%" }}
        >
            <BottomSheetView style={styles.contentContainer}>
                   <RideInputs /> 
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