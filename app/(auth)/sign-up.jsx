import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import axios from 'axios';
import { SignUpSchema } from '../../utils/yup/yup-schemas';

// Assuming you have a base URL for your API
const API_BASE_URL = 'http://192.168.1.8:8001/api/v1';

const SignUp = () => {
    const signUpUser = async (values) => {
        try {
            console.log(values);
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, values, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data); // Handle success
            // Navigate to another screen or show a success message
        }catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log("1");
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in Node.js
                console.log(error.request);
                console.log("2");
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                console.log("3");
            }
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="flex-row px-4 items-center mt-8 justify-start">
                    <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />
                </View>
                <View className="flex justify-center ">
                    <View className="mt-10 px-5">
                        <Text className="text-secondary font-medium text-2xl">Create your account</Text>
                    </View>
                    <Formik
                        initialValues={{ userName: '', email: '', password: '' }}
                        validationSchema={SignUpSchema}
                        onSubmit={(values, { validateForm }) => {
                            validateForm(values).then((errors) => {
                                if (Object.keys(errors).length === 0) {
                                    signUpUser(values); // Make the API call here
                                }
                            });
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className="mt-5 px-5">
                                <FormField
                                    title="Username"
                                    value={values.userName}
                                    handleChangeText={handleChange('userName')}
                                    handleBlur={handleBlur('userName')} // pass the field name
                                    error={errors.userName}
                                    touched={touched.userName}
                                    otherStyle="mt-7"
                                    keyboardType="default"
                                />
                                <FormField
                                    title="Email"
                                    value={values.email}
                                    handleChangeText={handleChange('email')}
                                    handleBlur={handleBlur('email')}
                                    otherStyle="mt-7"
                                    keyboardType="email-address"
                                    error={errors.email}
                                    touched={touched.email}
                                />
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
                                <CustomButton title="Sign Up" containerStyle="mt-10" handlePress={handleSubmit} />
                                <View className="justify-center pt-5 flex-row gap-2">
                                    <Text className="text-lg text-[#a7a7a7]  font-regular">Already have an account? <Link href="/sign-in" className="text-white underline">Sign In</Link></Text>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
