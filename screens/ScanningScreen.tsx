import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import LogoImage from '../assets/Asset_9.png';

interface ScanningScreenProps {
  onSelesai: (hasil: HasilScan) => void;
}

export interface HasilScan {
  nama: string;
  usia: string;
  zscore: number;
  protein: number;
  mineral: number;
  lemak: number;
}

const BackgroundGradient = () => (
  <Svg width="100%" height="100%" style={StyleSheet.absoluteFillObject}>
    <Defs>
      <RadialGradient id="grad" cx="50%" cy="55%" rx="50%" ry="80%">
        <Stop offset="0%" stopColor="#F5FFFF" />
        <Stop offset="40%" stopColor="#DCEAE8" />
        <Stop offset="75%" stopColor="#B9D6D2" />
        <Stop offset="100%" stopColor="#AED9D0" />
      </RadialGradient>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#grad)" />
  </Svg>
);

export default function ScanningScreen({ onSelesai }: ScanningScreenProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const ringAnim1 = useRef(new Animated.Value(1)).current;
  const ringAnim2 = useRef(new Animated.Value(1)).current;
  const ringOpacity1 = useRef(new Animated.Value(0.6)).current;
  const ringOpacity2 = useRef(new Animated.Value(0.4)).current;
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Animasi pulse logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.08, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();

    // Animasi ring ripple 1
    Animated.loop(
      Animated.parallel([
        Animated.timing(ringAnim1, { toValue: 1.5, duration: 1600, useNativeDriver: true }),
        Animated.timing(ringOpacity1, { toValue: 0, duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    // Animasi ring ripple 2 (delay)
    setTimeout(() => {
      Animated.loop(
        Animated.parallel([
          Animated.timing(ringAnim2, { toValue: 1.5, duration: 1600, useNativeDriver: true }),
          Animated.timing(ringOpacity2, { toValue: 0, duration: 1600, useNativeDriver: true }),
        ])
      ).start();
    }, 800);

    // Animasi titik-titik
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Simulasi scanning selesai setelah 4 detik
    // TODO: Ganti dengan hasil scanning dari alat via Bluetooth
    const timer = setTimeout(() => {
      clearInterval(dotsInterval);
      onSelesai({
        nama: 'Budi Santoso',
        usia: '24 Bulan',
        zscore: -3.5,
        protein: 30,
        mineral: 27,
        lemak: 39,
      });
    }, 4000);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BackgroundGradient />

      <View style={styles.content}>
        <Text style={styles.label}>Memulai Scanning{dots}</Text>

        {/* Logo dengan efek ripple */}
        <View style={styles.logoWrapper}>
          {/* Ring ripple 1 */}
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: ringAnim1 }],
                opacity: ringOpacity1,
              },
            ]}
          />
          {/* Ring ripple 2 */}
          <Animated.View
            style={[
              styles.ring,
              {
                transform: [{ scale: ringAnim2 }],
                opacity: ringOpacity2,
              },
            ]}
          />

          {/* Logo circle */}
          <Animated.View
            style={[styles.logoCircle, { transform: [{ scale: pulseAnim }] }]}
          >
            <Image
              source={LogoImage}
              style={{ width: 130, height: 130, resizeMode: 'contain' }}
            />
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
}

const CIRCLE_SIZE = 220;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
    letterSpacing: 0.5,
  },

  logoWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ring: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 4,
    borderColor: '#3DC8B8',
  },

  logoCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#3DC8B8',
    elevation: 12,
    shadowColor: '#3DC8B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
});