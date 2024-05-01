import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../../constants/icons'
import VehicleOptions from '../../components/vehicleoptions'
import { Link, router } from 'expo-router'
import SlideCards from '../../components/slideCards'

const Home = () => {

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView>
        <View className="mt-10">
          <Text className="text-4xl font-ubold text-secondary px-4">NavFinder</Text>
          <View className=" h-20 mt-4 justify-center items-center flex-row rounded">
            <Link href="/mapViewer" className="bg-[#424242] w-[50%] h-14 rounded-l-3xl flex justify-center items-center px-3 py-1" ><Image source={icons.search} className="w-6  h-6" resizeMode="contain" />
              <TextInput className=" bg-[#424242]  text-white  w-[40%] h-14  font-ubold text-xl  px-4" placeholder="Where To?" placeholderTextColor="#bdbdbd" /></Link>
            <View className="w-[1.5px] h-75 pt-8 bg-primary"></View>
            <View className="w-[42%] my-3 h-14  justify-center items-center flex  bg-[#424242] rounded-r-3xl">
              <View className="bg-primary h-10 w-32 rounded-3xl flex-row justify-center items-center"><Image source={icons.clock} className="w-5 h-5 px-6" resizeMode="contain" />
                <Text className="text-secondary text-base font-bold">Now</Text>
                <Image source={icons.downarrow} className="w-4 h-4 px-6" resizeMode="contain" />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/mapViewer")} className="px-5 py-4 items-center flex-row">
            <View className="bg-[#424242] w-10 h-10 rounded-full justify-center items-center flex-row">
              <Image source={icons.location} className="w-5 h-7 ml-2" resizeMode="contain" />
            </View>
            <View className="mx-6">
              <Text className="text-lg text-white">Ghaziabad</Text>
              <Text className="text-sm text-zinc-300">Uttar Pradesh</Text>
            </View>
            <Image source={icons.downarrow} className="w-5 h-7 ml-2 -rotate-90 right-6 absolute" resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View className="mt-5 ">
          <View className="flex-row px-5 justify-between items-center">
            <Text className="text-2xl text-secondary font-ubold">Suggestions</Text>
            <Link href="/services" className="text-md text-secondary font-ubold">See All</Link>
          </View>
          <View className="flex-row justify-center items-center mx-8">
            <VehicleOptions vehicleType="uberX" prmoapplied={true} title="Trip" iconCss="w-20 h-20" />
            <VehicleOptions vehicleType="uberXL" prmoapplied={false} title="Intercity" iconCss="w-20 h-20" />
            <VehicleOptions vehicleType="uberP" prmoapplied={false} title="Premium" iconCss="w-20 h-20" />
            <VehicleOptions vehicleType="bus" prmoapplied={false} title="Shuttle" iconCss="w-12 h-20" />
          </View>
        </View>
        <View className="mt-7 ">
          <SlideCards />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home