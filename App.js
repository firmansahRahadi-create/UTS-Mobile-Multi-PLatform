import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HabitProvider } from './src/context/HabitContext';
import { AddHabitScreen } from './src/screens/AddHabitScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { colors } from './src/theme';

const Tab = createBottomTabNavigator();

const tabIcons = {
  HariIni: '☀️',
  Progres: '📈',
  Tambah: '➕',
  Profil: '🌱',
};

export default function App() {
  return (
    <SafeAreaProvider>
      <HabitProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.muted,
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '700',
                marginBottom: 4,
              },
              tabBarIcon: ({ focused }) => (
                <TabIcon icon={tabIcons[route.name]} focused={focused} />
              ),
              tabBarStyle: {
                height: 66,
                paddingTop: 7,
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                borderTopWidth: 1,
              },
            })}
          >
            <Tab.Screen name="HariIni" component={HomeScreen} options={{ tabBarLabel: 'Hari ini' }} />
            <Tab.Screen name="Progres" component={ProgressScreen} options={{ tabBarLabel: 'Progres' }} />
            <Tab.Screen name="Tambah" component={AddHabitScreen} options={{ tabBarLabel: 'Tambah' }} />
            <Tab.Screen name="Profil" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />
          </Tab.Navigator>
        </NavigationContainer>
      </HabitProvider>
    </SafeAreaProvider>
  );
}

function TabIcon({ icon, focused }) {
  return (
    <View
      style={{
        minWidth: 44,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        backgroundColor: focused ? colors.highlight : 'transparent',
      }}
    >
      <Text style={{ fontSize: 17 }}>{icon}</Text>
    </View>
  );
}
