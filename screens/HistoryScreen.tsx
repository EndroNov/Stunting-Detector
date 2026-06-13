import React, { useState } from 'react';
import SearchIcon from '../assets/icon/search.png';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';

type FilterType = 'All' | 'Normal' | 'Stunting' | 'Stunting parah';

interface Patient {
  id: string;
  name: string;
  age: string;
  zscore: number;
  status: FilterType;
}

const DUMMY_DATA: Patient[] = [
  { id: '1', name: 'Budi Santoso', age: '24 Bulan', zscore: -3.5, status: 'Stunting parah' },
  { id: '2', name: 'Jonathan', age: '20 Bulan', zscore: -2.7, status: 'Stunting' },
  { id: '3', name: 'Muh. Zacky', age: '16 Bulan', zscore: -1.5, status: 'Normal' },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  'Stunting parah': { bg: '#FFE5E5', text: '#E53935' },
  'Stunting': { bg: '#FFF3E0', text: '#FB8C00' },
  'Normal': { bg: '#E8F0FE', text: '#3D72ED' },
};

interface HistoryScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HistoryScreen({ onNavigate }: HistoryScreenProps) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filters: FilterType[] = ['All', 'Normal', 'Stunting', 'Stunting parah'];

  const filtered = DUMMY_DATA.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || p.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const renderPatient = ({ item }: { item: Patient }) => {
    const color = STATUS_COLORS[item.status];
    return (
      <View style={styles.patientCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarIcon}>👤</Text>
        </View>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{item.name}</Text>
          <Text style={styles.patientDetail}>{item.age}</Text>
          <Text style={styles.patientDetail}>Z-Score : {item.zscore}</Text>
        </View>
        <View style={styles.patientActions}>
          <View style={[styles.statusBadge, { backgroundColor: color.bg }]}>
            <Text style={[styles.statusText, { color: color.text }]}>{item.status}</Text>
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={styles.detailButtonText}>Lihat Detail →</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari Nama"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#aaa"
          />
          <Image
            source={SearchIcon}
            style={{ width: 18, height: 18, resizeMode: 'contain', }}
          />
        </View>
        <TouchableOpacity style={styles.pilihButton}>
          <Text style={styles.pilihText}>Pilih</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, activeFilter === f && styles.filterTabActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderPatient}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Tidak ada data ditemukan</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A8E0D9', padding: 16, paddingBottom: 0, },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 44,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 25,
    marginLeft: 20,
    borderWidth: 0.7,
    // borderColor: '#aaa',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#222' },
  searchIcon: { fontSize: 18 },
  pilihButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 25,
    marginRight: 20,
    borderWidth: 0.7,
    // borderColor: '#aaa',
  },
  pilihText: { fontWeight: '600', color: '#333', fontSize: 14 },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 3,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2,
    borderWidth: 0.7,
    // borderColor: '#aaa',
  },
  filterTabActive: { backgroundColor: '#3DC8B8' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#555' },
  filterTextActive: { color: 'white' },

  listContainer: {
    flex: 1,
    backgroundColor: '#D4D4D4',
    borderRadius: 16,
    padding: 12,
    marginBottom: 100,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  listContent: { gap: 10 },

  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    gap: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 6,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { fontSize: 24 },
  patientInfo: { flex: 1 },
  patientName: { fontSize: 15, fontWeight: '700', color: '#222', marginBottom: 2 },
  patientDetail: { fontSize: 12, color: '#666' },

  patientActions: { alignItems: 'flex-end', gap: 6 },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { fontSize: 11, fontWeight: '700' },
  detailButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  detailButtonText: { fontSize: 11, fontWeight: '700', color: '#333' },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 14,
  },
});