import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/customButton';
import { Formik } from 'formik';
import {  OtpSchema } from '../utils/yup/yup-schemas';
import useApi from '../utils/services/baseservice';
import Loader from '../components/loader';
import CustomModal from '../components/customModal';
import FormField from '../components/FormField';
import {  router } from 'expo-router';
import images from '../constants/images';
const Otp = ({email}) => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});

    const otp = async (values) => {
        values.email=email;
        try {
            setShowModal({
                isVisible:false,
                value:"",
                type:"success"
            })
            const url = "/auth/verifyOtp";
            const response = await post(url, values);
            if (response.success) {
                setShowModal({
                    isVisible: true,
                    value: response.message,
                    type: 'success',
                    showConfirm:false
                })
            }
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    type: 'success',
                    showConfirm:false,
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
                            // onSubmit={(values, { validateForm }) => {
                            //     validateForm(values).then((errors) => {
                            //         if (errors && Object.keys(errors).length === 0) {
                            //             otp(values); // Make the API call here
                            //         }
                            //     });
                            // }}
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
                                        <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={() => router.back()} />
                                    </View>
                                )
                            }}
                        </Formik>
                    </View><Text className="text-white text-center mt-32 px-4">
                        By clicking on Sign In, you are accepting our{' '}
                        <Text className="text-blue-500 underline">Privacy Policy</Text>
                    </Text>
                </ScrollView>
        </SafeAreaView>
    );
};

export default Otp;