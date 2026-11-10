import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function StatCard({ emoji, value, label, tint = colors.highlight }) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: tint }]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 17,
  },
  value: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '800',
  },
  label: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 3,
  },
});
