import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { StorageNotice } from '../components/StorageNotice';
import { useHabits } from '../context/HabitContext';
import { colors } from '../theme';

const features = [
  { emoji: '🧠', title: 'Bangun rutinitas sehat', description: 'Catat kebiasaan kecil yang ingin kamu jaga.' },
  { emoji: '📊', title: 'Pantau progres', description: 'Lihat ringkasan aktivitasmu dalam 7 hari.' },
  { emoji: '💾', title: 'Tersimpan di perangkat', description: 'Data tetap ada saat aplikasi dibuka kembali.' },
];

export function ProfileScreen() {
  const { habits, resetHabits, storageMessage } = useHabits();
  const totalCompletions = habits.reduce((total, habit) => total + habit.completedDates.length, 0);

  function confirmReset() {
    Alert.alert(
      'Kembalikan kebiasaan awal?',
      'Kebiasaan buatanmu dan seluruh catatan progres akan diganti dengan daftar contoh.',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Kembalikan', style: 'destructive', onPress: resetHabits },
      ],
    );
  }

  return (
    <ScreenLayout>
      <StorageNotice message={storageMessage} />
      <Text style={styles.eyebrow}>RUANG PRIBADIMU</Text>
      <Text style={styles.title}>Tentang LangkahBaik</Text>

      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileEmoji}>🌱</Text>
        </View>
        <Text style={styles.appName}>LangkahBaik</Text>
        <Text style={styles.tagline}>Tumbuh dengan kebiasaan baik.</Text>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <View style={styles.summary}>
            <Text style={styles.summaryValue}>{habits.length}</Text>
            <Text style={styles.summaryLabel}>Kebiasaan aktif</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.summary}>
            <Text style={styles.summaryValue}>{totalCompletions}</Text>
            <Text style={styles.summaryLabel}>Rutinitas selesai</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Yang bisa kamu lakukan</Text>
      {features.map((feature) => (
        <View key={feature.title} style={styles.featureRow}>
          <View style={styles.featureIcon}>
            <Text style={styles.featureEmoji}>{feature.emoji}</Text>
          </View>
          <View style={styles.featureCopy}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        </View>
      ))}

      <View style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>Dibuat untuk perubahan positif</Text>
        <Text style={styles.aboutText}>
          LangkahBaik adalah aplikasi sederhana untuk membantu membangun kebiasaan yang bermanfaat bagi diri sendiri.
        </Text>
        <Text style={styles.version}>Versi 1.0.0  ·  React Native</Text>
      </View>

      <Pressable onPress={confirmReset} style={styles.resetButton}>
        <Text style={styles.resetText}>Kembalikan daftar kebiasaan awal</Text>
      </Pressable>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    letterSpacing: 1.1,
    fontWeight: '800',
    marginTop: 6,
  },
  title: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: '800',
    marginTop: 7,
    marginBottom: 20,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileIcon: {
    width: 67,
    height: 67,
    borderRadius: 23,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileEmoji: {
    fontSize: 34,
  },
  appName: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 11,
  },
  tagline: {
    color: colors.secondaryText,
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    alignSelf: 'stretch',
    marginVertical: 17,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  summary: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: '800',
  },
  summaryLabel: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 3,
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
  },
  featureIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureEmoji: {
    fontSize: 19,
  },
  featureCopy: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  featureDescription: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 3,
  },
  aboutCard: {
    backgroundColor: colors.yellowLight,
    borderRadius: 17,
    padding: 16,
    marginTop: 14,
  },
  aboutTitle: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  aboutText: {
    color: colors.secondaryText,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  version: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 12,
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 7,
  },
  resetText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
  },
});
