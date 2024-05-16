import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import images from '../../constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router'
import {SignInSchema} from '../../utils/yup/yup-schemas'
import { Formik } from 'formik'
import useApi from '../../utils/services/baseservice'
import CustomModal from '../../components/customModal'
import Loader from '../../components/loader'
const SignIn = () => {
const {loading, post}=useApi();
const [showModal, setShowModal] = useState({})
 const signInUser = async (values)=>{
    try {
        setShowModal({
            isVisible:false,
            value:""
        })
        const url="/auth/login";
        const response = await post(url, values);
        if(response.success){
            router.replace("/home")
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
        {loading?<Loader/>:(<>
         <ScrollView contentContainerStyle={{ height: "100%" }}>
             <View className="flex-row px-4 items-center mt-8 justify-start">
                 <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />
             </View>
             <View className="flex justify-center mt-5">
                 <View className="mt-10 px-5">
                     <Text className="text-secondary font-medium text-2xl">Login to your account</Text>
                 </View>
                 <Formik
                     initialValues={{  email: '', password: '' }}
                     validationSchema={SignInSchema}
                     onSubmit={(values, { validateForm }) => {
                         validateForm(values).then((errors) => {
                             if (Object.keys(errors).length === 0) {
                                 signInUser(values); // Make the API call here
                             }
                         });
                     }}
                 >
                     {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                         <View className="mt-5 px-5">
                            
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
                             <Link href="forgot-password" className="text-blue-500 mt-2 text-right underline">Forgot Password?</Link>
                             <CustomButton title="Sign In" containerStyle="mt-10" handlePress={handleSubmit} />
                             <View className="justify-center pt-5 flex-row gap-2">
                                 <Text className="text-lg text-[#a7a7a7]  font-regular">Didn't have an account? <Link href="/sign-up" className="text-white underline">Sign Up</Link></Text>
                             </View>
                             <Text className="text-white text-center mt-28">
                                 By clicking on Sign In, you are accepting our{' '}
                                 <Text className="text-blue-500 underline">Privacy Policy</Text>
                             </Text>

                         </View>
                     )}
                 </Formik>
             </View>
         </ScrollView>
         <CustomModal data={showModal}/>
        </>)}
     </SafeAreaView>
    );
};

export default SignIn;