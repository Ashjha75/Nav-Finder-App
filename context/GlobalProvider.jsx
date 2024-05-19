import { useState, useContext, useEffect, createContext } from 'react'
import * as SecureStore from 'expo-secure-store';
const GlobalContext = createContext();
import useApi from '../utils/services/baseservice';
const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
    const { get } = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaggedIn, setIsLoaggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // check if user is logged in
        const fetchUser = async () => {
            try{const token = await SecureStore.getItemAsync('accessToken');
            console.log(token)
            if (token) {
              const url = "/auth/getCurrentUser"; 
              const response = await get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.success) {
                response.data.accessToken=token;
                setUser(response.data);
                setIsLoaggedIn(true);
              }
            }}
            catch(error){
                console.log(error)
            }
            finally{
                setIsLoading(false);
            }
          };
          fetchUser();
    }, []);
    return (
        <GlobalContext.Provider value={{
            isLoading,
            isLoaggedIn,
            user,
            setUser,
            setIsLoaggedIn
        }}>{children}</GlobalContext.Provider>
    )
}
export { useGlobalContext, GlobalProvider }