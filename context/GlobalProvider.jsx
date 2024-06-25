import { useState, useContext, useEffect, createContext } from 'react'
import * as SecureStore from 'expo-secure-store';
const GlobalContext = createContext();
import useApi from '../utils/services/baseservice';
import { router } from 'expo-router';
const useGlobalContext = () => useContext(GlobalContext);
const GlobalProvider = ({ children }) => {
    const { get } = useApi();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaggedIn, setIsLoaggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [documentStage,setDocumentStage]=useState([])

    useEffect(() => {
        // check if user is logged in
        const fetchUser = async () => {
            try{const token = await SecureStore.getItemAsync('accessToken');
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
                router.replace("/home")
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
            documentStage,
            setUser,
            setIsLoaggedIn,
            setDocumentStage
        }}>{children}</GlobalContext.Provider>
    )
}
export { useGlobalContext, GlobalProvider }