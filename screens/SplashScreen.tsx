import React, { useEffect, useRef } from 'react';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';

import LogoImage from '../assets/Asset_11.png';

const { width, height } = Dimensions.get('window');

// Ganti dengan logo asli kamu:
// import LogoImage from '../assets/logo.png';
// lalu pakai: <Image source={LogoImage} style={styles.logoImage} />

const LogoPlaceholder = () => (
  <View style={styles.logoContainer}>
    {/* Placeholder logo - ganti dengan <Image> saat logo sudah ada */}
    <View style={styles.crossShape}>
      <View style={styles.crossVertical} />
      <View style={styles.crossHorizontal} />
      <View style={styles.babyCircle}>
        <View style={styles.babyHead} />
      </View>
      {/* Corner brackets */}
      <View style={[styles.bracket, styles.bracketTL]} />
      <View style={[styles.bracket, styles.bracketTR]} />
      <View style={[styles.bracket, styles.bracketBL]} />
      <View style={[styles.bracket, styles.bracketBR]} />
    </View>
  </View>
);

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      // Logo muncul
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      // Teks muncul
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Pindah ke halaman login setelah 2.5 detik
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const BackgroundGradient = () => (
      <Svg
        width='100%'
        height='100%'
        style={StyleSheet.absoluteFillObject}
      >
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="55%"
            rx="50%"
            ry="80%"
          >
            <Stop offset="0%" stopColor="#F5FFFF" />
            <Stop offset="40%" stopColor="#DCEAE8" />
            <Stop offset="75%" stopColor="#B9D6D2" />
            <Stop offset="100%" stopColor="#AED9D0" />
          </RadialGradient>
        </Defs>
  
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>
    );

  return (
    <View style={styles.container}>
      <BackgroundGradient />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Animated.View
        style={[
          styles.logoWrapper,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Image source={LogoImage} style={{ width: 200, height: 200, resizeMode: 'contain', marginBottom: 16 }} />
      </Animated.View>

      <Animated.View
        style={[
          styles.textWrapper,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        {/* <Text style={styles.appName}>
          <Text style={styles.appNameBold}>NUTRILUX </Text>
          <Text style={styles.appNameLight}>SCAN</Text>
        </Text> */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossShape: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  crossVertical: {
    position: 'absolute',
    width: 50,
    height: 130,
    backgroundColor: '#3DC8B8',
    borderRadius: 12,
  },
  crossHorizontal: {
    position: 'absolute',
    width: 130,
    height: 50,
    backgroundColor: '#3DC8B8',
    borderRadius: 12,
  },
  babyCircle: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2.5,
    borderColor: 'white',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  babyHead: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
  },
  bracket: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: '#2196F3',
    zIndex: 3,
  },
  bracketTL: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  bracketTR: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bracketBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bracketBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  textWrapper: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    letterSpacing: 2,
  },
  appNameBold: {
    fontWeight: '800',
    color: '#1A5C8A',
  },
  appNameLight: {
    fontWeight: '400',
    color: '#1A5C8A',
  },
});