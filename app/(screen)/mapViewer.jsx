import React, { useContext, useEffect, useRef, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapViewStyle from "../../constants/MapViewStyle.json"
import { useLocation } from '../../context/userLocationContext'
import Loader from '../../components/loader'
import { Image, TouchableOpacity, View } from 'react-native'
import images from '../../constants/images'
import VehicleMarker from '../../components/vehicleMarker'
import carPositions from '../../constants/carPositions'
import { router } from 'expo-router'
import MapBottomSheet from '../../components/mapBottomSheet'
import MapViewDirections from 'react-native-maps-directions'
const MapViewer = () => {
    const { location, setLocation, fromLocation, setFromLocation, toLocation, setToLocation } = useLocation();
    const [isMapClicked, setIsMapClicked] = useState(false);
    if (!location || !location.latitude) {
        return (<Loader />);// or some loading indicator
    }
    const mapRef = useRef(null);

    const handleFocus = () => {
        mapRef.current.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }, 1000); // duration in milliseconds
    };
    const [currentSnapPoint, setCurrentSnapPoint] = useState(0);

    const handleSnapPointChange = (index) => {
        if (index != "0") {
            setIsMapClicked(false)
        }
        else {
            setIsMapClicked(true)
        }
        setCurrentSnapPoint(index);
    };
    useEffect(() => {
        if (fromLocation && toLocation && mapRef.current) {
            let region = {
                latitude: (fromLocation.latitude + toLocation.latitude) / 2,
                longitude: (fromLocation.longitude + toLocation.longitude) / 2,
                latitudeDelta: Math.abs(fromLocation.latitude - toLocation.latitude) * 2 + 0.0001,
                longitudeDelta: Math.abs(fromLocation.longitude - toLocation.longitude) * 2 + 0.0001
            };
    
            mapRef.current.animateToRegion(region, 1000); // duration in milliseconds
        }
    }, [fromLocation, toLocation]);
    return (
        <SafeAreaView className="w-full h-full ">
            {isMapClicked ? <TouchableOpacity onPress={() => {router.back();setFromLocation(null);setToLocation(null)}} className=" w-12 h-12 absolute z-10 top-14 left-3 rounded-full bg-primary  flex-1 justify-center items-center">
                <Image source={images.rightArrow} className="w-7  h-6 rotate-180" resizeMode='contain' />
            </TouchableOpacity> : null}
            <MapView
                ref={mapRef}
                className="w-full h-full"
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapViewStyle}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={() => setIsMapClicked(true)}
            >
                {fromLocation && toLocation && (
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey="AIzaSyAmklv2wjfdYvXPvGnoTo6LcDlZ2Ix3JgU"
                        strokeWidth={3}
                        strokeColor="white"

                        onError={(errorMessage) => {
                            console.log('Error:', errorMessage);
                        }}
                    />
                )}

               { (toLocation!= null && fromLocation!=null)?<>
                <Marker coordinate={fromLocation} identifier='fromLocation' >
                    <Image source={images.pin} className="w-14 h-44" resizeMode='contain' />
                </Marker>
                <Marker coordinate={toLocation} identifier='toLocation' >
                    <Image source={images.pin} className="w-14 h-44" resizeMode='contain' />
                </Marker>
               </>:
               <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} identifier='fromLocation' >
               <Image source={images.pin} className="w-10 h-30" resizeMode='contain' />
           </Marker>

               }
                
                {/* {carPositions.map((location, index) => (
                    <VehicleMarker key={index} longitude={location.longitude} latitude={location.latitude} vehicleType={location.vehicleType} />
                ))} */}

            </MapView>
            <MapBottomSheet onSnapPointChange={handleSnapPointChange} onPress={() => console.log("hi")} />
            {isMapClicked ? (<TouchableOpacity onPress={handleFocus} className=" w-12 h-12 absolute z-10 bottom-[40%] right-4 rounded-full bg-primary  flex-1 justify-center items-center">
                <Image source={images.focus} className="w-7  h-6 rotate-180" resizeMode='contain' />
            </TouchableOpacity>) : null}


        </SafeAreaView >
    )
}

export default MapViewer