import React from 'react';
import { ScrollView, TouchableOpacity, Text, Image, View } from 'react-native';
import images from '../constants/images';
import cardData from '../constants/cardData';
const SlideCards = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
                {cardData.map((item) => {
                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.9}
                            style={{ backgroundColor: item.bgcolor }}
                            className={`border-2 mx-2 border-darkgray rounded-lg overflow-hidden flex-row justify-between items-center w-80`}
                        >
                            <View className="w-[62%] ml-3">
                                <Text className="w-[80%] mb-2 text-white text-2xl font-bold">{item.title}</Text>
                                <View className="flex-row items-center">
                                    <Text className="text-white font-medium text-base">{item.subtitle} <Image source={images.rightArrow} className="w-7 h-7" /></Text>
                                </View>
                            </View>
                            <View className="w-[38%] ">
                                <Image source={images[item.imagePath]} className="w-36 h-36" resizeMode="cover" />
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    );
}


export default SlideCards;