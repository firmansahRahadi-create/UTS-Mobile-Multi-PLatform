import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScreenLayout } from '../components/ScreenLayout';
import { StorageNotice } from '../components/StorageNotice';
import { useHabits } from '../context/HabitContext';
import { colors } from '../theme';

const categories = ['Kesehatan', 'Belajar', 'Kesejahteraan', 'Produktivitas'];
const emojis = ['💧', '📚', '🚶', '🧘', '🌼', '🎨', '🥗', '✨'];

export function AddHabitScreen({ navigation }) {
  const { addHabit, habits, storageMessage } = useHabits();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [emoji, setEmoji] = useState(emojis[0]);
  const [error, setError] = useState('');

  function handleSubmit() {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError('Nama kebiasaan belum diisi.');
      return;
    }
    if (cleanTitle.length > 50) {
      setError('Nama kebiasaan maksimal 50 karakter.');
      return;
    }
    if (habits.some((habit) => habit.title.toLocaleLowerCase() === cleanTitle.toLocaleLowerCase())) {
      setError('Kebiasaan dengan nama itu sudah ada.');
      return;
    }

    addHabit({ title: cleanTitle, category, emoji });
    setTitle('');
    setError('');
    navigation.navigate('HariIni');
  }

  return (
    <ScreenLayout contentStyle={styles.content}>
      <StorageNotice message={storageMessage} />
      <View style={styles.header}>
        <Text style={styles.eyebrow}>MULAI DARI HAL KECIL</Text>
        <Text style={styles.title}>Kebiasaan baru</Text>
        <Text style={styles.subtitle}>Pilih satu rutinitas sederhana untuk dirawat setiap hari.</Text>
      </View>

      <View style={styles.preview}>
        <View style={styles.previewIcon}>
          <Text style={styles.previewEmoji}>{emoji}</Text>
        </View>
        <View style={styles.previewCopy}>
          <Text style={styles.previewLabel}>KEBIASAAN BARUMU</Text>
          <Text style={styles.previewTitle} numberOfLines={1}>{title.trim() || 'Nama kebiasaan'}</Text>
          <Text style={styles.previewCategory}>{category}</Text>
        </View>
        <Text style={styles.previewLeaf}>🌿</Text>
      </View>

      <Text style={styles.fieldLabel}>Nama kebiasaan</Text>
      <TextInput
        value={title}
        onChangeText={(value) => {
          setTitle(value);
          if (error) setError('');
        }}
        placeholder="Contoh: Jalan kaki 20 menit"
        placeholderTextColor={colors.muted}
        maxLength={50}
        returnKeyType="done"
        style={styles.input}
        accessibilityLabel="Nama kebiasaan"
      />

      <Text style={[styles.fieldLabel, styles.spacedLabel]}>Pilih ikon</Text>
      <View style={styles.emojiRow}>
        {emojis.map((item) => (
          <Pressable
            key={item}
            accessibilityRole="radio"
            accessibilityState={{ checked: emoji === item }}
            onPress={() => setEmoji(item)}
            style={[styles.emojiOption, emoji === item && styles.emojiSelected]}
          >
            <Text style={styles.emojiText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={[styles.fieldLabel, styles.spacedLabel]}>Kategori</Text>
      <View style={styles.categoryGrid}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.categoryChip, category === item && styles.categorySelected]}
          >
            <Text style={[styles.categoryText, category === item && styles.categoryTextSelected]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}

      <View style={styles.tip}>
        <Text style={styles.tipEmoji}>💡</Text>
        <Text style={styles.tipText}>Pilih target yang realistis. Konsisten sedikit lebih baik daripada sempurna sesekali.</Text>
      </View>

      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>Simpan kebiasaan  →</Text>
      </Pressable>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 22,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 10,
    letterSpacing: 1.1,
    fontWeight: '800',
  },
  title: {
    color: colors.ink,
    fontSize: 29,
    fontWeight: '800',
    marginTop: 7,
  },
  subtitle: {
    color: colors.secondaryText,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
  },
  preview: {
    backgroundColor: colors.highlight,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 23,
  },
  previewIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewEmoji: {
    fontSize: 24,
  },
  previewCopy: {
    flex: 1,
    marginLeft: 12,
  },
  previewLabel: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  previewTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 4,
  },
  previewCategory: {
    color: colors.secondaryText,
    fontSize: 11,
    marginTop: 3,
  },
  previewLeaf: {
    fontSize: 22,
    marginLeft: 8,
  },
  fieldLabel: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 9,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 15,
    color: colors.ink,
    fontSize: 14,
  },
  spacedLabel: {
    marginTop: 22,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
  },
  emojiOption: {
    flex: 1,
    height: 43,
    borderRadius: 13,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiSelected: {
    backgroundColor: colors.highlight,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  emojiText: {
    fontSize: 20,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  categorySelected: {
    backgroundColor: colors.highlight,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.secondaryText,
    fontSize: 12,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 10,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.yellowLight,
    borderRadius: 15,
    padding: 13,
    marginTop: 24,
  },
  tipEmoji: {
    fontSize: 16,
    marginRight: 9,
  },
  tipText: {
    flex: 1,
    color: colors.secondaryText,
    fontSize: 12,
    lineHeight: 18,
  },
  button: {
    marginTop: 19,
    marginBottom: 14,
    minHeight: 52,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '800',
  },
});
