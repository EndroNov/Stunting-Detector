import React, { useState } from 'react';
import Power from '../assets/icon/power-on.png';
import click from '../assets/icon/click.png';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import DataAnakModal, { DataAnak } from './DataAnakModal';
import SendingScreen from './SendingScreen';
import ScanningScreen, { HasilScan } from './ScanningScreen';
import HasilSkriningScreen from './HasilSkriningScreen';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import LogoImage from '../assets/Asset_9.png';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
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

// Ikon baterai
const BatteryIcon = ({ percent }: { percent: number }) => {
  const bars = Math.round((percent / 100) * 3);
  return (
    <View style={batteryStyles.wrapper}>
      <View style={batteryStyles.body}>
        {[0, 1, 2].map(i => (
          <View
            key={i}
            style={[
              batteryStyles.bar,
              { backgroundColor: i < bars ? '#00FF66' : 'rgba(255,255,255,0.3)' },
            ]}
          />
        ))}
      </View>
      <View style={batteryStyles.tip} />
    </View>
  );
};

const batteryStyles = StyleSheet.create({
  wrapper: { flexDirection: 'row', alignItems: 'center' },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 3,
    padding: 2,
    gap: 2,
    height: 18,
  },
  bar: { width: 6, height: 10, borderRadius: 1 },
  tip: {
    width: 3,
    height: 8,
    backgroundColor: 'white',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    marginLeft: 1,
  },
});

// Ikon sinyal
const SignalIcon = ({ strength }: { strength: number }) => {
  const bars = Math.round((strength / 100) * 4);
  return (
    <View style={signalStyles.wrapper}>
      {[1, 2, 3, 4].map(i => (
        <View
          key={i}
          style={[
            signalStyles.bar,
            { height: 4 + i * 4 },
            { backgroundColor: i <= bars ? '#00FF66' : 'rgba(255,255,255,0.3)' },
          ]}
        />
      ))}
    </View>
  );
};

const signalStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    paddingVertical: 2,
  },
  bar: { width: 6, borderRadius: 2 },
});

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [showDataModal, setShowDataModal] = useState(false);
  const [showSending, setShowSending] = useState(false);
  const [showScanning, setShowScanning] = useState(false);
const [showHasil, setShowHasil] = useState(false);
const [hasilScan, setHasilScan] = useState<HasilScan | null>(null);
  const [deviceInfo, setDeviceInfo] = useState({
    merek: '-',
    battery: 0,
    batteryText: '-',
    device: '-',
    signal: 0,
    status: '-',
  });
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanDevice = () => {
    if (isConnected) {
      // Jika sudah terhubung, tap logo → mulai scanning
      setShowDataModal(true);
      return;
    }
    setIsScanning(true);
    // TODO: Ganti dengan logika Bluetooth scanning asli
    setTimeout(() => {
      setIsScanning(false);
      setDeviceInfo({
        merek: 'NutriLux Scan',
        battery: 65,
        batteryText: '65%',
        device: 'KS-242',
        signal: 75,
        status: 'Aktif',
      });
      setIsConnected(true);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setDeviceInfo({ merek: '-', battery: 0, batteryText: '-', device: '-', signal: 0, status: '-' });
  };

  const handleKirimData = (data: DataAnak) => {
    setShowDataModal(false);
    setTimeout(() => setShowSending(true), 300);
  };

  const handleSelesaiKirim = () => {
    setShowSending(false);
    setTimeout(() => setShowScanning(true), 300);
  };

  const handleSelesaiScanning = (hasil: HasilScan) => {
    setShowScanning(false);
    setHasilScan(hasil);
    setTimeout(() => setShowHasil(true), 300);
  };

  return (
    <View style={styles.container}>
      <BackgroundGradient />
      <ScrollView contentContainerStyle={styles.content}>

        {/* Baris 1: Merek & Battery */}
        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Merek perangkat</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>{deviceInfo.merek}</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Battery</Text>
            <View style={styles.infoCard}>
              {isConnected ? (
                <View style={styles.iconRow}>
                  <BatteryIcon percent={deviceInfo.battery} />
                  <Text style={styles.infoValue}>  {deviceInfo.batteryText}</Text>
                </View>
              ) : (
                <Text style={styles.infoValue}>-</Text>
              )}
            </View>
          </View>
        </View>

        {/* Baris 2: Device, Signal, Status */}
        <View style={styles.infoGrid}>
          <View style={[styles.infoColumn, { flex: 1.5 }]}>
            <Text style={styles.infoLabel}>Device</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>{deviceInfo.device}</Text>
            </View>
          </View>
          <View style={styles.signalColumn}>
            <View style={[styles.infoCard, styles.signalCard]}>
              {isConnected
                ? <SignalIcon strength={deviceInfo.signal} />
                : <Text style={styles.infoValue}>-</Text>
              }
            </View>
          </View>
          <View style={[styles.infoColumn, { flex: 1.5 }]}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoValue}>{deviceInfo.status}</Text>
            </View>
          </View>
        </View>

        {/* Tombol Scan / Terhubung */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.scanButton,
              isConnected && styles.scanButtonConnected,
              isScanning && styles.scanButtonDisabled,
            ]}
            onPress={handleScanDevice}
            disabled={isScanning}
            activeOpacity={0.85}
          >
            <Text style={[styles.scanButtonText, isConnected && styles.scanButtonTextConnected]}>
              {isScanning ? 'Mencari Perangkat...' : isConnected ? 'TERHUBUNG' : 'Tap untuk mencari perangkat'}
            </Text>
            {!isConnected && !isScanning && (
              <Image
                source={click}
                style={{ width: 30, height: 30, resizeMode: 'contain', marginTop: 10, marginBottom: -4, }}
              />
            )}
            {/* {isScanning && <Text style={styles.scanIcon}>⏳</Text>} */}
          </TouchableOpacity>

          {/* Tombol Power (muncul saat terhubung) */}
          {isConnected && (
            <TouchableOpacity
              style={styles.powerButton}
              onPress={handleDisconnect}
              activeOpacity={0.8}
            >
              <Image
                source={Power}
                style={{ width: 35, height: 35, resizeMode: 'contain', }}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Label bawah tombol */}
        <Text style={styles.connectLabel}>
          {isConnected ? 'Tap untuk memulai Scanning' : 'hubungkan perangkat'}
        </Text>

        {/* Logo Circle */}
          <View style={[styles.logoShadowWrapper, isConnected && styles.logoShadowConnected]}>
            <TouchableOpacity
              style={[styles.logoCircle, isConnected && styles.logoCircleConnected]}
              onPress={isConnected ? handleScanDevice : undefined}
              activeOpacity={isConnected ? 0.8 : 1}
            >
              <Image
                source={LogoImage}
                style={{ width: 120, height: 120, opacity: isConnected ? 1 : 0.30, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
      </ScrollView>
        <DataAnakModal
              visible={showDataModal}
              onClose={() => setShowDataModal(false)} 
              onKirim={handleKirimData}
              deviceName={deviceInfo.device}
            />

            {showSending && (
              <View style={StyleSheet.absoluteFillObject}>
                <SendingScreen
                  deviceName={deviceInfo.device}
                  onSelesai={handleSelesaiKirim}
                />
              </View>
            )}

            {showScanning && (
              <View style={StyleSheet.absoluteFillObject}>
                <ScanningScreen onSelesai={handleSelesaiScanning} />
              </View>
            )}

            {showHasil && hasilScan && (
              <View style={StyleSheet.absoluteFillObject}>
                <HasilSkriningScreen
                  hasil={hasilScan}
                  onBack={() => setShowHasil(false)}
                  onMenu={() => console.log('menu')}
                />
              </View>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 20,
    paddingBottom: 100,
    marginTop: 70,
    marginLeft: 20,
    marginRight: 20,
  },

  infoGrid: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  infoColumn: { flex: 1 },
  signalColumn: { justifyContent: 'flex-end', width: 50 },

  infoLabel: { fontSize: 14, fontWeight: '600', color: '#222', marginBottom: 4, marginLeft: 4 },
  infoCard: {
    backgroundColor: '#3DC8B8',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    minHeight: 40,
    justifyContent: 'center',
  },
  signalCard: { alignItems: 'center' },
  infoValue: { color: 'white', fontWeight: '700', fontSize: 15 },
  iconRow: { flexDirection: 'row', alignItems: 'center' },

  // Action row (tombol + power)
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  scanButton: {
    flex: 1,
    backgroundColor: '#3DC8B8',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#3DC8B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  scanButtonConnected: {
    backgroundColor: '#3DC8B8',
  },
  scanButtonDisabled: { opacity: 0.7 },
  scanButtonText: { color: 'black', fontSize: 16, fontWeight: '700' },
  scanButtonTextConnected: {
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
    color: '#00FF66',
    marginBottom: -4,
    marginTop: -4,
  },
  scanIcon: { fontSize: 24, marginTop: 4 },

  powerButton: {
    width: 56,
    height: 58,
    borderRadius: 12,
    backgroundColor: '#3DC8B8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#E53935',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  powerIcon: { fontSize: 26, color: '#E53935' },

  connectLabel: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 50,
    marginTop: 20,
  },

  // Wrapper luar: handle shadow & elevation (tidak overflow hidden)
  logoShadowWrapper: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  logoShadowConnected: {
    elevation: 25,
    shadowColor: '#3DC8B8',
    shadowOpacity: 0.5,
  },

  // Inner: handle border, clip, background
  logoCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: 'transparent',
    overflow: 'hidden',   // aman karena tidak ada shadow di sini
  },
  
  logoCircleConnected: {
    borderColor: '#3DC8B8',
  },
});