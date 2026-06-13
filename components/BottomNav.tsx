import React from 'react';
import Home from '../assets/icon/home.png';
import History from '../assets/icon/history.png';
import Profile from '../assets/icon/user.png';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

type TabType = 'home' | 'history' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabPress: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  const tabs = [
    { key: 'home' as TabType, label: 'Home', icon: Home },
    { key: 'history' as TabType, label: 'History', icon: History },
    { key: 'profile' as TabType, label: 'Profile', icon: Profile },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Image
            source={tab.icon}
            style={[styles.icon, activeTab === tab.key && styles.iconActive]}
          />
          <Text style={[styles.label, activeTab === tab.key && styles.labelActive]}>
            {tab.label}
          </Text>
          {activeTab === tab.key && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    position: 'relative',
  },
  icon: { width: 22, height: 22, opacity: 0.4 },
  iconActive: { opacity: 1 },
  label: { fontSize: 11, color: '#999', fontWeight: '500' },
  labelActive: { color: '#3DC8B8', fontWeight: '700' },
  indicator: {
    position: 'absolute',
    bottom: -10,
    width: 30,
    height: 3,
    backgroundColor: '#3DC8B8',
    borderRadius: 2,
  },
});