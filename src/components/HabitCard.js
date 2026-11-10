import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function HabitCard({ habit, completed, onToggle }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      accessibilityLabel={`${habit.title}, ${completed ? 'selesai' : 'belum selesai'}`}
      onPress={onToggle}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={[styles.emojiWrap, completed && styles.emojiDone]}>
        <Text style={styles.emoji}>{habit.emoji}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, completed && styles.titleDone]}>{habit.title}</Text>
        <Text style={styles.category}>{habit.category}</Text>
      </View>
      <View style={[styles.check, completed && styles.checkDone]}>
        {completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  emojiWrap: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  emojiDone: {
    backgroundColor: colors.highlight,
  },
  emoji: {
    fontSize: 22,
  },
  copy: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  titleDone: {
    color: colors.secondaryText,
    textDecorationLine: 'line-through',
  },
  category: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
  check: {
    width: 25,
    height: 25,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 18,
  },
});
