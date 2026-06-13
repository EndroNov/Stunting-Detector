import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface DataAnakModalProps {
  visible: boolean;
  onClose: () => void;
  onKirim: (data: DataAnak) => void;
  deviceName: string;
}

export interface DataAnak {
  nama: string;
  hari: string;
  bulan: string;
  tahun: string;
  totalUsia: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  beratBadan: string;
  tinggiBadan: string;
}

export default function DataAnakModal({ visible, onClose, onKirim, deviceName }: DataAnakModalProps) {
  const [nama, setNama] = useState('');
  const [hari, setHari] = useState('');
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');

  // Hitung total usia otomatis
  const hitungUsia = () => {
    if (!hari || !bulan || !tahun) return '';
    const lahir = new Date(parseInt(tahun), parseInt(bulan) - 1, parseInt(hari));
    const sekarang = new Date();
    const selisihMs = sekarang.getTime() - lahir.getTime();
    const totalBulan = Math.floor(selisihMs / (1000 * 60 * 60 * 24 * 30.44));
    if (totalBulan < 0) return '';
    return `${totalBulan} Bulan`;
  };

  const totalUsia = hitungUsia();

  const handleKirim = () => {
    if (!nama || !hari || !bulan || !tahun || !beratBadan || !tinggiBadan) {
      alert('Semua field wajib diisi');
      return;
    }
    onKirim({
      nama,
      hari,
      bulan,
      tahun,
      totalUsia,
      jenisKelamin,
      beratBadan,
      tinggiBadan,
    });
  };

  const reset = () => {
    setNama('');
    setHari('');
    setBulan('');
    setTahun('');
    setJenisKelamin('Laki-laki');
    setBeratBadan('');
    setTinggiBadan('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.kvWrapper}
        >
          <View style={styles.modalCard}>

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.backButton}>
                <Text style={styles.backIcon}>←</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Masukkan Data Anak</Text>
              <View style={{ width: 32 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Nama */}
              <Text style={styles.label}>Nama</Text>
              <TextInput
                style={styles.input}
                value={nama}
                onChangeText={setNama}
                placeholder=""
                placeholderTextColor="#ccc"
              />

              {/* Tanggal Lahir */}
              <Text style={styles.label}>Tanggal Lahir</Text>
              <View style={styles.tanggalRow}>
                <TextInput
                  style={styles.tanggalInput}
                  value={hari}
                  onChangeText={setHari}
                  placeholder="hari"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.tanggalSep}>/</Text>
                <TextInput
                  style={styles.tanggalInput}
                  value={bulan}
                  onChangeText={setBulan}
                  placeholder="bulan"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={2}
                />
                <Text style={styles.tanggalSep}>/</Text>
                <TextInput
                  style={[styles.tanggalInput, { flex: 1.5 }]}
                  value={tahun}
                  onChangeText={setTahun}
                  placeholder="tahun"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>

              {/* Total Usia */}
              <Text style={styles.label}>Total Usia</Text>
              <View style={styles.usiaWrapper}>
                <Text style={styles.usiaText}>{totalUsia}</Text>
              </View>
              <Text style={styles.usiaHint}>(Otomatis terhitung dari tanggal lahir)</Text>

              {/* Jenis Kelamin */}
              <Text style={styles.label}>Jenis Kelamin</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity
                  style={[styles.genderButton, jenisKelamin === 'Laki-laki' && styles.genderActive]}
                  onPress={() => setJenisKelamin('Laki-laki')}
                >
                  <Text style={[styles.genderText, jenisKelamin === 'Laki-laki' && styles.genderTextActive]}>
                    Laki-laki
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderButton, jenisKelamin === 'Perempuan' && styles.genderActive]}
                  onPress={() => setJenisKelamin('Perempuan')}
                >
                  <Text style={[styles.genderText, jenisKelamin === 'Perempuan' && styles.genderTextActive]}>
                    Perempuan
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Berat Badan */}
              <Text style={styles.label}>Berat Badan (kg)</Text>
              <TextInput
                style={styles.input}
                value={beratBadan}
                onChangeText={setBeratBadan}
                placeholder=""
                keyboardType="decimal-pad"
                placeholderTextColor="#ccc"
              />

              {/* Tinggi Badan */}
              <Text style={styles.label}>Tinggi Badan (cm)</Text>
              <TextInput
                style={styles.input}
                value={tinggiBadan}
                onChangeText={setTinggiBadan}
                placeholder=""
                keyboardType="decimal-pad"
                placeholderTextColor="#ccc"
              />

              {/* Tombol Kirim */}
              <TouchableOpacity style={styles.kirimButton} onPress={handleKirim} activeOpacity={0.85}>
                <Text style={styles.kirimText}>Kirim Data ke Perangkat</Text>
              </TouchableOpacity>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  kvWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: { padding: 4 },
  backIcon: { fontSize: 22, color: '#333' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#111' },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 42,
    fontSize: 14,
    color: '#222',
    backgroundColor: '#fafafa',
  },

  tanggalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tanggalInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
    backgroundColor: '#fafafa',
  },
  tanggalSep: {
    fontSize: 18,
    color: '#555',
    fontWeight: '600',
  },

  usiaWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 42,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  usiaText: { fontSize: 14, color: '#555' },
  usiaHint: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
    marginLeft: 8,
    fontStyle: 'italic',
  },

  genderRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  genderActive: { backgroundColor: '#3DC8B8' },
  genderText: { fontSize: 14, fontWeight: '600', color: '#555' },
  genderTextActive: { color: 'white' },

  kirimButton: {
    backgroundColor: '#3DC8B8',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    elevation: 4,
    shadowColor: '#3DC8B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  kirimText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});