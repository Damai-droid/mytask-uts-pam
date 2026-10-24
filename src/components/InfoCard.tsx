/**
 * InfoCard.tsx  –  Reusable Information Card Component  (Question 1 – UTS PAM)
 *
 * Props:
 *   title       – Task / information title             (string)
 *   description – Short task description               (string)
 *   deadline    – Deadline label, e.g. "10 Okt 2026"  (string)
 *   status      – 'selesai' | 'proses'                 (string)
 *   onPress     – Callback for "Lihat Detail" button   (function)
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// ─── Soft Pastel Theme Map ────────────────────────────────────────────────────

const THEME = {
  selesai: {
    cardBg:      '#F0FAF5',   // very soft mint
    cardBorder:  '#C8EDD9',
    accentBar:   '#7EC8A0',   // soft sage green
    iconBg:      '#B8E4CB',
    iconFg:      '#3D8C62',
    icon:        '✓',
    badgeBg:     '#DCF2E6',
    badgeText:   '#4A9E72',
    label:       'Selesai',
    btnBg:       '#8ECFAC',   // soft mint button
    btnText:     '#1F5C3E',
    decor:       'rgba(126,200,160,0.15)',
  },
  proses: {
    cardBg:      '#FEF6EE',   // very soft peach
    cardBorder:  '#F8D9BA',
    accentBar:   '#F4A96A',   // soft peach
    iconBg:      '#FAD7B3',
    iconFg:      '#B86A2E',
    icon:        '⏳',
    badgeBg:     '#FDEBD0',
    badgeText:   '#C27830',
    label:       'Proses',
    btnBg:       '#F4B97F',   // soft peach button
    btnText:     '#7A3D10',
    decor:       'rgba(244,169,106,0.15)',
  },
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

interface InfoCardProps {
  title: string;
  description: string;
  deadline: string;
  status: 'selesai' | 'proses';
  onPress: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function InfoCard({
  title,
  description,
  deadline,
  status,
  onPress,
}: InfoCardProps) {
  const t = THEME[status];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: t.cardBg, borderColor: t.cardBorder },
      ]}
    >
      {/* Left accent bar */}
      <View style={[styles.accentBar, { backgroundColor: t.accentBar }]} />

      {/* Decorative circle */}
      <View style={[styles.decorCircle, { backgroundColor: t.decor }]} />

      {/* ── Content ── */}
      <View style={styles.content}>

        {/* Top row: icon + badge */}
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: t.iconBg }]}>
            <Text style={[styles.iconText, { color: t.iconFg }]}>
              {t.icon}
            </Text>
          </View>

          <View style={[styles.badge, { backgroundColor: t.badgeBg }]}>
            <Text style={[styles.badgeText, { color: t.badgeText }]}>
              {t.label}
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Deadline row */}
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>📅</Text>
          <Text style={styles.infoText}>Deadline: {deadline}</Text>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: t.cardBorder }]} />

        {/* Lihat Detail button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: t.btnBg }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: t.btnText }]}>
            Lihat Detail  →
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    marginVertical: 9,
    marginHorizontal: 18,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#A0AABB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
  },
  accentBar: {
    width: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  decorCircle: {
    position: 'absolute',
    right: -30,
    top: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  content: {
    flex: 1,
    padding: 18,
  },

  // ── Top row ──
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  // ── Body ──
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 6,
    lineHeight: 24,
  },
  description: {
    fontSize: 13,
    color: '#8896A8',
    lineHeight: 19,
    marginBottom: 12,
  },

  // ── Info row ──
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  infoIcon: { fontSize: 13 },
  infoText: {
    fontSize: 12,
    color: '#A8B4C4',
    fontWeight: '500',
  },

  // ── Divider ──
  divider: {
    height: 1,
    marginBottom: 14,
    opacity: 0.7,
  },

  // ── Button ──
  button: {
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
