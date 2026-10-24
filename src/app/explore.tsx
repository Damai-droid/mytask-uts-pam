/**
 * explore.tsx  –  Student Directory Screen  (Question 2 – UTS PAM)
 * Full soft pastel colour palette throughout.
 */

import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset } from '@/constants/theme';

// ─── Static Dataset ───────────────────────────────────────────────────────────

const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri',    prodi: 'Sistem Informasi',    nim: '2024101001' },
  { id: '2', nama: 'Budi Santoso',    prodi: 'Teknologi Informasi', nim: '2024101002' },
  { id: '3', nama: 'Citra Dewi',      prodi: 'Sistem Informasi',    nim: '2024101003' },
  { id: '4', nama: 'Dimas Anggara',   prodi: 'Teknik Informatika',  nim: '2024101004' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi',    nim: '2024101005' },
  { id: '6', nama: 'Fajar Ramadhan',  prodi: 'Teknik Informatika',  nim: '2024101006' },
  { id: '7', nama: 'Gita Aulia',      prodi: 'Teknologi Informasi', nim: '2024101007' },
];

type Mahasiswa = (typeof DAFTAR_MAHASISWA)[number];

// ─── Prodi filter options ─────────────────────────────────────────────────────

const PRODI_LIST = [
  'Semua',
  'Sistem Informasi',
  'Teknologi Informasi',
  'Teknik Informatika',
];

// ─── Soft pastel prodi badge colours ─────────────────────────────────────────

const PRODI_COLORS: Record<string, { bg: string; text: string }> = {
  'Sistem Informasi':    { bg: '#DBE8FF', text: '#4A6FA8' },
  'Teknologi Informasi': { bg: '#D8F5E8', text: '#3D8962' },
  'Teknik Informatika':  { bg: '#EDE5FF', text: '#6B4EAE' },
};

// ─── Soft avatar palette ──────────────────────────────────────────────────────

const AVATAR_PALETTE = [
  '#F5B8C4',   // soft rose
  '#A8D8EA',   // soft sky
  '#C4B5F0',   // soft lavender
  '#A8DFC9',   // soft mint
  '#F7D9A8',   // soft peach
  '#B8D4F0',   // soft cornflower
  '#F0C4D4',   // soft blush
];

const AVATAR_TEXT_PALETTE = [
  '#8E3A50', '#2D6A8A', '#4A3580', '#2A7A58',
  '#8A5A20', '#2A4E8A', '#7A3050',
];

function avatarBg(id: string)   { return AVATAR_PALETTE[(parseInt(id, 10) - 1) % AVATAR_PALETTE.length]; }
function avatarFg(id: string)   { return AVATAR_TEXT_PALETTE[(parseInt(id, 10) - 1) % AVATAR_TEXT_PALETTE.length]; }

function getInitials(nama: string): string {
  return nama.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

// ─── Student Row ──────────────────────────────────────────────────────────────

function StudentItem({ item }: { item: Mahasiswa }) {
  const prodiColor = PRODI_COLORS[item.prodi] ?? { bg: '#EDF2F7', text: '#4A5568' };

  return (
    <TouchableOpacity style={itemStyles.card} activeOpacity={0.75}>
      {/* Avatar */}
      <View style={[itemStyles.avatar, { backgroundColor: avatarBg(item.id) }]}>
        <Text style={[itemStyles.avatarText, { color: avatarFg(item.id) }]}>
          {getInitials(item.nama)}
        </Text>
        <View style={itemStyles.avatarBadge}>
          <Text style={{ fontSize: 10 }}>🎓</Text>
        </View>
      </View>

      {/* Info */}
      <View style={itemStyles.info}>
        <Text style={itemStyles.name}>{item.nama}</Text>
        <Text style={itemStyles.prodiSub}>{item.prodi}</Text>
        <View style={[itemStyles.prodiChip, { backgroundColor: prodiColor.bg }]}>
          <Text style={[itemStyles.prodiChipText, { color: prodiColor.text }]}>
            {item.prodi}
          </Text>
        </View>
      </View>

      {/* Arrow */}
      <View style={itemStyles.arrowBox}>
        <Text style={itemStyles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const itemStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 18,
    marginVertical: 6,
    shadowColor: '#B0C0D8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  info: { flex: 1, gap: 2 },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#374151',
  },
  prodiSub: {
    fontSize: 12,
    color: '#A8B4C4',
    marginBottom: 5,
  },
  prodiChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  prodiChipText: {
    fontSize: 11,
    fontWeight: '700',
  },
  arrowBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EEF3F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#A0B0C4',
    lineHeight: 24,
    marginTop: -1,
  },
});

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ keyword }: { keyword: string }) {
  return (
    <View style={emptyStyles.container}>
      <View style={emptyStyles.iconWrap}>
        <Text style={emptyStyles.iconEmoji}>🔍</Text>
      </View>
      <Text style={emptyStyles.title}>Data tidak ditemukan!</Text>
      <Text style={emptyStyles.subtitle}>
        Tidak ada mahasiswa dengan nama{'\n'}
        <Text style={emptyStyles.kw}>"{keyword}"</Text>
        {'\n'}Coba kata kunci yang lebih spesifik.
      </Text>
    </View>
  );
}

const emptyStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
    gap: 12,
  },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E4EDFF',   // soft blue circle
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconEmoji: { fontSize: 40 },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#A8B4C4',
    textAlign: 'center',
    lineHeight: 20,
  },
  kw: { color: '#7A9AC8', fontWeight: '700' },
});

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();

  // ── Search state (Q2 requirement) ─────────────────────────────────────────
  const [keyword, setKeyword] = useState<string>('');
  const [selectedProdi, setSelectedProdi] = useState<string>('Semua');

  // ── Real-time filter (Q2 requirement) ─────────────────────────────────────
  const filteredData = DAFTAR_MAHASISWA.filter((item) => {
    const matchName  = item.nama.toLowerCase().includes(keyword.toLowerCase());
    const matchProdi = selectedProdi === 'Semua' || item.prodi === selectedProdi;
    return matchName && matchProdi;
  });

  const keyExtractor = (item: Mahasiswa) => item.id;
  const renderItem   = ({ item }: ListRenderItemInfo<Mahasiswa>) => (
    <StudentItem item={item} />
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#D9E8FF" />

      {/* ── Soft Hero Header ── */}
      <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
        <View style={styles.blob1} />
        <View style={styles.blob2} />
        <View style={styles.blob3} />

        <View style={styles.heroContent}>
          <View style={styles.heroTexts}>
            <Text style={styles.heroTitle}>Direktori Mahasiswa</Text>
            <Text style={styles.heroSubtitle}>
              Cari dan temukan teman seangkatanmu 🎓
            </Text>
          </View>
          <View style={styles.heroDecor}>
            <Text style={{ fontSize: 34 }}>📚</Text>
            <Text style={{ fontSize: 38 }}>🎓</Text>
          </View>
        </View>
      </View>

      {/* ── Search Bar ── */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama mahasiswa..."
            placeholderTextColor="#B8C4D4"
            value={keyword}
            onChangeText={setKeyword}
            returnKeyType="search"
            autoCapitalize="words"
          />
          {keyword.length > 0 && (
            <TouchableOpacity onPress={() => setKeyword('')} hitSlop={8}>
              <View style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>✕</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Stat bar + Prodi filter ── */}
      <View style={styles.statBar}>
        <Text style={styles.statCount}>👥 {filteredData.length} Mahasiswa</Text>

        <FlatList
          horizontal
          data={PRODI_LIST}
          keyExtractor={(p) => p}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingRight: 4 }}
          renderItem={({ item: p }) => (
            <TouchableOpacity
              style={[
                styles.prodiChip,
                selectedProdi === p && styles.prodiChipActive,
              ]}
              onPress={() => setSelectedProdi(p)}
              activeOpacity={0.75}
            >
              <Text
                style={[
                  styles.prodiChipText,
                  selectedProdi === p && styles.prodiChipTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ── FlatList ── */}
      <FlatList
        data={filteredData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState keyword={keyword} />}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + BottomTabInset + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F7FF',   // very soft blue-white
  },

  // ── Hero ──
  hero: {
    backgroundColor: '#D9E8FF',   // soft periwinkle header
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.38)',
    right: -50,
    top: -50,
  },
  blob2: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.25)',
    right: 70,
    bottom: -30,
  },
  blob3: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.20)',
    left: -18,
    bottom: 0,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTexts: { flex: 1, gap: 6 },
  heroTitle: {
    fontSize: 23,
    fontWeight: '900',
    color: '#374151',
    letterSpacing: -0.3,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#6A80A0',
    fontWeight: '500',
    lineHeight: 19,
  },
  heroDecor: { alignItems: 'center', gap: 2 },

  // ── Search ──
  searchSection: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 4,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    shadowColor: '#B0C0D8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    padding: 0,
  },
  clearBtn: {
    backgroundColor: '#E8EFF8',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 10,
    color: '#7A8EA8',
    fontWeight: '700',
  },

  // ── Stat + filter bar ──
  statBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 12,
  },
  statCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6A80A0',
    flexShrink: 0,
  },
  prodiChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: '#D8E4F4',
  },
  prodiChipActive: {
    backgroundColor: '#C5D6F8',   // soft blue active chip
    borderColor: '#C5D6F8',
  },
  prodiChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A90B0',
  },
  prodiChipTextActive: {
    color: '#3A5A96',
  },

  // ── List ──
  list: { flexGrow: 1, paddingTop: 4 },
});
