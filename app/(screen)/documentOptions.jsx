import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, BackHandler } from 'react-native';
import images from '../../constants/images';
import { SafeAreaView } from 'react-native-safe-area-context';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import CustomModal from '../../components/customModal';
import Document from '../../components/documents';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
const DocumentOptions = () => {
    const [result, setResult] = useState(null)
    const { loading, post } = useApi();
    const [showModal, setShowModal] = useState({});
    const [document, setDocument] = useState(null);
    const { documentStage,setDocumentStage } = useGlobalContext()
    const showDocument = () => {
        setDocument(null)
    }
    const backAction = () => {
        setShowModal({
          type: 'info',
          isVisible: true,
          value: "Are you sure you want to exit? If you leave now, you will have to restart the process from the beginning",
          confirm: () => {
            setDocumentStage([]);
            setShowModal((prev) => ({ ...prev, isVisible: false }));
            router.replace("/profile");
          },
          cancel: () => {
            setShowModal((prev) => ({ ...prev, isVisible: false }));
          },
          showConfirm:true
        });
        return true; // Prevent default behavior
      };
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        console.log("documentStage", documentStage)
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
                            value: error.response.data.message,z
                        });
                    } else {
                        // Handle cases where response or its properties are undefined
                        console.log("Unexpected error format:", error);
                    }
                }
            })()
            return () => backHandler.remove();
    }, [])


    return (
        <SafeAreaView className="bg-primary h-full w-full flex-col justify-center">
            {loading ? <Loader /> : (
                <ScrollView >
                    <View className="flex-row px-4 mb-10 items-center mt-8 justify-between">
                        <Text className="text-secondary font-medium text-2xl">Required Steps</Text>
                        <Image source={images.logo} className="w-[45px] bg-secondary h-[45px] rounded-lg" resizeMode="contain" />

                    </View>
                    {result && result.documents.map((item, index) => {
                        const isDisabled = documentStage.length === 0 ? index !== 0 : !(documentStage.includes(item.key) || (index > 0 && result.documents[index - 1].key === documentStage[documentStage.length - 1]));
                        const isCompleted = documentStage.includes(item.key);
                        return (
                            <TouchableOpacity
                                onPress={() => !isDisabled && setDocument({ 'page': item.key })}
                                activeOpacity={0.7}
                                key={item.key}
                                className={`my-3 rounded-xl h-[80px] border-2 flex-row justify-center items-center mx-4 ${isDisabled ? '    border-slate-700' : isCompleted ? 'bg-lime-150 border-green-700' : 'bg-primary  border-white'}`}
                                disabled={isDisabled || isCompleted}
                            >
                                <View className="flex-col w-[80%]">
                                    <Text className={`text-secondary text-ubold text-lg ${isCompleted?'text-green-500 font-ubold':isDisabled?"text-zinc-400":"text-white"}`}>{item.value}</Text>
                                    {!isDisabled && !isCompleted && <Text className="text-blue-400 font-pregular text-xs mt-2 ">Recommended Next Steps</Text>}
                                </View>
                                <View><Image source={isCompleted?images.tick:images.rightArrow} className="w-8 h-8" /></View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            )}
            {document ? <Document document={document} /> : ''}
            {showModal.isVisible && <CustomModal data={showModal} showDocument={showDocument} />}
        </SafeAreaView>
    );
};

export default DocumentOptions;