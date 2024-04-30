import React, { useContext } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapViewStyle from "../../constants/MapViewStyle.json"
import { UserLocationContext } from '../../context/userLocationContext'
import Loader from '../../components/loader'
import { Image, TouchableOpacity, View } from 'react-native'
import images from '../../constants/images'
import VehicleMarker from '../../components/vehicleMarker'
import carPositions from '../../constants/carPositions'
import { router } from 'expo-router'
import MapBottomSheet from '../../components/mapBottomSheet'
const MapViewer = () => {
    const { location, setLocation } = useContext(UserLocationContext)
    if (!location || !location.latitude) {
        return (<Loader />);// or some loading indicator
    }

    return (
        <SafeAreaView className="w-full h-full ">
            <TouchableOpacity onPress={() => router.back()} className=" w-12 h-12 absolute z-10 top-14 left-3 rounded-full bg-primary  flex-1 justify-center items-center">
                <Image source={images.rightArrow} className="w-7  h-6 rotate-180" resizeMode='contain' />
            </TouchableOpacity>
            <MapView
                className="w-full h-full"
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapViewStyle}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
                    <Image source={images.pin} className="w-10 h-20" resizeMode='contain' />
                </Marker>
                {carPositions.map((location, index) => (
                    <VehicleMarker key={index} longitude={location.longitude} latitude={location.latitude} vehicleType={location.vehicleType} />
                ))}

            </MapView>
            <View className="absolute z-50 bottom-0 w-full   ">
                <Image source={images.pin} className="w-10 h-10 absolute z-10 right-3" resizeMode='contain' />
                <MapBottomSheet /></View>
        </SafeAreaView >
    )
}

export default MapViewer