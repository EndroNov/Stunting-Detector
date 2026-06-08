import React, { useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';

type Screen = 'splash' | 'login' | 'home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');

  if (currentScreen === 'splash') {
    return (
      <SplashScreen
        onFinish={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          // TODO: Ganti dengan navigasi ke halaman Home/Dashboard
          console.log('Login berhasil!');
          setCurrentScreen('home');
        }}
        onRegister={() => {
          // TODO: Navigasi ke halaman Register
          console.log('Ke halaman Register');
        }}
        onForgotPassword={() => {
          // TODO: Navigasi ke halaman Forgot Password
          console.log('Ke halaman Forgot Password');
        }}
      />
    );
  }

  // Placeholder halaman home - ganti dengan komponen Home kamu
  return null;
}