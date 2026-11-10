import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { StorageNotice } from '../components/StorageNotice';
import { getDateKey, useHabits } from '../context/HabitContext';
import { colors } from '../theme';

export function ProgressScreen() {
  const { habits, storageMessage } = useHabits();
  const today = getDateKey();

  const completedToday = habits.filter((habit) => habit.completedDates.includes(today)).length;
  const totalCompletions = habits.reduce((total, habit) => total + habit.completedDates.length, 0);
  const completedDays = new Set(habits.flatMap((habit) => habit.completedDates)).size;

  const week = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - index));
      const key = getDateKey(date);
      const completed = habits.filter((habit) => habit.completedDates.includes(key)).length;
      return {
        key,
        label: date.toLocaleDateString('id-ID', { weekday: 'short' }),
        day: date.getDate(),
        completed,
        ratio: habits.length ? completed / habits.length : 0,
        isToday: key === today,
      };
    });
  }, [habits, today]);

  const average = habits.length
    ? Math.round((totalCompletions / (habits.length * Math.max(completedDays, 1))) * 100)
    : 0;

  return (
    <ScreenLayout>
      <StorageNotice message={storageMessage} />
      <Text style={styles.eyebrow}>KEMAJUANMU</Text>
      <Text style={styles.title}>Setiap langkah berarti.</Text>
      <Text style={styles.subtitle}>Lihat konsistensimu, bukan kesempurnaanmu.</Text>

      <View style={styles.stats}>
        <StatCard emoji="✅" value={`${completedToday}/${habits.length}`} label="Hari ini" />
        <View style={styles.statGap} />
        <StatCard emoji="🔥" value={String(completedDays)} label="Hari aktif" tint={colors.yellowLight} />
        <View style={styles.statGap} />
        <StatCard emoji="🌟" value={`${average}%`} label="Konsistensi" tint={colors.lavender} />
      </View>

      <View style={styles.chartCard}>
        <SectionHeading title="7 hari terakhir" subtitle="Kebiasaan yang selesai setiap hari" />
        <View style={styles.chart}>
          {week.map((day) => (
            <View key={day.key} style={styles.barGroup}>
              <Text style={styles.barValue}>{day.completed || ''}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: `${day.ratio * 100}%`,
                      backgroundColor: day.completed ? colors.primary : colors.border,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.dayLabel, day.isToday && styles.todayLabel]}>{day.label}</Text>
              <Text style={[styles.dayNumber, day.isToday && styles.todayLabel]}>{day.day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendDot} />
          <Text style={styles.legendText}>Kebiasaan selesai</Text>
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteEmoji}>🌱</Text>
        <View style={styles.noteCopy}>
          <Text style={styles.noteTitle}>Konsistensi tumbuh pelan-pelan</Text>
          <Text style={styles.noteText}>
            Kamu sudah menyelesaikan {totalCompletions} rutinitas. Terus rawat progres kecilmu hari ini.
          </Text>
        </View>
      </View>
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
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 13,
    marginTop: 6,
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  statGap: {
    width: 9,
  },
  chartCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chart: {
    height: 164,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 7,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barValue: {
    height: 16,
    color: colors.secondaryText,
    fontSize: 10,
    fontWeight: '700',
  },
  barTrack: {
    width: 21,
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
  barFill: {
    width: '100%',
    minHeight: 3,
    borderRadius: 10,
  },
  dayLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '600',
  },
  dayNumber: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 2,
  },
  todayLabel: {
    color: colors.primary,
    fontWeight: '800',
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 13,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  legendText: {
    color: colors.secondaryText,
    fontSize: 10,
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.highlight,
    borderRadius: 18,
    padding: 16,
    marginTop: 15,
    marginBottom: 10,
  },
  noteEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  noteCopy: {
    flex: 1,
  },
  noteTitle: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
  },
  noteText: {
    color: colors.secondaryText,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
});
