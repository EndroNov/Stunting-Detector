import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import Svg, {
  Defs,
  RadialGradient,
  Rect,
  Stop,
  Circle,
} from 'react-native-svg';

const { width } = Dimensions.get('window');
const SIZE = 220;
const STROKE = 16;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface SendingScreenProps {
  deviceName: string;
  onSelesai: () => void;
}

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

// Komponen lingkaran progress SVG
const ProgressCircle = ({ percent }: { percent: number }) => {
  const strokeDashoffset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  return (
    <Svg width={SIZE} height={SIZE} style={{ transform: [{ rotate: '-90deg' }] }}>
      {/* Track (lingkaran background) */}
      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke="#e0f5f3"
        strokeWidth={STROKE}
        fill="none"
      />
      {/* Progress */}
      <Circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        stroke="#3DC8B8"
        strokeWidth={STROKE}
        fill="none"
        strokeDasharray={`${CIRCUMFERENCE}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default function SendingScreen({ deviceName, onSelesai }: SendingScreenProps) {
  const [percent, setPercent] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // Simulasi progress pengiriman data
    // TODO: Ganti dengan progress Bluetooth asli
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Tunggu sebentar lalu pindah halaman
          setTimeout(() => onSelesai(), 800);
          return 100;
        }
        return prev + 2; // naik 2% setiap interval
      });
    }, 80); // setiap 80ms → total ~4 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <BackgroundGradient />

      <View style={styles.content}>
        {/* Teks atas */}
        <Text style={styles.transferLabel}>Mentransfer Data ke Alat...</Text>
        <Text style={styles.deviceName}>{deviceName}</Text>

        {/* Lingkaran progress */}
        <View style={styles.circleWrapper}>
          <ProgressCircle percent={percent} />
          {/* Teks persen di tengah */}
          <View style={styles.percentWrapper}>
            <Text style={styles.percentText}>{percent} %</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  transferLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
    marginBottom: 40,
  },

  circleWrapper: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow untuk circle
    elevation: 8,
    shadowColor: '#3DC8B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  percentWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE - STROKE * 2 - 10,
    height: SIZE - STROKE * 2 - 10,
    backgroundColor: 'white',
    borderRadius: (SIZE - STROKE * 2 - 10) / 2,
  },
  percentText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 1,
  },
});