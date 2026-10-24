/**
 * index.tsx  –  Home / My Tasks Screen  (Question 1 – UTS PAM)
 * Full soft pastel colour palette throughout.
 */

import React, { useMemo, useState } from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import InfoCard from '@/components/InfoCard';
import { BottomTabInset } from '@/constants/theme';

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS_ID  = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember',
];

// ─── Week Calendar Strip ──────────────────────────────────────────────────────

function WeekStrip() {
  const today      = new Date();
  const todayIndex = today.getDay();

  const week = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - todayIndex + i);
      return { day: DAYS_SHORT[i], date: d.getDate(), isToday: i === todayIndex };
    }),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  const [selected, setSelected] = useState(todayIndex);

  return (
    <View style={calStyles.wrapper}>
      {week.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[calStyles.col, selected === index && calStyles.colSelected]}
          onPress={() => setSelected(index)}
          activeOpacity={0.7}
        >
          <Text style={[calStyles.dayLabel, selected === index && calStyles.dayLabelSel]}>
            {item.day}
          </Text>
          <Text style={[calStyles.dateNum, selected === index && calStyles.dateNumSel]}>
            {item.date}
          </Text>
          {item.isToday && (
            <View style={[calStyles.dot, selected === index ? calStyles.dotSel : calStyles.dotDef]} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const calStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 14,
    shadowColor: '#B0BDD0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  col: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 12,
    gap: 4,
    minWidth: 34,
  },
  colSelected: {
    backgroundColor: '#B4C8F0',   // soft periwinkle
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#B0BBCC',
  },
  dayLabelSel: { color: '#FFFFFF' },
  dateNum: {
    fontSize: 15,
    fontWeight: '800',
    color: '#374151',
  },
  dateNumSel: { color: '#FFFFFF' },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  dotDef: { backgroundColor: '#B4C8F0' },
  dotSel: { backgroundColor: '#FFFFFF' },
});

// ─── Main Screen ─────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const today     = new Date();
  const dateLabel = `${today.getDate()} ${MONTHS_ID[today.getMonth()]} ${today.getFullYear()}`;

  const handlePress = (title: string) => () =>
    Alert.alert('Detail Tugas', `Anda membuka detail tugas:\n"${title}"`);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF0FF" />

      {/* ── Soft Header ── */}
      <View style={styles.header}>
        <SafeAreaView edges={['top']}>
          {/* Decorative blobs */}
          <View style={styles.blob1} />
          <View style={styles.blob2} />
          <View style={styles.blob3} />

          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Selamat Datang 👋</Text>
              <Text style={styles.headerTitle}>My Tasks</Text>
            </View>
            <View style={styles.dateBox}>
              <Text style={styles.dateText}>{dateLabel}</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Scroll area ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: BottomTabInset + 28 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Week strip */}
        <WeekStrip />

        {/* Section row */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>Hari Ini</Text>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Tambah Tugas', 'Fitur akan segera hadir!')}
          >
            <Text style={styles.addBtnText}>＋  Tambah Tugas</Text>
          </TouchableOpacity>
        </View>

        {/* ── InfoCard instances ── */}

        <InfoCard
          title="Tugas UI/UX Design"
          description="Membuat desain tampilan aplikasi menggunakan Figma."
          deadline="10 Okt 2026"
          status="selesai"
          onPress={handlePress('Tugas UI/UX Design')}
        />

        <InfoCard
          title="Tugas Pemrograman Mobile"
          description="Membuat aplikasi mobile menggunakan React Native (Expo)."
          deadline="20 Okt 2026"
          status="proses"
          onPress={handlePress('Tugas Pemrograman Mobile')}
        />

        <InfoCard
          title="Presentasi Capstone Project"
          description="Mempresentasikan hasil proyek akhir kepada dosen penguji."
          deadline="30 Okt 2026"
          status="proses"
          onPress={handlePress('Presentasi Capstone Project')}
        />
      </ScrollView>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FF',   // very soft blue-white
  },

  // ── Header ──
  header: {
    backgroundColor: '#DDE8FF',   // soft periwinkle
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.35)',
    right: -50,
    top: -50,
  },
  blob2: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.22)',
    right: 70,
    bottom: -20,
  },
  blob3: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.18)',
    left: -18,
    bottom: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 6,
  },
  greeting: {
    fontSize: 13,
    color: '#7A8DB0',
    fontWeight: '500',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#374151',
    letterSpacing: -0.5,
  },
  dateBox: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 4,
  },
  dateText: {
    color: '#5A6A85',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Scroll ──
  scroll: { flex: 1 },

  // ── Section row ──
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
  },
  addBtn: {
    backgroundColor: '#C5D6F8',   // soft blue button
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: {
    color: '#3A5A96',
    fontSize: 13,
    fontWeight: '700',
  },
});
