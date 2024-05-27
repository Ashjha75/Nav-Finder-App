
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


// commonservice.js
// commonservice.js
import axios from 'axios';
import Base64 from 'Base64';

export const getPaymentLink = async (amount, currency, customerDetails, orderId) => {
    const username = 'key';
    const password = 'key';

    const body = {
        amount: amount,
        currency: currency,
        description: "Razorpay Demo",
        customer: {
            name: customerDetails.name,
            contact: customerDetails.contact,
            email: customerDetails.email
        },
        notes: {
            orderId: orderId
        },
        options: {
            checkout: {
                callback_url: "https://192.168.1.8:8081/api/v1/payments/verifyPayment",
                callback_method: "get"
            }
        }
    };

    const headers = {
        Authorization: `Basic ${Base64.btoa(username + ':' + password)}`
    };
console.log(headers)
    try {
        const response = await axios.post('https://api.razorpay.com/v1/payment_links/', body, { headers: headers });
        return response;
    } catch (error) {
        console.error("Error generating payment link:", error.response ? error.response.data : error.message);
        throw error;
    }
};