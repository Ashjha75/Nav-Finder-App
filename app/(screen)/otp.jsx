import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/customButton';
import { Formik } from 'formik';
import { OnboardingSchema, OtpSchema } from '../../utils/yup/yup-schemas';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
const Otp = () => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const [timeLeft, setTimeLeft] = useState(10);
    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(intervalId);
    }, [timeLeft]);

    const onboardUser = async (values) => {
        let newValues = { ...values };
        newValues.AccountStatus = "Active"
        // Extract the key from gender
        if (newValues.gender && newValues.gender.key) {
            newValues.gender = newValues.gender.key;
        }
        let formData = new FormData();

        // Append each property of newValues to formData
        for (let key in newValues) {
            formData.append(key, newValues[key]);
        }
        for (let key in newValues) {
            if (key === 'file') {
                // Append the file path directly to the FormData instance
                formData.append(key, {
                    uri: newValues[key].uri,
                    type: newValues[key].mimeType,
                    name: newValues[key].fileName,
                });
            } else {
                formData.append(key, newValues[key]);
            }
        }
        // Implement the API call here
        try {
            setShowModal({
                isVisible: false,
                value: ""
            })
            const url = "/auth/onboarding";
            const customHeaders = {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDA4MWI4MzI4Y2MxZGRhMTRiNzFhYiIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoidXNlcm9uZSIsImFjY291bnRUeXBlIjoiVXNlciIsIkFjY291bnRTdGF0dXMiOiIiLCJpc09uYm9hcmRlZCI6dHJ1ZSwiaWF0IjoxNzE1ODU4MTc0LCJleHAiOjE3MTU5NDQ1NzR9.pe5I21QHPnksnKCavHnrjIDiAtyDjLarJDsV2jmsIBo"
            };
            const response = await post(url, formData, customHeaders);
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

                    <View className="flex justify-center mt-2 mb-4">
                        <View className="flex-row px-4 items-center mt-8 justify-between">
                            <Text className="text-secondary font-medium text-2xl">Verify OTP</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter the OTP sent to your registered email address  to verify your identity and proceed.</Text>
                        <Formik
                            initialValues={{
                                otp: ""
                            }}
                            validationSchema={OtpSchema}
                            onSubmit={(values, { validateForm }) => {
                                validateForm(values).then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        onboardUser(values); // Make the API call here
                                    }
                                });
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                                return (
                                    <View className=" mt-5 px-5">

                                        <FormField
                                            title="Otp"
                                            value={values.otp}
                                            handleChangeText={handleChange('otp')}
                                            handleBlur={handleBlur('otp')}
                                            error={errors.otp}
                                            touched={touched.otp}
                                            otherStyle="mt-7"
                                            keyboardType="numeric"
                                        />
                                        <View className="flex-row justify-center items-center  ">
                                        {timeLeft == 0?(<>
                                            <CustomButton title="Submit" containerStyle="mt-10 w-[48%] mx-2 " handlePress={handleSubmit} />
                                        <CustomButton title="Resend" containerStyle="mt-10 bg-[#f2613f] w-[48%]" textStyles="text-white" handlePress={handleSubmit} />
                                        </>):<CustomButton title="Submit" containerStyle="mt-10 w-full mx-2 " handlePress={handleSubmit} />}
                                        </View>
                                        <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={() => router.back()} />
                                    </View>
                                )
                            }}
                        </Formik>
                        <View className="justify-center items-center pt-5 flex-row gap-2">
                            {timeLeft!=0?<Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">You can request verification code again in {timeLeft} seconds.
                            </Text>:''}
                        </View>
                    </View><Text className="text-white text-center mt-32 px-4">
                        By clicking on Sign In, you are accepting our{' '}
                        <Text className="text-blue-500 underline">Privacy Policy</Text>
                    </Text>
                </ScrollView>
            )}
            <CustomModal data={showModal} />
        </SafeAreaView>
    );
};

export default Otp;