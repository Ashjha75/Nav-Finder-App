import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/customButton';
import { Formik } from 'formik';
import { OnboardingSchema, PasswordSchema } from '../../utils/yup/yup-schemas';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
import Document from '../../components/documents';
// import RNFetchBlob from 'rn-fetch-blob';
const DocumentOptions = () => {
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const [document, setDocument] = useState(null);

    useEffect(() => {
        ; (async () => {
            try {
                const body = { lookups: ["documents"] }
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

    const onboardUser = async (values) => {
        // Implement the API call here
        try {
            setShowModal({
                isVisible: false,
                value: ""
            })
            const url = "/auth/changePassword";
            const customHeaders = {
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDA4MWI4MzI4Y2MxZGRhMTRiNzFhYiIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoidXNlcm9uZSIsImFjY291bnRUeXBlIjoiVXNlciIsIkFjY291bnRTdGF0dXMiOiIiLCJpc09uYm9hcmRlZCI6dHJ1ZSwiaWF0IjoxNzE1ODc3NjMxLCJleHAiOjE3MTU5NjQwMzF9.T_7ZKpefS_tkRkJ1kM-XvjsoyhSIDjf_3GGdtzu3rGg"
            };
            const response = await post(url, values, customHeaders);
            if (response.success) {
                setShowModal({
                    isVisible: true,
                    value: response.message,
                })
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
    }

    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
            {loading ? <Loader /> : (
                <ScrollView >
                    <View className="flex-row px-4 mb-10 items-center mt-8 justify-between">
                        <Text className="text-secondary font-medium text-2xl">Required Steps</Text>
                        <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                    </View>
                    {result && result.documents.map((item) => {
                        return (<TouchableOpacity onPress={()=>setDocument({'page':item.key})} activeOpacity={0.7} key={item.key} className="my-3 rounded-xl h-[80px] flex-row justify-center items-center mx-4 border-2 border-white ">
                            <Text className="w-[80%] text-secondary text-ubold text-lg">{item.value}</Text>
                            <View><Image source={images.rightArrow} className="w-8 h-8" /></View>
                        </TouchableOpacity>)
                    })}
                </ScrollView>
            )}
            {document ? <Document document={document} />:''}
            <CustomModal data={showModal} />
        </SafeAreaView>
    );
};

export default DocumentOptions;