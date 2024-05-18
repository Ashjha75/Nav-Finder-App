import { View, Text, SafeAreaView, Image, BackHandler, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import useApi from '../utils/services/baseservice';
import images from '../constants/images';
import CustomModal from './customModal';
import { router } from 'expo-router';
import { Formik } from 'formik';
import PickFile from './pickFile';
import FormField from './FormField';
import CustomButton from './customButton';
import Loader from './loader';
import { aadhaarcardValidationSchema,vehicleRegistrationValidationSchema,insuranceValidationSchema,vehiclePermitValidationSchema,driverPhotoValidationSchema, pancardValidationSchema } from '../utils/yup/yup-schemas';

const Document = ({ document }) => {
  const currentPageSchema=document.page==='aadhaarcard'?aadhaarcardValidationSchema:document.page==='pancard'?pancardValidationSchema:document.page==='vehicleRegistration'?vehicleRegistrationValidationSchema:document.page==='insurance'?insuranceValidationSchema:document.page==='vehiclePermit'?vehiclePermitValidationSchema:driverPhotoValidationSchema;
  const [showModal, setShowModal] = useState({});
  const [result, setResult] = useState(null);
  const { post } = useApi();
  const [currentDocument, setCurrentDocument] = useState(null);
  const backAction = () => {
    setShowModal({
      type: 'info',
      isVisible: true,
      value: "Are you sure you want to exit? If you leave now, you will have to restart the process from the beginning",
      confirm: () => {
        setShowModal((prev) => ({ ...prev, isVisible: false }));
        router.back();
      },
      cancel: () => {
        setShowModal((prev) => ({ ...prev, isVisible: false }));
      },
    });
    return true; // Prevent default behavior
  };

  useEffect(() => {


  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    (async () => {
      try {
        const body = { lookups: ['documents', 'documentContents'] };
        setShowModal({
          isVisible: false,
          value: '',
        });
        const url = '/lookups';
        const response = await post(url, body);
        if (response.success && document.page) {
          setResult(response.data);
          console.log(response.data.documentContents)
          let data = response.data.documentContents.filter(item => item.key === document.page)
          console.log([data[0].value])
          setCurrentDocument(
            [data[0].value]
          );
          // console.log(response.data.documentContents.filter(item => (item.key === document.page)?true:false))

        }
        return;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setShowModal({
            isVisible: true,
            value: error.response.data.message,
          });
        } else {
          console.log('Unexpected error format:', error);
        }
      }
    })();
    return () => backHandler.remove();

  }, []);

  function getLookupValue(lookupKey, fileType) {
    if (result && fileType === 'documents') {
      const foundItem = result.documents.find((item) => item.key === lookupKey);
      if (foundItem) {
        return foundItem.value;
      }
    }
    return '';
  }

  return (
    <SafeAreaView className="bg-primary h-full w-full px-3">
      {
        currentDocument && currentDocument.length > 0 ? (
          <ScrollView>
            <View className="flex-row px-4 mb-10 items-center mt-8 justify-between">
              <Text className="text-secondary font-medium text-2xl w-[80%]">{getLookupValue(document.page, "documents")}</Text>
              <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />
            </View>
            <View className="w-full   ">
              <Text className="text-textcolor  mt-3 font-pregular text-left ">{currentDocument && currentDocument[0].content.split(/\s+/).join(' ')}</Text>
                
                <Formik
                  initialValues={{
                    documentType:'',
                    documentNumber:'',
                    documentExpiryDate:'',
                    documentOwnerName:'',
                    file: '',
                  }}
                validationSchema={currentPageSchema}
                onSubmit={(values, { validateForm }) => {
                    validateForm(values).then((errors) => {
                        if (Object.keys(errors).length === 0) {
                            // onboardUser(values); // Make the API call here
                            console.log(values)
                        }
                    });
                }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                    return (
                      <View className=" my-8 px-2">

                        {
                          currentDocument && currentDocument[0].image ? (<PickFile title="Vehicle Permit" value={values.file} handleChange={handleChange('file')} handleBlur={handleBlur('file')} error={errors.file} touched={touched.file} setFieldValue={setFieldValue} otherStyle="h-48" imageStyle="h-44" />) : (<></>)
                        }
                        {currentDocument && currentDocument[0].name ? (<FormField
                          title="Name"
                          value={values.documentOwnerName}
                          handleChangeText={handleChange('documentOwnerName')}
                          handleBlur={handleBlur('documentOwnerName')}
                          error={errors.documentOwnerName}
                          touched={touched.documentOwnerName}
                          keyboardType="default"
                          otherStyle="mt-4"
                        />) : (<></>)}
                        {currentDocument && currentDocument[0].idnumber ? (<FormField
                          title="Id Number"
                          value={values.documentNumber}
                          handleChangeText={handleChange('documentNumber')}
                          handleBlur={handleBlur('documentNumber')}
                          error={errors.documentNumber}
                          touched={touched.documentNumber}
                          keyboardType="default"
                          otherStyle="mt-4"
                        />) : (<></>)}
                        {currentDocument && currentDocument[0].expiry ? (<FormField
                          title="Expiry Date"
                          value={values.documentExpiryDate}
                          handleChangeText={handleChange('documentExpiryDate')}
                          handleBlur={handleBlur('documentExpiryDate')}
                          error={errors.documentExpiryDate}
                          touched={touched.documentExpiryDate}
                          keyboardType="default"
                          otherStyle="mt-4"
                        />) : (<></>)}


                        <CustomButton title="Submit" containerStyle="mt-10" handlePress={handleSubmit} />
                        <CustomButton title="Cancel" containerStyle="mt-5 bg-[#1e5546] " textStyles="text-white" handlePress={() => backAction()} />


                      </View>
                    )
                  }}
                </Formik>
              </View>
          </ScrollView>) : (<Loader />)
      }
      {showModal.isVisible && <CustomModal data={showModal} />}
    </SafeAreaView>
  );
};

export default Document;
