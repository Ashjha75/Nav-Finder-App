import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { router, useLocalSearchParams, useRouter } from 'expo-router'

import Base64 from 'Base64';
import { useGlobalContext } from '../../context/GlobalProvider';
import useApi from '../../utils/services/baseservice';


const getPaymentLink = async (amount, currency, customerDetails, orderId) => {

    const username = 'rzp_test_sU3gPtPLQ3W4su';
    const password = 'ty3zD97eJNIi0vH7Tp9MXUnI';
    const toPay=(parseInt(amount)).toFixed(2)*100
    console.log(toPay)

    const body = {
        amount: toPay,
        currency: currency,
        description: "Navfinder",
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
                callback_url: "https://nav-finder-backend.onrender.com/api/v1/auth/refreshToken",
                callback_method: "get"
            }
        }
    };

    const headers = {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
    };

    try {
        const response = await axios.post('https://api.razorpay.com/v1/payment_links/', body, { headers });
        return response;
    } catch (error) {
        console.error("Error generating payment link:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const RazorpayScreen = ({ setIsPayClicked }) => {
    const {user}= useGlobalContext()
    const {get}=useApi()
    const routes = useRouter();
    const params = useLocalSearchParams();
    const [paymentLink, setPaymentLink] = useState(null);
  
    useEffect(() => {
        handlePay();
      ;(async()=>{
        try {
            const url = `payments/getCallback/${params.id}`;
            const customHeaders = {
                "Authorization": `Bearer ${user.accessToken}`,
            };
            const response = await get(url, {}, customHeaders);
            if (response.success) {
                params.message = null;
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message)
            } else {
               
                console.log("Unexpected error format:", error);
            }
        } })()
    }, [])
    


    const handlePay = async () => {
        const customerDetails = {
            name: 'Navfinder',
            contact: '8860673349',
            email: 'navfinder@gmail.com'
        };
        try {
            const payLink = await getPaymentLink(params.amount, 'INR', customerDetails, 123);
            setPaymentLink(payLink.data.short_url);
        } catch (error) {
            Alert.alert("Error", "Failed to generate payment link");
            console.log(error);
        }
    };

    return (
        <>
            {paymentLink ? (
                <WebView
                    source={{ uri: paymentLink }}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={styles.loadingStyle}>
                            <ActivityIndicator size="large" color="#2B85F3" />
                        </View>
                    )}
                    renderError={(e) => {
                        console.log("renderError", e);
                    }}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    thirdPartyCookiesEnabled={true}
                    onNavigationStateChange={(navState) => {
                        console.log(navState);
                        if (navState.title.includes("Processing, Please wait...")) {
                            routes.push({ pathname: "/activity", params: { message: "success" } });
                        }
                    }}
                />
            ) : (
                <View style={styles.loadingStyle}>
                    <ActivityIndicator size="large" color="#2B85F3" />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    loadingStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    }
});

export default RazorpayScreen;
