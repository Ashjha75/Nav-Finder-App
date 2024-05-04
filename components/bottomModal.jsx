import React, { forwardRef, useCallback, useMemo, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomButton from './customButton';

const BottomModal = forwardRef(({ onClose }, ref) => {
    const snapPoints = useMemo(() => ['35%'], []);
    const handleSheetChanges = useCallback((index) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);
    return (
        <BottomSheetModal
            ref={ref}
            snapPoints={snapPoints}
            index={0}
            onChange={handleSheetChanges}
            dismissOnPanDown={true}
            backgroundStyle={{ backgroundColor: "#2c2c2c", color: "white" }}
            handleIndicatorStyle={{ backgroundColor: "#424242" }}
        >
            <BottomSheetView >
                <Text className=" text-white text-2xl font-bold mx-3">Do you want to sign out?</Text>
                <Text className="text-white text-base font-pregular mt-3 mx-3">Stay signed in to book your next trip faster</Text>
                <CustomButton title="Confirm sign-out" handlePress={() => console.log("hi")} containerStyle="mt-8 mx-3" textStyles="font-" />
                <CustomButton title="Cancel" handlePress={() => onClose()} containerStyle="mt-4 mx-3 bg-[#1e5546]" textStyles="text-white font-pmedium" />
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0)', // semi-transparent black
    },
});

export default BottomModal;