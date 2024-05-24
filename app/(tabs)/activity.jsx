import { View, Text, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../constants/images';
import sounds from '../../constants/sounds';
import { router, useLocalSearchParams } from 'expo-router';
import CustomModal from '../../components/customModal';
import { useGlobalContext } from '../../context/GlobalProvider';
import useApi from '../../utils/services/baseservice';
import Loader from '../../components/loader';
import { formatDate } from '../../utils/services/commonservice';
import { Audio } from 'expo-av';
import icons from '../../constants/icons';
import CustomButton from '../../components/customButton';
import { Animated, Easing } from 'react-native';

const Activity = () => {
    const { user } = useGlobalContext();
    const { get,put } = useApi();
    const params = useLocalSearchParams();
    const [showModal, setShowModal] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await fetchActivities();

        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1000, // Reduced duration for faster animation
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ).start(() => setRefreshing(false));
    }, [refreshing]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1], // Matched inputRange to toValue
        outputRange: ['0deg', '360deg'] // Set outputRange for 360 degree rotation
    });


    const fetchActivities = async () => {
        try {
            setLoading(true);
            const url = "finder/getRides";
            const customHeaders = {
                "Authorization": `Bearer ${user.accessToken}`,
            };
            const response = await get(url, {}, customHeaders);
            if (response.success) {
                params.message = null;
                console.log(response.data)
                setResult(response.data);
            }
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
                setShowModal({
                    isVisible: true,
                    value: error.message,
                    type: 'error',
                    showConfirm: false,
                    cancel: () => {
                        setShowModal((prev) => ({ ...prev, isVisible: false }));
                    },
                });
                console.log("Unexpected error format:", error);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const playSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(sounds.successTone);
                await sound.playAsync();
                console.log('Sound played successfully');
            } catch (error) {
                console.error('Error playing sound:', error);
            }
        };

        if (params.message) {
            setShowModal({
                isVisible: true,
                value: params.message,
                type: 'success',
                cancel: () => {
                    setShowModal((prev) => ({ ...prev, isVisible: false }));
                },
            });
            playSound();
        }

        fetchActivities();
    }, [params.message]);

   const  actionHandler=(action)=>{
        if(action=="cancelled" || action=="accepted"){
            setShowModal({
                isVisible: true,
                value: "Are you sure you want to cancel this ride?     ",
                type: 'info',
                confirm: () => {
                    doAction(result.acceptedRides[0]._id,action);
                    setShowModal((prev) => ({ ...prev, isVisible: false }));
                },
                cancel: () => {
                    setShowModal((prev) => ({ ...prev, isVisible: false }));
                },
                showConfirm: true,
            });
        }
    }
    const doAction=async(rideId,action)=>{
        try {
            setLoading(true);
            const url = `finder/rideActions?rideId=${rideId}&type=${action}`;
            const customHeaders = {
                "Authorization": `Bearer ${user.accessToken}`,
            };
            const response = await put(url, {}, customHeaders);
            if (response.success) {
                setShowModal({
                    isVisible: true,
                    value: response.message,
                    type: 'success',
                    cancel: () => {
                        setShowModal((prev) => ({ ...prev, isVisible: false }));
                    }
                });
                fetchActivities();
            }
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
                setShowModal({
                    isVisible: true,
                    value: error.message,
                    type: 'error',
                    showConfirm: false,
                    cancel: () => {
                        setShowModal((prev) => ({ ...prev, isVisible: false }));
                    },
                });
                console.log("Unexpected error format:", error);
            }
        } finally {
            setLoading(false);
        }}
    return (
        <SafeAreaView className="w-full h-full bg-primary px-3">
            {loading ? <Loader /> : (
                <>

                    <View>
                        <FlatList
                            data={result && result.requestedRides}
                            style={{ width: '100%', height: '100%', paddingBottom: 400 }}
                            keyExtractor={(item, index) => index.toString()}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            ListEmptyComponent={
                                <Text className="mt-7 text-xl font-umedium text-secondary">You don't have any recent activity.</Text>
                            }
                            ListHeaderComponent={
                                <>
                                    <View className="w-full h-10 mt-5">
                                        <Text className="text-3xl font-bold text-white">Activity</Text>
                                    </View>
                                    {(result && result.acceptedRides.length != 0) ?
                                        (<View>
                                            <Text className="text-xl mt-4 mb-2 text-white font-ubold">Ride Request</Text>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                style={{ borderWidth: 2, marginVertical: 10, borderColor: '#ff7b7be0', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                            >
                                                <View style={{ paddingHorizontal: 5, marginLeft: 10, marginVertical: 5 }}>
                                                    <View className="w-full flex-row justify-between items-center">
                                                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{formatDate(result.acceptedRides[0].createdAt)}</Text>
                                                        <Animated.Image source={icons.pending} style={{ width: 25, height: 25, transform: [{ rotate: spin }] }} resizeMode="contain" />
                                                    </View>
                                                    <View className="mt-2 flex-row justify-start">
                                                        <View className="w-1/5">
                                                            <Text className="text-white w">From-</Text>
                                                            <Text className="text-white">To-</Text>
                                                        </View>
                                                        <View className="w-4/5">
                                                            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                                {result.acceptedRides[0].pickupLocation && result.acceptedRides[0].pickupLocation.type}
                                                            </Text>
                                                            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                                {result.acceptedRides[0].dropoffLocation && result.acceptedRides[0].dropoffLocation.type}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className="mt-3 flex-row justify-start">
                                                        <View className="w-1/2 gap-x-3 flex-row">
                                                            <Text className="text-white w">Payment- </Text>
                                                            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                                {result.acceptedRides[0].paymentStatus}
                                                            </Text>
                                                        </View>
                                                        <View className="gap-x-3 flex-row pl-2">
                                                            <Text className="text-white">Total-</Text>
                                                            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                                {`\u20B9${parseFloat(result.acceptedRides[0].totalFare).toFixed(2)}`}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className="flex-row w-full justify-between">
                                                        <CustomButton title="Cancel" containerStyle="my-2  h-4 w-[45%] bg-[#1e5546] min-h-[45px]" textStyles="text-white" handlePress={()=>actionHandler("cancelled")} />
                                                        {user.isDriver ? (<CustomButton title="Accept" containerStyle="my-2 w-[45%] min-h-[45px] " handlePress={()=>actionHandler("accepted")} />) : (<CustomButton title="Pay" containerStyle="my-2 w-[45%] min-h-[45px] " />)
                                                        }
                                                    </View>
                                                </View>
                                            </TouchableOpacity></View>) :
                                        (<View>
                                            <Text className="text-xl mt-4 mb-2 text-white font-ubold">Upcoming</Text>
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                className={`border-2 border-darkgray rounded-lg overflow-hidden flex-row justify-between items-center`}
                                                onPress={()=>router.push("/mapViewer")}
                                            >
                                                <View className="w-[70%] ml-3 my-2">
                                                    <Text className="w-[95%] text-white text-lg font-ubold">You have no upcoming trips</Text>
                                                    <View className="flex-row items-center">
                                                        <Text className="text-white font-pregular text-sm">reserve your trip <Image source={images.rightArrow} className="w-5 h-5" /></Text>
                                                    </View>
                                                </View>
                                                <View className="w-[30%]">
                                                    <Image source={images.uberP} className="w-20 h-20" resizeMode="contain" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>)}
                                    <View className="flex-row justify-between mt-5 items-center">
                                        <Text className="text-xl mb-2 text-white font-ubold">Past</Text>
                                        <TouchableOpacity className="bg-darkgray w-9 h-9 flex justify-center items-center rounded-full">
                                            <Image source={images.bars} className="w-5 h-4" resizeMode='contain' />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{ borderWidth: 2, marginVertical: 10, borderColor: 'darkgray', borderRadius: 10, overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                >
                                    <View style={{ paddingHorizontal: 5, marginLeft: 10, marginVertical: 5 }}>
                                        <View className="w-full flex-row justify-between items-center">
                                            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{formatDate(item.createdAt)}</Text>
                                            <Image source={item.rideStatus == "cancelled" ? icons.cancelled : images.tick} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                        </View>
                                        <View className="mt-2 flex-row justify-start">
                                            <View className="w-1/5">
                                                <Text className="text-white w">From-</Text>
                                                <Text className="text-white">To-</Text>
                                            </View>
                                            <View className="w-4/5">
                                                <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                    {item.pickupLocation && item.pickupLocation.type}
                                                </Text>
                                                <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                    {item.dropoffLocation && item.dropoffLocation.type}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="mt-3 flex-row justify-start">
                                            <View className="w-1/2 gap-x-3 flex-row">
                                                <Text className="text-white w">Payment- </Text>
                                                <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                    {item.paymentStatus}
                                                </Text>
                                            </View>
                                            <View className="gap-x-3 flex-row pl-2">
                                                <Text className="text-white">Total-</Text>
                                                <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
                                                    {`\u20B9${parseFloat(item.totalFare).toFixed(2)}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </>
            )}
            {showModal.isVisible && <CustomModal data={showModal} />}
        </SafeAreaView>
    );
};

export default Activity;
