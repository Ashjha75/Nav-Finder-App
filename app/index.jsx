import { Animated, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../constants/images"
import CustomButton from "../components/customButton";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { router } from "expo-router";
export default function App() {
  const slideAnim = useRef(new Animated.Value(-500)).current;  // Initial value for slide: -500
  const zoomAnim = useRef(new Animated.Value(0)).current;  // Initial value for slide: -500

  useEffect(() => {
    Animated.timing(
      slideAnim,
      {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();

    Animated.sequence([
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnim, zoomAnim]);
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-row px-4 items-center mt-4 justify-between">
          <Text className="text-white  text-4xl font-umedium  ">NavFinder</Text>
          <Image source={images.logo} className=" w-[30px] bg-white  h-[30px] rounded-lg" resizeMode="contain" />
        </View>
        <View className="w-full justify-center items-center h-[58%] p-0 -mt-2 ">
          <Animated.Image source={images.earnerIllustra} style={{ transform: [{ scale: zoomAnim }], width: '100%', height: '200%' }} resizeMode="contain" />
        </View>
        <View className="px-4 font-uregular">
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Text className="text-white font-uregular text-2xl mt-2 ">Navigate Your City with Ease and Comfort Today </Text>
          </Animated.View>
          <CustomButton title="Continue With Email"
            handlePress={() => { router.push('/documentOptions') }}
            containerStyle="mt-10 w-full font-umedium"
            showImage={true}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#000000' style='light' />
    </SafeAreaView>
  );
}


