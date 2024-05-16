// const GOOGLE_BASE_URL = "https://places.googleapis.com/v1/places:searchNearby"
// const API_KEY = "MY_API"

import { useEffect } from "react";
const [showModal, setShowModal] = useState({});

// const config = {
//     headers: {
//         'content-type': 'application/json',
//         'X-Goog-Api-Key': API_KEY,
//         "X-Goog-FieldMask':[]
//     }
// }

// lookups
useEffect(() => {
    ; (async () => {
        try {
            const body = { lookups:  }
            setShowModal({
                isVisible: false,
                value: ""
            })
            const url = "/lookups";
            const response = await post(url, body);
            if (response.success) {
                setResult(response.data)
            }
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
                });
            } else {
                // Handle cases where response or its properties are undefined
                console.log("Unexpected error format:", error);
            }
        }
    })()
}, [])