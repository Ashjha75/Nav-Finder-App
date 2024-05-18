// const API_KEY = "MY_API"

import { useEffect } from "react";
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

