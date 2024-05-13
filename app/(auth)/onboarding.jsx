import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
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

const OnboardingScreen = () => {
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({})

    const onboardUser = async (values) => {
        // Implement the API call here
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
                                gender: '',
                                AccountStatus: '',
                                securityQuestions: {
                                    question1: '',
                                    answer1: ''
                                }
                            }}
                            validationSchema={OnboardingSchema}
                            onSubmit={(values, { validateForm }) => {
                                validateForm(values).then((errors) => {
                                    if (Object.keys(errors).length === 0) {
                                        onboardUser(values);
                                    }
                                });
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View className="mt-5 px-5">
                                    <SelectFormField />
                                    <FormField
                                        title="First Name"
                                        value={values.firstName}
                                        handleChangeText={handleChange('firstName')}
                                        handleBlur={handleBlur('firstName')}
                                        error={errors.firstName}
                                        touched={touched.firstName}
                                        otherStyle="mt-7"
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
                                    {/* Add a component for file upload here */}
                                    <FormField
                                        title="Mobile"
                                        value={values.mobile}
                                        handleChangeText={handleChange('mobile')}
                                        handleBlur={handleBlur('mobile')}
                                        error={errors.mobile}
                                        touched={touched.mobile}
                                        otherStyle="mt-7"
                                        keyboardType="phone-pad"
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
                                    {/* Add FormField components for the rest of the fields in the address object here */}
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
                                    {/* Add a component for gender selection here */}
                                    {/* Add a component for AccountStatus selection here */}
                                    <FormField
                                        title="Security Question"
                                        value={values.securityQuestions.question1}
                                        handleChangeText={handleChange('securityQuestions.question1')}
                                        handleBlur={handleBlur('securityQuestions.question1')}
                                        error={errors.securityQuestions?.question1}
                                        touched={touched.securityQuestions?.question1}
                                        otherStyle="mt-7"
                                        keyboardType="default"
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
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            )}
            <CustomModal data={showModal} />
        </SafeAreaView>
    );
};

export default OnboardingScreen;