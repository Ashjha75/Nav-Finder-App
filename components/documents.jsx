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