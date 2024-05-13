import React, { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/customButton';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import { SignUpSchema } from '../../utils/yup/yup-schemas';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';


const SignUp = () => {
    const {loading, post}=useApi();
const [showModal, setShowModal] = useState({})
    const signUpUser = async (values)=>{
        try {
            setShowModal({
                isVisible:false,
                value:""
            })
            const url="/auth/signup";
            const response = await post(url, values);
            if(response.success){
                router.push("/home")
            }
            return response.data;
    
        } catch (error) {
            if(error.response.data.success== false){
            setShowModal({
                isVisible:true,
                value:error.response.data.message,
            })}
            console.log("error",error.response.data.message);
        }
     }

    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
            {
                loading?<Loader/>:(<>
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
         <CustomModal data={showModal}/>
            </>)
            }
        </SafeAreaView>
    );
};

export default SignUp;
