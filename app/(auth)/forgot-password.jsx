import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/customButton';
import { Formik } from 'formik';
import { forgotPasswordSchema } from '../../utils/yup/yup-schemas';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
// import RNFetchBlob from 'rn-fetch-blob';
const ForgotPassword = () => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});


    const forgotPassword = async (values) => {
        try {
            setShowModal({
                isVisible:false,
                value:"",
                type:"success"
            })
            const url = "/auth/forgotPassword";
            const response = await post(url, values);
            if (response.success) {
                setShowModal({
                    isVisible: true,
                    value: response.message,
                    type: 'success',
                    showConfirm:false
                });
            }
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
                    type: 'error',
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
                            <Text className="text-secondary font-medium text-2xl">Forgot Password</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter the email address associated with your account, and we'll send you a link to reset your password.</Text>
                        <Formik
                            initialValues={{
                                email: ""
                            }}
                            validationSchema={forgotPasswordSchema}
                            onSubmit={(values, { validateForm }) => {
                                validateForm(values).then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        forgotPassword(values); // Make the API call here
                                    }
                                });
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                                return (
                                    <View className=" mt-5 px-5">

                                        <FormField
                                            title="Email"
                                            value={values.email}
                                            handleChangeText={handleChange('email')}
                                            handleBlur={handleBlur('email')}
                                            error={errors.email}
                                            touched={touched.email}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                                        <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={() => router.back()} />
                                    </View>
                                )
                            }}
                        </Formik>
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg text-[#a7a7a7]  font-regular">Didn't have an account? <Link href="/sign-up" className="text-white underline">Sign Up</Link></Text>
                        </View>
                    </View><Text className="text-white text-center mt-32 px-4">
                        By clicking on Submit, you are accepting our{' '}
                        <Text className="text-blue-500 underline">Privacy Policy</Text>
                    </Text>
                </ScrollView>
            )}
        {showModal.isVisible && <CustomModal data={showModal}/>}
        </SafeAreaView>
    );
};

export default ForgotPassword;