// const API_KEY = "MY_API"

import * as SecureStore from 'expo-secure-store';
import useApi from "./baseservice";
const { get } = useApi();


// const config = {
//     headers: {
//         'content-type': 'application/json',
//         'X-Goog-Api-Key': API_KEY,
//         "X-Goog-FieldMask':[]
//     }
// }

export const fetchUser = async () => {
    try {
        const token = await SecureStore.getItemAsync('accessToken');
        if (token) {
            const url = "/auth/getCurrentUser";
            const response = await get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.success) {
                response.data.accessToken = token;
                return response.data
            }
        }
        else{
            return null;
        }
    }
    catch (error) {
        console.log(error)
    }

};