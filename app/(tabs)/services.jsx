import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VehicleOptions from '../../components/vehicleoptions'

const Services = () => {
    return (
        <SafeAreaView className="bg-primary h-full w-full">
            <Text className="text-4xl font-bold text-secondary pt-10 pl-6">Services</Text>
            <Text className="text-xl font-pbold text-zinc-400 pt-5 pl-6">Go anywhere , Get anything</Text>
            <View className="flex-row flex-wrap  items-center">
                <VehicleOptions vehicleType="uberX" prmoapplied={true} title="Go" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="uberXL" prmoapplied={false} title="Suv" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="uberP" prmoapplied={false} title="Premium" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="bus" prmoapplied={false} title="Shuttle" iconCss="w-12 h-20" />
                <VehicleOptions vehicleType="uberX" prmoapplied={false} title="Rental" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="rickshaw" prmoapplied={false} title="Rickshaw" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="bike" prmoapplied={true} title="Bike" iconCss="w-20 h-20" />
                <VehicleOptions vehicleType="parsel" prmoapplied={false} title="Package" iconCss="w-12 h-20" />
                <VehicleOptions vehicleType="restaurant" prmoapplied={false} title="Pickup" iconCss="w-16 h-16 " />
                <VehicleOptions vehicleType="schedule" prmoapplied={false} title="Reserve" iconCss="w-12 h-20" />
            </View>
        </SafeAreaView>
    )
}

export default Services