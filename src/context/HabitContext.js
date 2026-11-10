import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialHabits } from '../data/initialHabits';

const STORAGE_KEY = 'langkahbaik.habits.v1';
const HabitContext = createContext(null);

export function getDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isHabitList(value) {
  return (
    Array.isArray(value) &&
    value.every(
      (habit) =>
        habit &&
        typeof habit.id === 'string' &&
        typeof habit.title === 'string' &&
        typeof habit.emoji === 'string' &&
        typeof habit.category === 'string' &&
        Array.isArray(habit.completedDates) &&
        habit.completedDates.every((date) => typeof date === 'string'),
    )
  );
}

export function HabitProvider({ children }) {
  const [habits, setHabits] = useState(initialHabits);
  const [isReady, setIsReady] = useState(false);
  const [storageMessage, setStorageMessage] = useState('');

  useEffect(() => {
    let active = true;

    async function loadHabits() {
      try {
        const savedHabits = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedHabits !== null) {
          const parsedHabits = JSON.parse(savedHabits);
          if (!isHabitList(parsedHabits)) {
            throw new Error('Format data kebiasaan tidak sesuai.');
          }
          if (active) setHabits(parsedHabits);
        }
      } catch (error) {
        console.error('Gagal memuat data kebiasaan:', error);
        if (active) setStorageMessage('Data tersimpan tidak dapat dibaca. Kamu tetap bisa memakai aplikasi.');
      } finally {
        if (active) setIsReady(true);
      }
    }

    loadHabits();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits)).catch((error) => {
      console.error('Gagal menyimpan data kebiasaan:', error);
      setStorageMessage('Perubahan belum dapat disimpan di perangkat.');
    });
  }, [habits, isReady]);

  const addHabit = useCallback((habit) => {
    const newHabit = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: habit.title.trim(),
      emoji: habit.emoji,
      category: habit.category,
      completedDates: [],
    };
    setHabits((currentHabits) => [newHabit, ...currentHabits]);
    return newHabit;
  }, []);

  const toggleHabit = useCallback((habitId) => {
    const today = getDateKey();
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const isCompleted = habit.completedDates.includes(today);
        return {
          ...habit,
          completedDates: isCompleted
            ? habit.completedDates.filter((date) => date !== today)
            : [...habit.completedDates, today],
        };
      }),
    );
  }, []);

  const removeHabit = useCallback((habitId) => {
    setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== habitId));
  }, []);

  const resetHabits = useCallback(() => setHabits(initialHabits), []);

  const value = useMemo(
    () => ({
      habits,
      isReady,
      storageMessage,
      addHabit,
      toggleHabit,
      removeHabit,
      resetHabits,
    }),
    [habits, isReady, storageMessage, addHabit, toggleHabit, removeHabit, resetHabits],
  );

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits harus digunakan di dalam HabitProvider.');
  }
  return context;
}
