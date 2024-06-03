
<<<<<<< HEAD
export function formatDate(dateStr) {
    const date = new Date(dateStr);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year} (${hours}:${minutes} ${ampm})`;
}

=======
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
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
