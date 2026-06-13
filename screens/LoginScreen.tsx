import React, { useState, useRef } from 'react';
import HideEye from '../assets/icon/hide.png';
import OpenEye from '../assets/icon/eye (1).png';
import User from '../assets/icon/user.png';
import Password from '../assets/icon/padlock.png';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Animated,
  Image,
  Keyboard,
} from 'react-native';

import LogoImage from '../assets/Asset_11.png';

const { width, height } = Dimensions.get('window');

const LogoPlaceholder = () => (
  <View style={styles.logoContainer}>
    <View style={styles.crossShape}>
      <View style={styles.crossVertical} />
      <View style={styles.crossHorizontal} />
      <View style={styles.babyCircle}>
        <View style={styles.babyHead} />
      </View>
      <View style={[styles.bracket, styles.bracketTL]} />
      <View style={[styles.bracket, styles.bracketTR]} />
      <View style={[styles.bracket, styles.bracketBL]} />
      <View style={[styles.bracket, styles.bracketBR]} />
    </View>
  </View>
);

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
  onRegister,
  onForgotPassword,
}: LoginScreenProps) {
  const [nik, setNik] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    await new Promise(resolve => setTimeout(resolve, 300)); // Beri waktu untuk keyboard benar-benar hilang

    if (!nik || !password) {
      alert('NIK dan Password wajib diisi');
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    // TODO: Ganti dengan API call ke backend Golang kamu
    // Contoh:
    // const response = await fetch('http://YOUR_API_URL/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nik, password }),
    // });
    // const data = await response.json();
    // if (data.token) { onLoginSuccess(); }

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 500);
  };

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
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Logo */}
          <Image
            source={LogoImage}
            style={{ width: 180, height: 180, resizeMode: 'contain', marginBottom: 50, marginTop: 50 }}
          />

          {/* Form Card */}
          <View style={styles.card}>

            {/* NIK Field */}
            <Text style={styles.label}>Nik (Nomor Induk Kependudukan)</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={User}
                style={{ width: 20, height: 17, resizeMode: 'contain', tintColor: '#555' }}
              />
              <Text style={styles.inputSeparator}> :</Text>
              <TextInput
                style={styles.input}
                value={nik}
                onChangeText={setNik}
                placeholder="Masukkan NIK"
                keyboardType="numeric"
                maxLength={16}
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Password Field */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Image
                source={Password}
                style={{ width: 20, height: 17, resizeMode: 'contain', tintColor: '#555' }}
              />
              <Text style={styles.inputSeparator}> :</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                <Image
                  source={showPassword ? OpenEye : HideEye}
                  style={{ width: 22, height: 22, resizeMode: 'contain', tintColor: '#555' }}
                />
              </TouchableOpacity>
            </View>

            {/* Tombol Login */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={isLoading}
                activeOpacity={0.9}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Loading...' : 'LOGIN'}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPassword}>Forget Password</Text>
            </TouchableOpacity>

          </View>

          {/* Register Link */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum mempunyai akun? </Text>
            <TouchableOpacity onPress={onRegister}>
              <Text style={styles.registerLink}>Regist.</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    minHeight: '100%',
  },

  // Logo styles
  logoContainer: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  crossShape: {
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  crossVertical: {
    position: 'absolute',
    width: 42,
    height: 110,
    backgroundColor: '#3DC8B8',
    borderRadius: 10,
  },
  crossHorizontal: {
    position: 'absolute',
    width: 110,
    height: 42,
    backgroundColor: '#3DC8B8',
    borderRadius: 10,
  },
  babyCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  babyHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
  },
  bracket: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: '#2196F3',
    zIndex: 3,
  },
  bracketTL: { top: 0, left: 0, borderTopWidth: 2.5, borderLeftWidth: 2.5 },
  bracketTR: { top: 0, right: 0, borderTopWidth: 2.5, borderRightWidth: 2.5 },
  bracketBL: { bottom: 0, left: 0, borderBottomWidth: 2.5, borderLeftWidth: 2.5 },
  bracketBR: { bottom: 0, right: 0, borderBottomWidth: 2.5, borderRightWidth: 2.5 },

  // Title
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 3,
    marginBottom: 12,
    marginTop: 8,
  },

  // Card
  card: {
    width: '100%',
    backgroundColor: '#D4D4D4',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#000',
    
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 4,
    marginLeft: 7,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 14,
    marginBottom: 14,
    height: 44,
    shadowRadius: 6,
    borderWidth: 0.5,
    borderColor: '#000',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  inputIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  inputSeparator: {
    fontSize: 16,
    color: '#555',
    marginRight: 6,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#222',
    height: '100%',
  },
  eyeButton: {
    padding: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },

  // Login Button
  loginButton: {
    backgroundColor: '#3DC8B8',
    borderRadius: 25,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 12,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    paddingTop: 2,
  },

  // Forgot Password
  forgotPassword: {
    textAlign: 'center',
    color: '#555',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  // Register
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: 'blue',
    textDecorationLine: 'underline',
  },
});