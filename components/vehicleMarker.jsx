import { View, Text, Image } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import images from '../constants/images'

const VehicleMarker = ({ latitude, longitude, vehicleType }) => {
    return (
        <Marker coordinate={{ latitude: latitude + 0.02, longitude: longitude + .01 }}>
            <Image source={images[vehicleType]} className="w-12 h-20" resizeMode='contain' />
        </Marker>
    )
}

export default VehicleMarker