import React, { useMemo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { HabitCard } from '../components/HabitCard';
import { ScreenLayout } from '../components/ScreenLayout';
import { SectionHeading } from '../components/SectionHeading';
import { StorageNotice } from '../components/StorageNotice';
import { useHabits, getDateKey } from '../context/HabitContext';
import { colors, spacing } from '../theme';

export function HomeScreen({ navigation }) {
  const { habits, isReady, storageMessage, toggleHabit } = useHabits();
  const today = getDateKey();
  const dateLabel = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const completedCount = useMemo(
    () => habits.filter((habit) => habit.completedDates.includes(today)).length,
    [habits, today],
  );
  const percentage = habits.length ? Math.round((completedCount / habits.length) * 100) : 0;

  if (!isReady) {
    return (
      <ScreenLayout scroll={false} contentStyle={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Menyiapkan kebiasaanmu...</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <StorageNotice message={storageMessage} />
      <View style={styles.topline}>
        <View>
          <Text style={styles.eyebrow}>LANGKAHBAIK  ·  HARI INI</Text>
          <Text style={styles.date}>{dateLabel}</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>🌱</Text>
        </View>
      </View>

      <View style={styles.welcomeCard}>
        <View style={styles.welcomeCopy}>
          <Text style={styles.welcomeEyebrow}>SEDIKIT DEMI SEDIKIT</Text>
          <Text style={styles.welcomeTitle}>Kebiasaan baik,{'\n'}hidup lebih berarti.</Text>
          <Text style={styles.welcomeSubtitle}>Satu langkah kecil hari ini sudah berarti.</Text>
        </View>
        <View style={styles.sunCircle}>
          <Text style={styles.sunEmoji}>☀️</Text>
        </View>
        <View style={styles.progressRow}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressTitle}>Progres hari ini</Text>
            <Text style={styles.progressNumbers}>{completedCount} dari {habits.length} selesai</Text>
          </View>
          <Text style={styles.progressPercent}>{percentage}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.trackFill, { width: `${percentage}%` }]} />
        </View>
      </View>

      <SectionHeading
        title="Rutinitasmu"
        subtitle="Centang saat kamu sudah melakukannya"
        action={
          <Pressable onPress={() => navigation.navigate('Tambah')} hitSlop={8}>
            <Text style={styles.addLink}>+ Tambah</Text>
          </Pressable>
        }
      />

      {habits.length ? (
        habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            completed={habit.completedDates.includes(today)}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>🌿</Text>
          <Text style={styles.emptyTitle}>Mulai dari satu kebiasaan</Text>
          <Text style={styles.emptyText}>Tambahkan rutinitas kecil yang ingin kamu bangun.</Text>
          <Pressable style={styles.emptyButton} onPress={() => navigation.navigate('Tambah')}>
            <Text style={styles.emptyButtonText}>Buat kebiasaan</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.quoteCard}>
        <Text style={styles.quoteMark}>“</Text>
        <View style={styles.quoteCopy}>
          <Text style={styles.quote}>Kebiasaan kecil yang dijaga hari ini bisa menjadi perubahan besar esok hari.</Text>
          <Text style={styles.quoteBy}>Pengingat hari ini</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.secondaryText,
    marginTop: 12,
    fontSize: 14,
  },
  topline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    letterSpacing: 1.1,
    fontWeight: '800',
  },
  date: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 5,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 21,
  },
  welcomeCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: spacing.card,
    marginBottom: 26,
  },
  welcomeCopy: {
    minHeight: 126,
    paddingRight: 58,
  },
  welcomeEyebrow: {
    color: '#D5E9DA',
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '800',
  },
  welcomeTitle: {
    color: colors.surface,
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    marginTop: 10,
  },
  welcomeSubtitle: {
    color: '#E2EFE6',
    fontSize: 12,
    marginTop: 8,
  },
  sunCircle: {
    position: 'absolute',
    right: 18,
    top: 24,
    height: 50,
    width: 50,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  sunEmoji: {
    fontSize: 25,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 14,
    marginBottom: 10,
  },
  progressLabel: {
    gap: 3,
  },
  progressTitle: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '700',
  },
  progressNumbers: {
    color: '#D5E9DA',
    fontSize: 11,
  },
  progressPercent: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
  },
  track: {
    height: 7,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  trackFill: {
    height: 7,
    borderRadius: 8,
    backgroundColor: colors.yellow,
  },
  addLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyEmoji: {
    fontSize: 34,
    marginBottom: 10,
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.secondaryText,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 6,
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 13,
    marginTop: 16,
  },
  emptyButtonText: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: '700',
  },
  quoteCard: {
    marginTop: 17,
    marginBottom: 10,
    borderRadius: 18,
    backgroundColor: colors.yellowLight,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  quoteMark: {
    color: '#C59126',
    fontSize: 36,
    lineHeight: 37,
    fontWeight: '800',
    marginRight: 10,
  },
  quoteCopy: {
    flex: 1,
    paddingTop: 3,
  },
  quote: {
    color: colors.ink,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  quoteBy: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 8,
  },
});
