import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export function StorageNotice({ message }) {
  if (!message) return null;

  return (
    <View style={styles.notice}>
      <Text style={styles.text}>ⓘ  {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: colors.yellowLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  text: {
    color: colors.ink,
    fontSize: 12,
    lineHeight: 18,
  },
});
