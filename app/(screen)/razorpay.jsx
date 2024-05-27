import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { router, useRouter } from 'expo-router'

import Base64 from 'Base64';


const getPaymentLink = async (amount, currency, customerDetails, orderId) => {

    console.log(customerDetails);
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
    const routes = useRouter();
    const [paymentLink, setPaymentLink] = useState(null);

    useEffect(() => {
        handlePay();
    }, []);

    const handlePay = async () => {
        const customerDetails = {
            name: 'Navfinder',
            contact: '8860673349',
            email: 'navfinder@gmail.com'
        };
        try {
            const payLink = await getPaymentLink(100, 'INR', customerDetails, 123);
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
