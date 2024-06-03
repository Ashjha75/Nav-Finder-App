<<<<<<< HEAD
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
import { aadhaarcardValidationSchema, vehicleRegistrationValidationSchema, insuranceValidationSchema, vehiclePermitValidationSchema, driverPhotoValidationSchema, pancardValidationSchema } from '../utils/yup/yup-schemas';
import { useGlobalContext } from '../context/GlobalProvider';

const Document = ({ document, showDocument }) => {
  const { post, deleteApi } = useApi();
  const currentPageSchema = document.page === 'aadhaarcard' ? aadhaarcardValidationSchema : document.page === 'pancard' ? pancardValidationSchema : document.page === 'vehicleRegistration' ? vehicleRegistrationValidationSchema : document.page === 'insurance' ? insuranceValidationSchema : document.page === 'vehiclePermit' ? vehiclePermitValidationSchema : driverPhotoValidationSchema;
  const [showModal, setShowModal] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);
  const { user, setDocumentStage } = useGlobalContext();
  const backAction = () => {
    setShowModal({
      type: 'info',
      isVisible: true,
      value: "Are you sure you want to exit? If you leave now, you will have to restart the process from the beginning",
      confirm: () => {
        setDocumentStage([]);
        setShowModal((prev) => ({ ...prev, isVisible: false }));
        deleteDriver()
      },
      cancel: () => {
        setShowModal((prev) => ({ ...prev, isVisible: false }));
      },
      showConfirm: true
    });
    return true; // Prevent default behavior
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    (async () => {
      setLoading(true);
      try {
        const body = { lookups: ['documents', 'documentContents'] };
        setShowModal({
          isVisible: false,
          value: '',
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
        });
        const url = '/lookups';
        const response = await post(url, body);
        if (response.success && document.page) {
          setResult(response.data);
          let data = response.data.documentContents.filter(item => item.key === document.page)
          if (data.length > 0)
            setCurrentDocument(
              [data[0].value]
            );

        }
        return;
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setShowModal({
            isVisible: true,
            value: error.response.data.message,
            cancel: () => {
              setShowModal((prev) => ({ ...prev, isVisible: false }));
            },
          });
        } else {
          console.log('Unexpected error format:', error);
        }
      }
      finally {
        setLoading(false);
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

  const handleDocumentUpload = async (values) => {
    let newValues = { ...values };
    newValues.documentType = document.page;
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

    // Implement the API call here
    try {
      setLoading(true);
      setShowModal({
        isVisible: false,
        value: "",
        type: "success",
        cancel: () => {
          setShowModal((prev) => ({ ...prev, isVisible: false }));
        },
      })
      const url = `driver/document/${document.page}`;
      const customHeaders = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${user.accessToken}`,
        "Access-Medium": `Bearer ${user.accessMedium}`,
      };
      const response = await post(url, formData, customHeaders);
      if (response && response.success) {
        setDocumentStage(prevStages => [...prevStages, document.page]);
        if (document.page === 'driverPhoto') {
          createDriver()
        }
        else {
          router.replace("/documentOptions")
        }
      }
      return
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setShowModal({
          isVisible: true,
          value: error.response.data.message,
          type: 'error',
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
        });
      } else {
        // Handle cases where response or its properties are undefined
        setShowModal({
          isVisible: true,
          value: error.message,
          type: 'error',
          showConfirm: false,
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
        })
        console.log("Unexpected error format:", error);
      }
    } finally {
      setLoading(false); // Set loading to false when the form submission is done
    }
  }
  const createDriver = async () => {
    try {
      setLoading(true);
      setShowModal({
        isVisible: false,
        value: "",
        type: "success",
        cancel: () => {
          setShowModal((prev) => ({ ...prev, isVisible: false }));
        },
      })
      const url = "driver/createDriver";

      const response = await post(url);
      if (response && response.success) {
        setShowModal({
          isVisible: true,
          value: response.message,
          type: 'success',
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
            router.replace("/profile")
          },
        })
        setDocumentStage([]);
      }
      return
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setShowModal({
          isVisible: true,
          value: error.response.data.message,
          type: 'error',
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
        });
      } else {
        // Handle cases where response or its properties are undefined
        console.log("Unexpected error format:", error);
      }
    }
 
  }
  const deleteDriver = async () => {
    try {
      setLoading(true);
      setShowModal({
        isVisible: false,
        value: "",
        type: "success",
        cancel: () => {
          setShowModal((prev) => ({ ...prev, isVisible: false }));
        },
      })
      const url = "driver/deleteDriver";

      const response = await deleteApi(url);
      if (response && response.success) {
        router.replace("/profile")
        setDocumentStage([]);
      }
      return
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setShowModal({
          isVisible: true,
          value: error.response.data.message,
          type: 'error',
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
        });
      } else {
        // Handle cases where response or its properties are undefined
        console.log("Unexpected error format:", error);
      }
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full w-full px-3">
      {
        (!loading) ? (
          <ScrollView>
            <View className="flex-row px-4 mb-10 items-center mt-8 justify-between">
              <Text className="text-secondary font-medium text-2xl w-[80%]">{getLookupValue(document.page, "documents")}</Text>
              <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />
            </View>
            <View className="w-full   ">
              <Text className="text-textcolor  mt-3 font-pregular text-left ">{currentDocument && currentDocument[0].content.split(/\s+/).join(' ')}</Text>

              <Formik
                initialValues={{
                  documentType: '',
                  documentNumber: '',
                  documentExpiryDate: '',
                  documentOwnerName: '',
                  file: '',
                }}
                validationSchema={currentPageSchema}
                onSubmit={(values, { validateForm }) => {
                  validateForm(values).then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      handleDocumentUpload(values); // Make the API call here
                    }
                  });
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => {
                  return (
                    <View className=" my-8 px-2">

                      {
                        currentDocument && currentDocument[0].image ? (<PickFile title={`${getLookupValue(document.page, "documents")} Image`} value={values.file} handleChange={handleChange('file')} handleBlur={handleBlur('file')} error={errors.file} touched={touched.file} setFieldValue={setFieldValue} otherStyle="h-48" imageStyle="h-44" />) : (<></>)
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
=======
import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import useApi from '../utils/services/baseservice';
import images from '../constants/images';

const Document = ({document}) => {
    const [showModal, setShowModal] = useState({});
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    useEffect(() => {
        ; (async () => {
            try {
                const body = { lookups: ["documents"] }
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
    }, []);
    function getLookupValue(lookupKey) {
        if (result) {
            const foundItem = result.documents.find(item => item.key === lookupKey);
            if (foundItem) {
                console.log(foundItem.value);
                return foundItem.value;
            }
        }
        return ""; 
    }
    return (
        <SafeAreaView className="bg-primary h-full w-full px-3">
            <View className="flex-row px-4 mb-10 items-center mt-8 justify-between">
                        <Text className="text-secondary font-medium text-2xl w-[80%]">{getLookupValue(document.page)}</Text>
                        <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                    </View>
        </SafeAreaView>
    )
}

export default Document
>>>>>>> 0137f8fb9020cefd362d4e52618e86de7324f98f
