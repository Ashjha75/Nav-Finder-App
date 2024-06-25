import useApi from "../utils/services/baseservice";
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { Link, router } from 'expo-router';
import images from "../constants/images";
import { PasswordSchema, resetPasswordSchema } from "../utils/yup/yup-schemas";
import FormField from "./FormField";
import CustomButton from "./customButton";
import CustomModal from "./customModal";
import { useGlobalContext } from "../context/GlobalProvider";
import { Formik } from "formik";
import Loader from "./loader";
import { useToast } from "react-native-toast-notifications";


const ResetPassword = ({ email }) => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const { user } = useGlobalContext();
    const toast = useToast();
    const showToast = (res) => {
        toast.show(res, {
          type: 'success',
          placement: 'bottom',
          duration: 5000,
          offsetTop:1000,
          animationType: 'slide-in',
        });
      };
    const onboardUser = async (values) => {
        values.email = email;
        try {
            setShowModal({
                isVisible: false,
                value: "",
                type: "success"
            })
            const url = "/auth/resetPassword";
            const response = await post(url, values);
            if (response.success) {
                showToast(response.message)
            }
            router.replace("/sign-in")
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
                    type: 'error',
                    showConfirm: false
                })
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
                            <Text className="text-secondary font-medium text-2xl">Reset Password</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">
                            Enter your new password and confirm it. It should be at least 8 characters long. After submission, your password will be updated. Remember your new password for future use.</Text>
                        <Formik
                            initialValues={{
                                password: "",
                                confirmPassword: ""
                            }}
                            validationSchema={resetPasswordSchema}
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
                                            title="Password"
                                            value={values.password}
                                            handleChangeText={handleChange('password')}
                                            handleBlur={handleBlur('password')}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                            secureTextEntry={true}
                                            error={errors.password}
                                            touched={touched.password}
                                        />
                                        <FormField
                                            title="Confirm Password"
                                            value={values.confirmPassword}
                                            handleChangeText={handleChange('confirmPassword')}
                                            handleBlur={handleBlur('confirmPassword')}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                            secureTextEntry={true}
                                            error={errors.confirmPassword}
                                            touched={touched.confirmPassword}
                                        />
                                        <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                                        <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={() => router.back()} />
                                    </View>
                                )
                            }}
                        </Formik>

                    </View><Text className="text-white text-center mt-20 px-4">
                        By clicking on Submit, you are accepting our{' '}
                        <Text className="text-blue-500 underline">Privacy Policy</Text>
                    </Text>
                </ScrollView>
            )}
            {showModal.isVisible && <CustomModal data={showModal} />}
        </SafeAreaView>
    );
};

export default ResetPassword;