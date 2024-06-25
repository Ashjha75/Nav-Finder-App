// AnimatedSplashScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import images from '../constants/images';

export default function AnimatedSplashScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={images.logo} // your Lottie animation file
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
