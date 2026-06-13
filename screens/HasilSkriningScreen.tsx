import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import { HasilScan } from './ScanningScreen';

interface HasilSkriningScreenProps {
  hasil: HasilScan;
  onBack: () => void;
  onMenu: () => void;
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

// Tentukan status stunting dari Z-Score
const getStatus = (zscore: number) => {
  if (zscore < -3) return { label: 'Stunting Parah', color: '#E53935', bg: '#FFE5E5' };
  if (zscore < -2) return { label: 'Stunting', color: '#FB8C00', bg: '#FFF3E0' };
  if (zscore < 2)  return { label: 'Normal', color: '#43A047', bg: '#E8F5E9' };
  return { label: 'Tinggi', color: '#1E88E5', bg: '#E3F2FD' };
};

// Warna bar nutrisi
const getNutrisiColor = (value: number) => {
  if (value < 30) return '#F44336';
  if (value < 60) return '#FFC107';
  return '#4CAF50';
};

// Komponen bar nutrisi dengan animasi
const NutrisiBar = ({ label, value }: { label: string; value: number }) => {
  const animWidth = useRef(new Animated.Value(0)).current;
  const color = getNutrisiColor(value);

  useEffect(() => {
    Animated.timing(animWidth, {
      toValue: value,
      duration: 1000,
      delay: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={barStyles.wrapper}>
      <View style={barStyles.labelRow}>
        <Text style={barStyles.label}>{label}</Text>
        <Text style={[barStyles.value, { color }]}>{value}%</Text>
      </View>
      <View style={barStyles.track}>
        <Animated.View
          style={[
            barStyles.fill,
            {
              backgroundColor: color,
              width: animWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const barStyles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '500', color: '#333' },
  value: { fontSize: 13, fontWeight: '700' },
  track: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 5 },
});

export default function HasilSkriningScreen({ hasil, onBack, onMenu }: HasilSkriningScreenProps) {
  const status = getStatus(hasil.zscore);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundGradient />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={onBack}>
          <Text style={styles.headerBtnText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={styles.headerIcon}>📊</Text>
          <Text style={styles.headerText}>Hasil Skrining</Text>
        </View>
        <TouchableOpacity style={styles.headerBtn} onPress={onMenu}>
          <Text style={styles.headerBtnText}>☰</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.content}
        style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Pasien */}
        <View style={styles.patientCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View>
            <Text style={styles.patientName}>{hasil.nama}</Text>
            <Text style={styles.patientAge}>{hasil.usia}</Text>
          </View>
        </View>

        {/* Z-Score */}
        <Text style={styles.zscoreLabel}>Z-Score</Text>
        <Text style={[styles.zscoreValue, { color: status.color }]}>
          {hasil.zscore}
        </Text>

        {/* Status Badge */}
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={styles.statusIcon}>⚠️</Text>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.label}
          </Text>
        </View>

        {/* Bar Nutrisi */}
        <View style={styles.nutrisiCard}>
          <NutrisiBar label="Protein" value={hasil.protein} />
          <NutrisiBar label="Mineral" value={hasil.mineral} />
          <NutrisiBar label="Lemak" value={hasil.lemak} />
        </View>

        {/* Rekomendasi */}
        <View style={styles.rekomendasiCard}>
          <Text style={styles.rekomendasiIcon}>⚠️</Text>
          <Text style={styles.rekomendasiText}>
            <Text style={styles.rekomendasiBold}>Rekomendasi : </Text>
            {hasil.zscore < -3
              ? 'segera lakukan pemeriksaan lanjutan ke tenaga Kesehatan professional di Puskesmas terdekat'
              : hasil.zscore < -2
              ? 'konsultasikan kondisi anak ke dokter atau ahli gizi terdekat'
              : 'pertahankan pola makan sehat dan pantau pertumbuhan anak secara rutin'}
          </Text>
        </View>

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3DC8B8',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnText: { fontSize: 18, color: 'white', fontWeight: '700' },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerIcon: { fontSize: 20 },
  headerText: { fontSize: 18, fontWeight: '800', color: 'white', letterSpacing: 0.5 },

  content: {
    padding: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },

  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    marginBottom: 24,
    marginTop: 16,
    alignSelf: 'stretch',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { fontSize: 22 },
  patientName: { fontSize: 16, fontWeight: '800', color: '#111' },
  patientAge: { fontSize: 13, color: '#666' },

  zscoreLabel: {
    fontSize: 22,
    fontWeight: '600',
    color: '#444',
    letterSpacing: 1,
    marginBottom: 4,
  },
  zscoreValue: {
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -2,
    marginBottom: 16,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  statusIcon: { fontSize: 20 },
  statusText: { fontSize: 18, fontWeight: '800', letterSpacing: 0.5 },

  nutrisiCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignSelf: 'stretch',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  rekomendasiCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 16,
    alignSelf: 'stretch',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    elevation: 2,
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  rekomendasiIcon: { fontSize: 20, marginTop: 1 },
  rekomendasiText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 20 },
  rekomendasiBold: { fontWeight: '700', color: '#333' },
});