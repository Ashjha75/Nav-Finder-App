import { useState, useEffect, createContext, useContext } from 'react'
import * as Location from 'expo-location';

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    return (
        <LocationContext.Provider value={{ location, setLocation, fromLocation, setFromLocation, toLocation, setToLocation }}>
            {children}
        </LocationContext.Provider>
    )
}

const useLocation = () => useContext(LocationContext);

export { LocationProvider, useLocation }