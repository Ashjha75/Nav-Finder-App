import React, { forwardRef, useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import CustomButton from './customButton';
import icons from '../constants/icons';

// const CustomModal = forwardRef(({ data}, ref) => {
//     const { isVisible, value } = data;
//   const snapPoints = useMemo(() => ['auto', '30%'], []);
//   const bottomSheetModalRef = useRef(null);
//   useEffect(() => {
//     if (isVisible) {
//       bottomSheetModalRef.current.present();
//     } else {
//       bottomSheetModalRef.current.dismiss();
//     }
//   }, [isVisible]);

//   return (
//     <BottomSheetModal
//       ref={bottomSheetModalRef}
//       snapPoints={snapPoints}
//       index={0}
//       dismissOnPanDown={true}
//       backgroundStyle={{ backgroundColor: "#2c2c2c", color: "white" }}
//       handleIndicatorStyle={{ backgroundColor: "#424242" }}
//     >
//       <BottomSheetView style={{ flex: 1, justifyContent: 'space-evenly' }}>
//         <Text className="text-white text-2xl text-center font-pregular mt-3 mx-3">style and aligning items to the end, you can ensure that the "Cancel" button always stays a</Text>
//         <CustomButton title="Confirm sign-out" handlePress={() => console.log("hi")} containerStyle="mt-6 mx-3" textStyles="font-" />
//         <CustomButton title="Cancel" handlePress={() => bottomSheetModalRef.current.dismiss()} containerStyle="my-5 mx-3 bg-[#1e5546]" textStyles="text-white  font-pmedium" />
//       </BottomSheetView>
//     </BottomSheetModal>
//   );
// });

const CustomModal = forwardRef(({ data }, ref) => {
    const { isVisible, value } = data;
   
    const bottomSheetModalRef = useRef(null);

  let snapPoints;
    if(value != ''){
        snapPoints = useMemo(() => ['25%'], [])
    }
    else {
        snapPoints = useMemo(() => ['36%'], [])
    }
    useEffect(() => {
      if (isVisible) {
        bottomSheetModalRef.current.present();
      } else {
        bottomSheetModalRef.current.dismiss();
      }
    }, [isVisible]);
  
    return (
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={0}
        dismissOnPanDown={true}
        backdropComponent={BottomSheetBackdrop} // Add this line
        backgroundStyle={{ backgroundColor: "#2c2c2c", color: "white" }}
        handleIndicatorStyle={{ backgroundColor: "#424242" }}
      >
        <BottomSheetView style={{ flex: 1, justifyContent: 'space-around' }}>
       <View className="flex-row justify-center items-center mt-3 pl-2">
       {
            value == ''?<Image source={icons.check} className="w-[30px] h-[30px] mx-2" />:
            <Image source={icons.xmark} className="w-[30px] h-[30px] mx-2" />
          }
          <Text className="text-white text-2xl text-center font-pregular  ">{value}</Text>
       </View>
        
         {value =='' ?<CustomButton title="Confirm " handlePress={() => console.log("hi")} containerStyle="mt-8 mx-3" textStyles="font-" />:""
}
          <CustomButton title="Cancel" handlePress={() => bottomSheetModalRef.current.dismiss()} containerStyle="mt-4 mx-3 bg-[#1e5546]" textStyles="text-white font-pmedium" />
        </BottomSheetView>
      </BottomSheetModal>
    );
  });
  
  export default CustomModal;