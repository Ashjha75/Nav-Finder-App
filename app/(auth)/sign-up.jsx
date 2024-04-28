import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import images from '../../constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { Link } from 'expo-router'
import { SignInSchema } from '../../utils/yup/yup-schemas'
import { Formik } from 'formik'
const SignUp = () => {

    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="flex-row px-4 items-center mt-8 justify-start">
                    <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />
                </View>
                <View className="flex justify-center mt-5">
                    <View className="mt-10 px-5">
                        <Text className="text-secondary font-medium text-2xl">Create your account</Text>
                    </View>
                    <Formik
                        initialValues={{ username: '', email: '', password: '' }}
                        validationSchema={SignInSchema}
                        onSubmit={(values, { validateForm }) => {
                            console.log(values);
                            validateForm(values).then((errors) => {
                                if (Object.keys(errors).length === 0) {
                                    console.log(values);
                                    // Handle form submission here
                                }
                            });
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View className="mt-5 px-5">
                                <FormField
                                    title="Username"
                                    value={values.username}
                                    handleChangeText={handleChange('username')}
                                    handleBlur={() => handleBlur('username')}
                                    error={errors.username}
                                    touched={touched.username}
                                    otherStyle="mt-7"
                                    keyboardType="default"
                                />
                                <FormField
                                    title="Email"
                                    value={values.email}
                                    handleChangeText={handleChange('email')}
                                    handleBlur={() => handleBlur('email')}
                                    error={errors.email}
                                    touched={touched.email}
                                    otherStyle="mt-7"
                                    keyboardType="email-address"
                                />
                                <FormField
                                    title="Password"
                                    value={values.password}
                                    handleChangeText={handleChange('password')}
                                    handleBlur={() => handleBlur('password')}
                                    error={errors.password}
                                    touched={touched.password}
                                    otherStyle="mt-7"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                />
                                <CustomButton title="Sign Up" containerStyle="mt-10" onPress={handleSubmit} />
                                <View className="justify-center pt-5 flex-row gap-2">
                                    <Text className="text-lg text-gray-100 font-regular">Already have an account? <Link href="/sign-in" className="text-white underline">Sign In</Link></Text>
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