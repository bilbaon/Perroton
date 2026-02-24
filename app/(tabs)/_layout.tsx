import { Tabs } from 'expo-router';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/theme';

function TabIcon({ focused, emoji, label }: { focused: boolean; emoji: string; label: string }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
      <Text style={[styles.tabLabel, { color: focused ? Colors.primary : Colors.textMuted }]}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="🏠" label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="programs"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="📋" label="Programs" />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="📈" label="Progress" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="🐾" label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
});
