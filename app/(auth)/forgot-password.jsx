import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { View, Text, ScrollView, Image } from 'react-native';
=======
import { View, Text, ScrollView, Image} from 'react-native';
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/customButton';
import { Formik } from 'formik';
<<<<<<< HEAD
import { forgotPasswordSchema } from '../../utils/yup/yup-schemas';
=======
import { OnboardingSchema } from '../../utils/yup/yup-schemas';
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import FormField from '../../components/FormField';
import { Link, router } from 'expo-router';
<<<<<<< HEAD
import Otp from '../../components/otp';
const ForgotPassword = () => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const [otp, setOtp] = useState(null);


    const forgotPassword = async (values) => {
        try {
            setShowModal({
                isVisible:false,
                value:"",
                type:"success"
            })
            const url = "/auth/forgotPassword";
            const response = await post(url, values);
=======
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
        let newValues = { ...values };
        newValues.AccountStatus="Active"
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
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
            if (response.success) {
                setShowModal({
                    isVisible: true,
                    value: response.message,
<<<<<<< HEAD
                    type: 'success',
                    showConfirm:false
                });
                setOtp({
                    isVisible:true,
                    email:values.email
=======
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                })
            }
            return;

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setShowModal({
                    isVisible: true,
                    value: error.response.data.message,
<<<<<<< HEAD
                    type: 'error',
=======
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                });
            } else {
                // Handle cases where response or its properties are undefined
                console.log("Unexpected error format:", error);
            }
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
<<<<<<< HEAD
            {loading ? <Loader /> : ((otp && otp.isVisible)?(<Otp email={otp && otp.email} page="forgotPassword"/>):(
=======
            {loading ? <Loader /> : (
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                <ScrollView >

                    <View className="flex justify-center mt-2 mb-4">
                        <View className="flex-row px-4 items-center mt-8 justify-between">
                            <Text className="text-secondary font-medium text-2xl">Forgot Password</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Text className="text-[#dddedf] mt-10 px-4 font-umedium text-base">Enter the email address associated with your account, and we'll send you a link to reset your password.</Text>
                        <Formik
                            initialValues={{
<<<<<<< HEAD
                                email: ""
                            }}
                            validationSchema={forgotPasswordSchema}
                            onSubmit={(values, { validateForm }) => {
                                validateForm(values).then((errors) => {
                                    if (errors && Object.keys(errors).length === 0) {
                                        forgotPassword(values); // Make the API call here
=======
                                email:""
                            }}
                            validationSchema={OnboardingSchema}
                            onSubmit={(values, { validateForm }) => {
                                validateForm(values).then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        onboardUser(values); // Make the API call here
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                                    }
                                });
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                                return (
                                    <View className=" mt-5 px-5">
<<<<<<< HEAD

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
=======
                                
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
                                    <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={ ()=>router.back()} />
                                </View>
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                                )
                            }}
                        </Formik>
                        <View className="justify-center pt-5 flex-row gap-2">
<<<<<<< HEAD
                            <Text className="text-lg text-[#a7a7a7]  font-regular">Didn't have an account? <Link href="/sign-up" className="text-white underline">Sign Up</Link></Text>
                        </View>
                    </View><Text className="text-white text-center mt-32 px-4">
                        By clicking on Submit, you are accepting our{' '}
                        <Text className="text-blue-500 underline">Privacy Policy</Text>
                    </Text>
                </ScrollView>)
            )}
            
            {/* {otp && otp.isVisible && <Otp2 email={otp && otp.email} />} */}
        {showModal.isVisible && <CustomModal data={showModal}/>}
=======
                                 <Text className="text-lg text-[#a7a7a7]  font-regular">Didn't have an account? <Link href="/sign-up" className="text-white underline">Sign Up</Link></Text>
                             </View>
                    </View><Text className="text-white text-center mt-32 px-4">
                                 By clicking on Submit, you are accepting our{' '}
                                 <Text className="text-blue-500 underline">Privacy Policy</Text>
                             </Text>
                </ScrollView>
            )}
            <CustomModal data={showModal} />
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
        </SafeAreaView>
    );
};

export default ForgotPassword;