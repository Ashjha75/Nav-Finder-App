import React, { forwardRef, useMemo, useRef, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomButton from './customButton';
import icons from '../constants/icons';

const CustomModal = forwardRef(({ data }, ref) => {
  const { isVisible, value, type, confirm, cancel,showConfirm } = data;
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => {
    if (value === '') return ['36%'];
    if (value.length > 50) return ['50%'];
    else return ['40%'];
  }, [value]);

  useEffect(() => {
    if (isVisible) {
      bottomSheetModalRef.current.present();
    } else {
      bottomSheetModalRef.current.dismiss();
    }
  }, [isVisible]);
  handleCancel=()=>{
    bottomSheetModalRef.current.dismiss()
  }

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      index={0}
      enablePanDownToClose={false} // Disable drag down to close
      backdropComponent={({ style }) => (
        <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
        )}
      backgroundStyle={{ backgroundColor: "#2c2c2c", color: "white" }}
      handleIndicatorStyle={{ backgroundColor: "#424242" }}
    >
      <BottomSheetView style={{ flex: 1, justifyContent: 'space-around', marginBottom: 15 }}>
        <View className="mx-auto">
          {
            type === 'success' ? <Image source={icons.check} className="w-[30px] h-[30px] mx-2" /> :
              type === 'error' ? <Image source={icons.xmark} className="w-[30px] h-[30px] mx-2" /> :
                <Image source={icons.info} className="w-[30px] h-[30px] mx-2" />
          }
        </View>
        <View className="flex-row justify-center items-center mt-1 pl-2">
          <Text className="text-white text-2xl text-left font-pregular">{value}</Text>
        </View>
        {showConfirm  && (
          <CustomButton title="Confirm" handlePress={confirm} containerStyle="mt-8 mx-3" textStyles="font-pmeduim" />
        )}
        <CustomButton title="Cancel" handlePress={cancel?cancel:()=>handleCancel()} containerStyle="mt-4 mx-3 bg-[#1e5546]" textStyles="text-white font-pmedium" />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default CustomModal;
