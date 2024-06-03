import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { View, Text, ScrollView, Image, BackHandler } from 'react-native';
=======
import { View, Text, ScrollView, Image} from 'react-native';
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/customButton';
import { Formik } from 'formik';
import { OnboardingSchema } from '../../utils/yup/yup-schemas';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import FormField from '../../components/FormField';
import SelectFormField from '../../components/selectFormField';
import PickFile from '../../components/pickFile';
<<<<<<< HEAD
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

=======
// import RNFetchBlob from 'rn-fetch-blob';
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
const OnboardingScreen = () => {
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const { user, setUser } = useGlobalContext();
    const backAction = () => {
        setShowModal({
            type: 'info',
            isVisible: true,
            value: "Are you sure you want to exit?",
            confirm: () => {
                router.push("/sign-in");
                setShowModal((prev) => ({ ...prev, isVisible: false }));
            },
            showConfirm: true
        });
        return true; // Prevent default behavior
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        ; (async () => {
            token = await SecureStore.getItemAsync('accessToken');
            try {
                const body = { lookups: ["genders", "securityQuestions"] }
                setShowModal({
                    isVisible: false,
                    value: "",
                    type: "success"
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
        })()
        return () => backHandler.remove();
    }, [])

    const onboardUser = async (values) => {
        let newValues = { ...values };
<<<<<<< HEAD
=======
        newValues.AccountStatus="Active"
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
        // Extract the key from gender
        if (newValues.gender && newValues.gender.key) {
            newValues.gender = newValues.gender.key;
        }
        let formData = new FormData();

        // Append each property of newValues to formData
        for (let key in newValues) {

            if (key === 'file') {
                // Append the file directly to the FormData instance
                formData.append(key, {
                    uri: newValues[key].uri,
                    type: newValues[key].mimeType, // Ensure this matches the image type
                    name: newValues[key].fileName
                });
            } else if (typeof newValues[key] === 'object' && newValues[key] !== null) {
                // Convert the object to a string before appending
                formData.append(key, JSON.stringify(newValues[key]));
            } else {
                formData.append(key, newValues[key]);
            }
        }
<<<<<<< HEAD

=======
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
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
        // Implement the API call here
        try {
            setShowModal({
                isVisible: false,
                value: "",
                type: "success"
            })
            const url = "/auth/onboarding";
            const customHeaders = {
<<<<<<< HEAD
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            };

            const response = await post(url, formData, customHeaders);
            if (response && response.success) {
=======
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDA4MWI4MzI4Y2MxZGRhMTRiNzFhYiIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoidXNlcm9uZSIsImFjY291bnRUeXBlIjoiVXNlciIsIkFjY291bnRTdGF0dXMiOiIiLCJpc09uYm9hcmRlZCI6dHJ1ZSwiaWF0IjoxNzE1ODU4MTc0LCJleHAiOjE3MTU5NDQ1NzR9.pe5I21QHPnksnKCavHnrjIDiAtyDjLarJDsV2jmsIBo"
            };
            const response = await post(url, formData, customHeaders);
            if (response.success) {
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                setShowModal({
                    isVisible: true,
                    value: response.message,
                    type: 'success',
                })
                setUser(response.data)
                router.push("/home")
            }
            return
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
            {loading ? <Loader /> : (
                <ScrollView >

                    <View className="flex justify-center mt-2 mb-4">
                        <View className="flex-row px-4 items-center mt-8 justify-between">
                            <Text className="text-secondary font-medium text-2xl">Onboarding</Text>
                            <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                        </View>
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                file: '',
                                mobile: '',
                                address: {
                                    landmark: '',
                                    street: '',
                                    city: '',
                                    state: '',
                                    postalCode: '',
                                    country: ''
                                },
                                dob: '',
                                gender: {
                                    key: ""
                                  },
                                AccountStatus: 'Active',
                                securityQuestions: {
                                    question1: {
                                        key: ""
                                      },
                                    answer1: ''
                                }
                            }}
                            validationSchema={OnboardingSchema}
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
<<<<<<< HEAD
                                        <PickFile title="Profile Picture" value={values.file} handleChange={handleChange('file')} handleBlur={handleBlur('file')} error={errors.file} touched={touched.file} setFieldValue={setFieldValue} />
                                        <FormField
                                            title="First Name"
                                            value={values.firstName}
                                            handleChangeText={handleChange('firstName')}
                                            handleBlur={handleBlur('firstName')}
                                            error={errors.firstName}
                                            touched={touched.firstName}
                                            otherStyle="mt-4" keyboardType="default"
                                        />
                                        <FormField
                                            title="Last Name"
                                            value={values.lastName}
                                            handleChangeText={handleChange('lastName')}
                                            handleBlur={handleBlur('lastName')}
                                            error={errors.lastName}
                                            touched={touched.lastName}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <SelectFormField
                                            data={result ? result?.genders : []}
                                            title="Gender"
                                            selectedItem={values.gender}
                                            handleSelect={(selectedItem) => setFieldValue('gender', selectedItem)}
                                            error={errors.gender}
                                            touched={touched.gender}
                                        />
                                        <FormField
                                            title="Mobile"
                                            value={values.mobile}
                                            handleChangeText={handleChange('mobile')}
                                            handleBlur={handleBlur('mobile')}
                                            error={errors.mobile}
                                            touched={touched.mobile}
                                            otherStyle="mt-7"
                                            keyboardType="numeric"
                                        />
                                        <FormField
                                            title="Date of Birth"
                                            value={values.dob}
                                            handleChangeText={handleChange('dob')}
                                            handleBlur={handleBlur('dob')}
                                            error={errors.dob}
                                            touched={touched.dob}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <FormField
                                            title="Landmark"
                                            value={values.address.landmark}
                                            handleChangeText={handleChange('address.landmark')}
                                            handleBlur={handleBlur('address.landmark')}
                                            error={errors.address?.landmark}
                                            touched={touched.address?.landmark}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <FormField
                                            title="Street"
                                            value={values.address.street}
                                            handleChangeText={handleChange('address.street')}
                                            handleBlur={handleBlur('address.street')}
                                            error={errors.address?.street}
                                            touched={touched.address?.street}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <FormField
                                            title="City"
                                            value={values.address.city}
                                            handleChangeText={handleChange('address.city')}
                                            handleBlur={handleBlur('address.city')}
                                            error={errors.address?.city}
                                            touched={touched.address?.city}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <FormField
                                            title="State"
                                            value={values.address.state}
                                            handleChangeText={handleChange('address.state')}
                                            handleBlur={handleBlur('address.state')}
                                            error={errors.address?.state}
                                            touched={touched.address?.state}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <FormField
                                            title="Postal Code"
                                            value={values.address.postalCode}
                                            handleChangeText={handleChange('address.postalCode')}
                                            handleBlur={handleBlur('address.postalCode')}
                                            error={errors.address?.postalCode}
                                            touched={touched.address?.postalCode}
                                            otherStyle="mt-7"
                                            keyboardType="numeric"
                                        />
                                        <FormField
                                            title="Country"
                                            value={values.address.country}
                                            handleChangeText={handleChange('address.country')}
                                            handleBlur={handleBlur('address.country')}
                                            error={errors.address?.country}
                                            touched={touched.address?.country}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <SelectFormField
                                            data={result ? result?.securityQuestions : []}
                                            title="Security Question"
                                            selectedItem={values.securityQuestions?.question1}
                                            handleSelect={(selectedItem) => setFieldValue('securityQuestions.question1', selectedItem.key)}
                                            error={errors.securityQuestions?.question1}
                                            touched={touched.securityQuestions?.question1}
                                            dropdownDirection="up"
                                        />
                                        <FormField
                                            title="Security Answer"
                                            value={values.securityQuestions.answer1}
                                            handleChangeText={handleChange('securityQuestions.answer1')}
                                            handleBlur={handleBlur('securityQuestions.answer1')}
                                            error={errors.securityQuestions?.answer1}
                                            touched={touched.securityQuestions?.answer1}
                                            otherStyle="mt-7"
                                            keyboardType="default"
                                        />
                                        <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                                    </View>
=======
                                <PickFile title="Profile Picture" value={values.file} handleChange={handleChange('file')} handleBlur={handleBlur('file')} error={errors.file} touched={touched.file} setFieldValue={setFieldValue} />
                                    <FormField
                                        title="First Name"
                                        value={values.firstName}
                                        handleChangeText={handleChange('firstName')}
                                        handleBlur={handleBlur('firstName')}
                                        error={errors.firstName}
                                        touched={touched.firstName}
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="Last Name"
                                        value={values.lastName}
                                        handleChangeText={handleChange('lastName')}
                                        handleBlur={handleBlur('lastName')}
                                        error={errors.lastName}
                                        touched={touched.lastName}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <SelectFormField
                                        data={result ? result?.genders : []}
                                        title="Gender"
                                        selectedItem={values.gender}
                                        handleSelect={(selectedItem) => setFieldValue('gender', selectedItem)}
                                        error={errors.gender}
                                        touched={touched.gender}
                                    />
                                    <FormField
                                        title="Mobile"
                                        value={values.mobile}
                                        handleChangeText={handleChange('mobile')}
                                        handleBlur={handleBlur('mobile')}
                                        error={errors.mobile}
                                        touched={touched.mobile}
                                        otherStyle="mt-7"
                                        keyboardType="numeric"
                                    />
                                    <FormField
                                        title="Date of Birth"
                                        value={values.dob}
                                        handleChangeText={handleChange('dob')}
                                        handleBlur={handleBlur('dob')}
                                        error={errors.dob}
                                        touched={touched.dob}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="Landmark"
                                        value={values.address.landmark}
                                        handleChangeText={handleChange('address.landmark')}
                                        handleBlur={handleBlur('address.landmark')}
                                        error={errors.address?.landmark}
                                        touched={touched.address?.landmark}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="Street"
                                        value={values.address.street}
                                        handleChangeText={handleChange('address.street')}
                                        handleBlur={handleBlur('address.street')}
                                        error={errors.address?.street}
                                        touched={touched.address?.street}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="City"
                                        value={values.address.city}
                                        handleChangeText={handleChange('address.city')}
                                        handleBlur={handleBlur('address.city')}
                                        error={errors.address?.city}
                                        touched={touched.address?.city}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="State"
                                        value={values.address.state}
                                        handleChangeText={handleChange('address.state')}
                                        handleBlur={handleBlur('address.state')}
                                        error={errors.address?.state}
                                        touched={touched.address?.state}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="Postal Code"
                                        value={values.address.postalCode}
                                        handleChangeText={handleChange('address.postalCode')}
                                        handleBlur={handleBlur('address.postalCode')}
                                        error={errors.address?.postalCode}
                                        touched={touched.address?.postalCode}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <FormField
                                        title="Country"
                                        value={values.address.country}
                                        handleChangeText={handleChange('address.country')}
                                        handleBlur={handleBlur('address.country')}
                                        error={errors.address?.country}
                                        touched={touched.address?.country}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <SelectFormField
                                        data={result ? result?.securityQuestions : []}
                                        title="Security Question"
                                        selectedItem={values.securityQuestions?.question1}
                                        handleSelect={(selectedItem) => setFieldValue('securityQuestions.question1', selectedItem.key)}
                                        error={errors.securityQuestions?.question1}
                                        touched={touched.securityQuestions?.question1}
                                        dropdownDirection="up"
                                    />
                                    <FormField
                                        title="Security Answer"
                                        value={values.securityQuestions.answer1}
                                        handleChangeText={handleChange('securityQuestions.answer1')}
                                        handleBlur={handleBlur('securityQuestions.answer1')}
                                        error={errors.securityQuestions?.answer1}
                                        touched={touched.securityQuestions?.answer1}
                                        otherStyle="mt-7"
                                        keyboardType="default"
                                    />
                                    <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                                </View>
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
                                )
                            }}
                        </Formik>
                    </View>
                </ScrollView>
            )}
            {showModal.isVisible && <CustomModal data={showModal} />}
        </SafeAreaView>
    );
};

export default OnboardingScreen;