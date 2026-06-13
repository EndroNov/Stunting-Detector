import React from 'react';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';
import StatistikIcon from '../assets/icon/statistic.png';
import PersonalIcon from '../assets/icon/id-card.png';
import NotificationIcon from '../assets/icon/notification.png';
import SupportIcon from '../assets/icon/support.png';
import SettingIcon from '../assets/icon/settings.png';
import LogoutIcon from '../assets/icon/logout.png';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

interface ProfileScreenProps {
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

interface MenuItem {
  icon: any;
  label: string;
  screen?: string;
  isLogout?: boolean;
  isRed?: boolean;
}

const menuGroups: MenuItem[][] = [
  [
    { icon: StatistikIcon, label: 'Hasil Analisis Status Stunting', screen: 'analysis' },
  ],
  [
    { icon: PersonalIcon, label: 'Personal Information', screen: 'personal' },
    { icon: NotificationIcon, label: 'Notifications', screen: 'notifications' },
    { icon: SupportIcon, label: 'Customer Support', screen: 'support' },
  ],
  [
    { icon: SettingIcon, label: 'Settings', screen: 'settings' },
    { icon: LogoutIcon, label: 'Logout', isLogout: true, isRed: true },
  ],
];

export default function ProfileScreen({ onLogout, onNavigate }: ProfileScreenProps) {
  const handleMenuPress = (item: MenuItem) => {
    if (item.isLogout) {
      Alert.alert(
        'Logout',
        'Apakah kamu yakin ingin keluar?',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: onLogout },
        ]
      );
    } else if (item.screen) {
      onNavigate(item.screen);
    }
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
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header Profile */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <Text style={styles.nikText}>748622468465</Text>
            <Text style={styles.nameText}>Endro Novrianto</Text>
            <Text style={styles.emailText}>username123@gmail.com</Text>
          </View>
          <View style={styles.profileRight}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Groups */}
        {menuGroups.map((group, gi) => (
          <View key={gi} style={styles.menuCard}>
            {group.map((item, ii) => (
              <View key={ii}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleMenuPress(item)}
                  activeOpacity={0.7}
                >
                  <Image source={item.icon} style={styles.menuIcon} />
                  <Text style={[styles.menuLabel, item.isRed && styles.menuLabelRed]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.menuArrow, item.isRed && styles.menuArrowRed]}>›</Text>
                </TouchableOpacity>
                {ii < group.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A8E0D9' },
  content: { padding: 20, paddingBottom: 100 },

  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  profileInfo: { flex: 1 },
  nikText: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111',
    marginBottom: 4,
    marginTop: 30,
  },
  nameText: { fontSize: 15, color: '#333', marginBottom: 2 },
  emailText: { fontSize: 13, color: '#555' },

  profileRight: { alignItems: 'center', gap: 8 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { fontSize: 36 },
  editButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  editButtonText: { fontSize: 12, color: '#333', fontWeight: '600' },

  menuCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
      marginLeft: 5,
      marginRight: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 12,
  },
  menuIcon: { width: 25, height: 25 },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#222' },
  menuLabelRed: { color: '#E53935' },
  menuArrow: { fontSize: 22, color: '#999', fontWeight: '300' },
  menuArrowRed: { color: '#E53935' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 56 },
});