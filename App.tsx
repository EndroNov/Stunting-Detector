import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';

type Screen = 'splash' | 'login' | 'main';
type TabType = 'home' | 'history' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [activeTab, setActiveTab] = useState<TabType>('home');

  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={() => setCurrentScreen('login')} />;
  }

  if (currentScreen === 'login') {
    return (
      <LoginScreen
        onLoginSuccess={() => setCurrentScreen('main')}
        onRegister={() => console.log('Ke Register')}
        onForgotPassword={() => console.log('Ke Forgot Password')}
      />
    );
  }

  return (
    <View style={styles.container}>
      {activeTab === 'home' && (
        <HomeScreen onNavigate={(screen: string) => console.log('Navigate:', screen)} />
      )}
      {activeTab === 'history' && (
        <HistoryScreen onNavigate={(screen: string) => console.log('Navigate:', screen)} />
      )}
      {activeTab === 'profile' && (
        <ProfileScreen
          onLogout={() => setCurrentScreen('login')}
          onNavigate={(s) => console.log('Navigate:', s)}
        />
      )}
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});