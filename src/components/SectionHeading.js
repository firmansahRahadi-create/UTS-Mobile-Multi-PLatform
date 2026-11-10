import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function SectionHeading({ title, subtitle, action }) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 13,
    marginTop: 4,
  },
});
