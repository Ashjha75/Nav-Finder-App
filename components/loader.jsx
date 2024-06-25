import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = () => (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    loader: {
        transform: [{ scale: 1.7 }], // this will double the size of the ActivityIndicator
    },
});

export default Loader;