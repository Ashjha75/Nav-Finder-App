import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image} from 'react-native';
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
// import RNFetchBlob from 'rn-fetch-blob';
const ForgotPassword = () => {
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
  
    useEffect(() => {
        ; (async () => {
            try {
                const body = { lookups: ["genders", "securityQuestions"] }
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
            console.log(values)
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

                    <View className="flex justify-center mt-2 mb-4">
                        <View className="flex-row px-4 items-center mt-8 justify-between">
                            <Text className="text-secondary font-medium text-2xl">Change Password</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter your current password and your new password. Once submitted, your password will be updated.</Text>
                        <Formik
                            initialValues={{
                                oldPassword:"",
                                password:""
                            }}
                            validationSchema={PasswordSchema}
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
                                 title="Old Password"
                                 value={values.oldPassword}
                                 handleChangeText={handleChange('oldPassword')}
                                 handleBlur={handleBlur('oldPassword')}
                                 otherStyle="mt-7"
                                 keyboardType="default"
                                 secureTextEntry={true}
                                 error={errors.oldPassword}
                                 touched={touched.oldPassword}
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
                                    <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                                    <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={ ()=>router.back()} />
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
            <CustomModal data={showModal} />
        </SafeAreaView>
    );
};

export default ForgotPassword;