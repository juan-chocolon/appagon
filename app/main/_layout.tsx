import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function MainLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="outage-map"
        options={{
          title: 'Outage Map',
          tabBarIcon: ({ color }) => <FontAwesome size={16} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-reports"
        options={{
          title: 'My Reports',
          tabBarIcon: ({ color }) => <FontAwesome size={16} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={16} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}