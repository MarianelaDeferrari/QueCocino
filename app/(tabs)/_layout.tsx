
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#FAF9F6',
        },
        headerTintColor: '#405B45',
        tabBarActiveTintColor: '#66856A',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#EAE7DF',
          height: 65,
          paddingTop: 7,
          paddingBottom: 7,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="ingredientes"
        options={{
          title: 'Ingredientes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="recetas"
        options={{
          title: 'Recetas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Mi perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={String(color)} />
          ),
        }}
      />

      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}
